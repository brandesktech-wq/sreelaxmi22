import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import { submitEnquiryRequest } from '../config/apiConfig.js';
import './ContactPage.css';

export const HEAD_OFFICE_DETAILS = {
  address:
    'Plot No. 69/P to 62, 70A, Bowrampet, Dommara Pochampally, Medchal–Malkajgiri, Telangana – 500042.',
  phoneDisplay: '+91 98498 35455',
  phoneTelUrl: 'tel:+919849835455',
  whatsappUrl: 'https://wa.me/919849835455',
  email: 'contact@sreelaxmidevelopers.com',
  emailUrl: 'mailto:contact@sreelaxmidevelopers.com',
  mapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Plot+No.+69%2FP+to+62%2C+70A%2C+Bowrampet%2C+Dommara+Pochampally%2C+Telangana+500042',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Plot+No.+69%2FP+to+62%2C+70A%2C+Bowrampet%2C+Dommara+Pochampally%2C+Telangana+500042&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

const INITIAL_CONTACT_FORM = {
  fullName: '',
  phone: '',
  email: '',
  message: '',
};

/**
 * Validate Contact Us form fields
 */
export function validateContactPageForm(values) {
  const errors = {};

  const trimmedName = values.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
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

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter your message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please enter at least 10 characters in your message.';
  }

  return errors;
}

/**
 * Isolated enquiry submission handler ready for MERN backend integration.
 * Replace or pass `onSubmitEnquiry` prop when connecting to an Express/MongoDB route.
 */
async function submitContactEnquiry(payload, customHandler) {
  return submitEnquiryRequest(
    {
      name: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      project: 'Contact Us Page Enquiry',
      message: payload.message,
    },
    customHandler
  );
}

