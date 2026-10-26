import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FEATURED_PROJECTS } from './ProjectsSection.jsx';
import { submitEnquiryRequest } from '../config/apiConfig.js';
import './ContactSection.css';

/**
 * Reusable project dropdown options derived from the website's configured projects.
 * Includes only Ongoing and Upcoming projects, displaying only the project names.
 */
export const PROJECT_ENQUIRY_OPTIONS = FEATURED_PROJECTS.filter(
  (project) => project.status === 'Ongoing' || project.status === 'Upcoming'
).map((project) => ({
  id: project.id,
  value: project.name,
  label: project.name,
}));

export const CONTACT_DETAILS = {
  whatsappDisplay: '+91 98498 35455',
  whatsappUrl: 'https://wa.me/919849835455',
  email: 'contact@sreelaxmidevelopers.com',
  emailUrl: 'mailto:contact@sreelaxmidevelopers.com',
  location: 'Hyderabad, Telangana, India',
};

const INITIAL_FORM_VALUES = {
  name: '',
  phone: '',
  email: '',
  project: '',
  message: '',
};

/**
 * Clean WhatsApp vector glyph matching the architectural stroke aesthetic
 */
function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

/**
 * Validate contact enquiry fields
 */
function validateEnquiryForm(values, projectOptions = PROJECT_ENQUIRY_OPTIONS) {
  const errors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const trimmedPhone = values.phone.trim();
  const digitsOnly = trimmedPhone.replace(/\D/g, '');
  const phonePattern = /^[+\d][\d\s\-()]{7,18}$/;
  if (!trimmedPhone) {
    errors.phone = 'Please enter your phone number.';
  } else if (
    !phonePattern.test(trimmedPhone) ||
    digitsOnly.length < 10 ||
    digitsOnly.length > 15
  ) {
    errors.phone = 'Please enter a valid 10 to 15-digit phone number.';
  }

  const trimmedEmail = values.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.project) {
    errors.project = 'Please select a project.';
  } else {
    const matchedOption = projectOptions.find(
      (option) => option.value === values.project
    );
    if (!matchedOption) {
      errors.project = 'Please select a valid project.';
    }
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter your enquiry message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please provide at least 10 characters in your message.';
  }

  return errors;
}