export default function ContactPage({
  officeDetails = HEAD_OFFICE_DETAILS,
  onSubmitEnquiry = undefined,
} = {}) {
  const prefersReducedMotion = useReducedMotion();

  const [formValues, setFormValues] = useState(INITIAL_CONTACT_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);
  const [mapLoadError, setMapLoadError] = useState(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...formValues, [name]: value };
    setFormValues(nextValues);

    if (submitFeedback) {
      setSubmitFeedback(null);
    }

    if (touchedFields[name]) {
      const validationErrors = validateContactPageForm(nextValues);
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || undefined,
      }));
    }
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateContactPageForm(formValues);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || undefined,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setTouchedFields({
      fullName: true,
      phone: true,
      email: true,
      message: true,
    });

    const validationErrors = validateContactPageForm(formValues);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitFeedback({
        type: 'error',
        message: 'Please complete all required fields with valid information.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback(null);

    const sanitizedPayload = {
      fullName: formValues.fullName.trim(),
      phone: formValues.phone.trim(),
      email: formValues.email.trim(),
      message: formValues.message.trim(),
    };

    try {
      const result = await submitContactEnquiry(
        sanitizedPayload,
        onSubmitEnquiry
      );

      if (result && result.backendConnected === false) {
        setSubmitFeedback({
          type: 'error',
          message: result.message,
        });
        return;
      }

      setFormValues(INITIAL_CONTACT_FORM);
      setTouchedFields({});
      setFieldErrors({});
      setSubmitFeedback({
        type: 'success',
        message:
          result?.message ||
          'Thank you for contacting Sree Laxmi Developers. Our team has received your enquiry and will get back to you shortly.',
      });
    } catch (error) {
      setSubmitFeedback({
        type: 'error',
        message:
          error?.message ||
          'We could not submit your enquiry right now. Please try again or reach us directly via phone, WhatsApp, or email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const panelMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      };

  const rightPanelMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div className="sld-contact-page">
      {/* 1. Compact Premium Title Bar (Home / Contact Us) */}
      <ProjectTitleBar
        title="Contact Us"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact Us', path: null },
        ]}
        backgroundImage="/assets/hero-slide-2.jpg"
      />

      {/* 2. Main Contact Section (50:50 Two-Column Desktop Grid) */}
      <section
        className="sld-contact-page__section"
        aria-label="Contact Sree Laxmi Developers"
      >
        <div className="sld-contact-page__container">
          <div className="sld-contact-page__grid">
            {/* Left Grid: Get in Touch – Contact Form */}
            <motion.div
              className="sld-contact-page__panel sld-contact-page__panel--form"
              {...panelMotionProps}
            >
              <header className="sld-contact-page__panel-header">
                <span className="sld-contact-page__eyebrow">ENQUIRE NOW</span>
                <h2
                  id="sld-get-in-touch-heading"
                  className="sld-contact-page__heading"
                >
                  Get in Touch
                </h2>
                <div className="sld-contact-page__rule" aria-hidden="true">
                  <span className="sld-contact-page__rule-line" />
                  <span className="sld-contact-page__rule-diamond" />
                </div>
                <p className="sld-contact-page__subtext">
                  Have a question about our projects? Get in touch with our
                  team, and we’ll be happy to assist you.
                </p>
              </header>

              <form
                className="sld-contact-page__form"
                onSubmit={handleFormSubmit}
                aria-labelledby="sld-get-in-touch-heading"
                noValidate
              >
                <div className="sld-contact-page__form-grid">
                  {/* Field 1: Full Name (Left column on desktop) */}
                  <div className="sld-contact-page__field">
                    <label
                      htmlFor="contact-full-name"
                      className="sld-contact-page__label"
                    >
                      Full Name{' '}
                      <span
                        className="sld-contact-page__required"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>
                    <input
                      id="contact-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your full name"
                      value={formValues.fullName}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={
                        fieldErrors.fullName
                          ? 'contact-full-name-error'
                          : undefined
                      }
                      className={`sld-contact-page__input ${
                        fieldErrors.fullName
                          ? 'sld-contact-page__input--error'
                          : ''
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p
                        id="contact-full-name-error"
                        className="sld-contact-page__error"
                        role="alert"
                      >
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Phone Number (Right column on desktop) */}
                  <div className="sld-contact-page__field">
                    <label
                      htmlFor="contact-phone"
                      className="sld-contact-page__label"
                    >
                      Phone Number{' '}
                      <span
                        className="sld-contact-page__required"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>
                    <input
                      id="contact-phone"
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
                        fieldErrors.phone ? 'contact-phone-error' : undefined
                      }
                      className={`sld-contact-page__input ${
                        fieldErrors.phone
                          ? 'sld-contact-page__input--error'
                          : ''
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p
                        id="contact-phone-error"
                        className="sld-contact-page__error"
                        role="alert"
                      >
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Email Address (Full width) */}
                  <div className="sld-contact-page__field sld-contact-page__field--full">
                    <label
                      htmlFor="contact-email"
                      className="sld-contact-page__label"
                    >
                      Email Address{' '}
                      <span
                        className="sld-contact-page__required"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
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
                        fieldErrors.email ? 'contact-email-error' : undefined
                      }
                      className={`sld-contact-page__input ${
                        fieldErrors.email
                          ? 'sld-contact-page__input--error'
                          : ''
                      }`}
                    />
                    {fieldErrors.email && (
                      <p
                        id="contact-email-error"
                        className="sld-contact-page__error"
                        role="alert"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Field 4: Message (Full width) */}
                  <div className="sld-contact-page__field sld-contact-page__field--full">
                    <label
                      htmlFor="contact-message"
                      className="sld-contact-page__label"
                    >
                      Message{' '}
                      <span
                        className="sld-contact-page__required"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="How can we help you with your home search?"
                      value={formValues.message}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={
                        fieldErrors.message
                          ? 'contact-message-error'
                          : undefined
                      }
                      className={`sld-contact-page__textarea ${
                        fieldErrors.message
                          ? 'sld-contact-page__input--error'
                          : ''
                      }`}
                    />
                    {fieldErrors.message && (
                      <p
                        id="contact-message-error"
                        className="sld-contact-page__error"
                        role="alert"
                      >
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission Feedback Banner */}
                  {submitFeedback && (
                    <div
                      className={`sld-contact-page__feedback sld-contact-page__field--full sld-contact-page__feedback--${submitFeedback.type}`}
                      role="status"
                      aria-live="polite"
                    >
                      {submitFeedback.type === 'success' ? (
                        <CheckCircle2
                          className="sld-contact-page__feedback-icon"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertCircle
                          className="sld-contact-page__feedback-icon"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      )}
                      <span>{submitFeedback.message}</span>
                    </div>
                  )}

                  {/* Full-Width Submit Button */}
                  <div className="sld-contact-page__submit-wrap sld-contact-page__field--full">
                    <button
                      type="submit"
                      className="sld-contact-page__submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Right Grid: Head Office – Contact Details & Google Map */}
            <motion.div
              className="sld-contact-page__panel sld-contact-page__panel--office"
              {...rightPanelMotionProps}
            >
              <header className="sld-contact-page__panel-header">
                <span className="sld-contact-page__eyebrow">OUR LOCATION</span>
                <h2
                  id="sld-head-office-heading"
                  className="sld-contact-page__heading"
                >
                  Head Office
                </h2>
                <div className="sld-contact-page__rule" aria-hidden="true">
                  <span className="sld-contact-page__rule-line" />
                  <span className="sld-contact-page__rule-diamond" />
                </div>
              </header>

              {/* Three Separated Contact Information Blocks */}
              <div
                className="sld-contact-page__info-blocks"
                role="list"
                aria-labelledby="sld-head-office-heading"
              >
                {/* Block 1: Official Address */}
                <div className="sld-contact-page__info-card" role="listitem">
                  <div
                    className="sld-contact-page__icon-wrap"
                    aria-hidden="true"
                  >
                    <MapPin
                      className="sld-contact-page__icon"
                      strokeWidth={1.65}
                    />
                  </div>
                  <div className="sld-contact-page__info-body">
                    <span className="sld-contact-page__info-label">
                      Address
                    </span>
                    <address className="sld-contact-page__info-address">
                      {officeDetails.address}
                    </address>
                  </div>
                </div>

                {/* Block 2: Phone & WhatsApp */}
                <div className="sld-contact-page__info-card" role="listitem">
                  <div
                    className="sld-contact-page__icon-wrap"
                    aria-hidden="true"
                  >
                    <Phone
                      className="sld-contact-page__icon"
                      strokeWidth={1.65}
                    />
                  </div>
                  <div className="sld-contact-page__info-body">
                    <span className="sld-contact-page__info-label">
                      Phone / WhatsApp
                    </span>
                    <div className="sld-contact-page__phone-actions">
                      <a
                        href={officeDetails.phoneTelUrl}
                        className="sld-contact-page__info-link"
                        aria-label={`Call ${officeDetails.phoneDisplay}`}
                      >
                        {officeDetails.phoneDisplay}
                      </a>
                      <span
                        className="sld-contact-page__action-sep"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                      <a
                        href={officeDetails.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sld-contact-page__whatsapp-link"
                        aria-label={`Chat on WhatsApp at ${officeDetails.phoneDisplay}`}
                      >
                        <MessageSquare
                          size={14}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Block 3: Email Address */}
                <div className="sld-contact-page__info-card" role="listitem">
                  <div
                    className="sld-contact-page__icon-wrap"
                    aria-hidden="true"
                  >
                    <Mail
                      className="sld-contact-page__icon"
                      strokeWidth={1.65}
                    />
                  </div>
                  <div className="sld-contact-page__info-body">
                    <span className="sld-contact-page__info-label">
                      Email Address
                    </span>
                    <a
                      href={officeDetails.emailUrl}
                      className="sld-contact-page__info-link sld-contact-page__info-link--email"
                      aria-label={`Email ${officeDetails.email}`}
                    >
                      {officeDetails.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map + Get Directions Button */}
              <div className="sld-contact-page__map-section">
                <div className="sld-contact-page__map-frame">
                  {!mapLoadError ? (
                    <iframe
                      title="Sree Laxmi Developers Head Office Location Map — Bowrampet, Dommara Pochampally, Telangana 500042"
                      src={officeDetails.mapsEmbedUrl}
                      className="sld-contact-page__map-iframe"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      onError={() => setMapLoadError(true)}
                    />
                  ) : (
                    <div className="sld-contact-page__map-fallback">
                      <MapPin
                        size={28}
                        strokeWidth={1.5}
                        className="sld-contact-page__map-fallback-icon"
                        aria-hidden="true"
                      />
                      <p className="sld-contact-page__map-fallback-text">
                        {officeDetails.address}
                      </p>
                      <a
                        href={officeDetails.mapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sld-contact-page__directions-btn"
                      >
                        <span>Open Location in Google Maps</span>
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="sld-contact-page__map-footer">
                  <a
                    href={officeDetails.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sld-contact-page__directions-btn"
                    aria-label="Get directions to Sree Laxmi Developers Head Office on Google Maps"
                  >
                    <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