export default function ContactSection({
  eyebrow = 'GET IN TOUCH',
  headingPrefix = 'Start a ',
  headingHighlight = 'Conversation',
  contactInfo = CONTACT_DETAILS,
  projectOptions = PROJECT_ENQUIRY_OPTIONS,
  defaultProject = '',
  onSubmitEnquiry = null,
} = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const effectiveProjectOptions = React.useMemo(() => {
    if (!defaultProject) return projectOptions;
    const exists = projectOptions.some(
      (opt) => opt.value.toLowerCase() === defaultProject.toLowerCase()
    );
    if (exists) return projectOptions;
    return [
      { id: defaultProject, value: defaultProject, label: defaultProject },
      ...projectOptions,
    ];
  }, [projectOptions, defaultProject]);

  const [formValues, setFormValues] = useState(() => ({
    ...INITIAL_FORM_VALUES,
    project: defaultProject || '',
  }));
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (defaultProject) {
      setFormValues((prev) => ({
        ...prev,
        project: defaultProject,
      }));
    }
  }, [defaultProject]);

  // Subtle fade-up reveal when entering viewport
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...formValues, [name]: value };
    setFormValues(nextValues);

    if (submitStatus) {
      setSubmitStatus(null);
    }

    if (touchedFields[name]) {
      const validationErrors = validateEnquiryForm(
        nextValues,
        effectiveProjectOptions
      );
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || undefined,
      }));
    }
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateEnquiryForm(
      formValues,
      effectiveProjectOptions
    );
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || undefined,
    }));
  };

  /**
   * Submission handler ready for MongoDB / Express enquiry endpoint integration.
   * Does not fabricate a successful server save when no backend handler is configured.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const allTouched = {
      name: true,
      phone: true,
      email: true,
      project: true,
      message: true,
    };
    setTouchedFields(allTouched);

    const validationErrors = validateEnquiryForm(
      formValues,
      effectiveProjectOptions
    );
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please review the highlighted fields and try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const sanitizedPayload = {
      name: formValues.name.trim(),
      phone: formValues.phone.trim(),
      email: formValues.email.trim(),
      project: formValues.project,
      message: formValues.message.trim(),
    };

    try {
      const result = await submitEnquiryRequest(
        sanitizedPayload,
        onSubmitEnquiry
      );

      if (result && result.backendConnected === false) {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
        return;
      }

      setFormValues({
        ...INITIAL_FORM_VALUES,
        project: defaultProject || '',
      });
      setTouchedFields({});
      setFieldErrors({});
      setSubmitStatus({
        type: 'success',
        message:
          result?.message ||
          'Thank you. Your enquiry has been received by Sree Laxmi Developers.',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error?.message ||
          'Unable to submit your enquiry right now. Please contact us directly via WhatsApp or email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`sld-contact ${isVisible ? 'sld-contact--visible' : ''}`}
      aria-labelledby="sld-contact-heading"
    >
      <div className="sld-contact__container">
        {/* Centered Minimal Luxury Section Heading */}
        <header className="sld-contact__header">
          <div className="sld-contact__eyebrow">
            <span className="sld-contact__eyebrow-line" aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="sld-contact__eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="sld-contact-heading" className="sld-contact__heading">
            <span>{headingPrefix}</span>
            <span className="sld-contact__heading-accent">
              {headingHighlight}
            </span>
          </h2>

          <div className="sld-contact__heading-rule" aria-hidden="true">
            <span className="sld-contact__heading-line" />
            <span className="sld-contact__heading-diamond" />
            <span className="sld-contact__heading-line" />
          </div>
        </header>

        {/* Balanced 50:50 Equal-Width & Equal-Height Two-Column Layout */}
        <div className="sld-contact__grid">
          {/* Left Panel: Contact Form */}
          <div className="sld-contact__form-col">
            <form
              className="sld-contact__form"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <div className="sld-contact__form-grid">
                {/* Row 1, Col 1: Name */}
                <div className="sld-contact__field">
                  <label
                    htmlFor="sld-enquiry-name"
                    className="sld-contact__label"
                  >
                    Name{' '}
                    <span className="sld-contact__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="sld-enquiry-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Enter your full name"
                    value={formValues.name}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? 'sld-enquiry-name-error' : undefined
                    }
                    className={`sld-contact__input ${
                      fieldErrors.name ? 'sld-contact__input--error' : ''
                    }`}
                  />
                  {fieldErrors.name && (
                    <p
                      id="sld-enquiry-name-error"
                      className="sld-contact__error-text"
                      role="alert"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Row 1, Col 2: Phone Number */}
                <div className="sld-contact__field">
                  <label
                    htmlFor="sld-enquiry-phone"
                    className="sld-contact__label"
                  >
                    Phone Number{' '}
                    <span className="sld-contact__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="sld-enquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="+91 98498 35455"
                    value={formValues.phone}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={
                      fieldErrors.phone ? 'sld-enquiry-phone-error' : undefined
                    }
                    className={`sld-contact__input ${
                      fieldErrors.phone ? 'sld-contact__input--error' : ''
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p
                      id="sld-enquiry-phone-error"
                      className="sld-contact__error-text"
                      role="alert"
                    >
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Row 2, Col 1: Email */}
                <div className="sld-contact__field">
                  <label
                    htmlFor="sld-enquiry-email"
                    className="sld-contact__label"
                  >
                    Email{' '}
                    <span className="sld-contact__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="sld-enquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="yourname@example.com"
                    value={formValues.email}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? 'sld-enquiry-email-error' : undefined
                    }
                    className={`sld-contact__input ${
                      fieldErrors.email ? 'sld-contact__input--error' : ''
                    }`}
                  />
                  {fieldErrors.email && (
                    <p
                      id="sld-enquiry-email-error"
                      className="sld-contact__error-text"
                      role="alert"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Row 2, Col 2: Project Dropdown */}
                <div className="sld-contact__field">
                  <label
                    htmlFor="sld-enquiry-project"
                    className="sld-contact__label"
                  >
                    Project{' '}
                    <span className="sld-contact__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <div className="sld-contact__select-wrap">
                    <select
                      id="sld-enquiry-project"
                      name="project"
                      required
                      value={formValues.project}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors.project)}
                      aria-describedby={
                        fieldErrors.project
                          ? 'sld-enquiry-project-error'
                          : undefined
                      }
                      className={`sld-contact__select ${
                        !formValues.project
                          ? 'sld-contact__select--placeholder'
                          : ''
                      } ${fieldErrors.project ? 'sld-contact__input--error' : ''}`}
                    >
                      <option value="" disabled>
                        Select a project
                      </option>
                      {effectiveProjectOptions.map((option) => (
                        <option
                          key={option.id || option.value}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="sld-contact__select-icon"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  {fieldErrors.project && (
                    <p
                      id="sld-enquiry-project-error"
                      className="sld-contact__error-text"
                      role="alert"
                    >
                      {fieldErrors.project}
                    </p>
                  )}
                </div>

                {/* Row 3: Message (Full Width, Spanning Both Columns) */}
                <div className="sld-contact__field sld-contact__field--full">
                  <label
                    htmlFor="sld-enquiry-message"
                    className="sld-contact__label"
                  >
                    Message{' '}
                    <span className="sld-contact__required" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="sld-enquiry-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    value={formValues.message}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={
                      fieldErrors.message
                        ? 'sld-enquiry-message-error'
                        : undefined
                    }
                    className={`sld-contact__textarea ${
                      fieldErrors.message ? 'sld-contact__input--error' : ''
                    }`}
                  />
                  {fieldErrors.message && (
                    <p
                      id="sld-enquiry-message-error"
                      className="sld-contact__error-text"
                      role="alert"
                    >
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submission Feedback Alert */}
                {submitStatus && (
                  <div
                    className={`sld-contact__feedback sld-contact__field--full sld-contact__feedback--${submitStatus.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle2
                        className="sld-contact__feedback-icon"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    ) : (
                      <AlertCircle
                        className="sld-contact__feedback-icon"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                {/* Row 4: Full-Width Submit Button Spanning Both Columns */}
                <div className="sld-contact__submit-wrap sld-contact__field--full">
                  <button
                    type="submit"
                    className="sld-contact__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Send Enquiry'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Panel: Equal-Size Contact Details Panel */}
          <div className="sld-contact__info-col">
            <div className="sld-contact__info-list" role="list">
              {/* Row 1: Clickable Phone / WhatsApp */}
              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sld-contact__info-row sld-contact__info-row--link"
                role="listitem"
                aria-label={`Phone or WhatsApp: ${contactInfo.whatsappDisplay}`}
              >
                <div className="sld-contact__icon-box" aria-hidden="true">
                  <WhatsAppIcon className="sld-contact__icon" />
                </div>
                <div className="sld-contact__info-content">
                  <span className="sld-contact__info-label">
                    Phone / WhatsApp
                  </span>
                  <span className="sld-contact__info-link">
                    {contactInfo.whatsappDisplay}
                  </span>
                </div>
              </a>

              {/* Row 2: Clickable Email (Single Line on Desktop) */}
              <a
                href={contactInfo.emailUrl}
                className="sld-contact__info-row sld-contact__info-row--link"
                role="listitem"
                aria-label={`Email: ${contactInfo.email}`}
              >
                <div className="sld-contact__icon-box" aria-hidden="true">
                  <Mail className="sld-contact__icon" strokeWidth={1.65} />
                </div>
                <div className="sld-contact__info-content">
                  <span className="sld-contact__info-label">Email</span>
                  <span className="sld-contact__info-link sld-contact__info-email">
                    {contactInfo.email}
                  </span>
                </div>
              </a>

              {/* Row 3: Location */}
              <div className="sld-contact__info-row" role="listitem">
                <div className="sld-contact__icon-box" aria-hidden="true">
                  <MapPin className="sld-contact__icon" strokeWidth={1.65} />
                </div>
                <div className="sld-contact__info-content">
                  <span className="sld-contact__info-label">Location</span>
                  <p className="sld-contact__info-value">
                    {contactInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
