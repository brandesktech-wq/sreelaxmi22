import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Download, X } from 'lucide-react';
import {
  validateBrochureEnquiry,
  submitBrochureEnquiry,
  triggerBrochureDownload,
} from '../utils/brochureLeadService.js';
import './BrochureEnquiryModal.css';

export default function BrochureEnquiryModal({
  isOpen,
  onClose,
  project,
  onDownloadSuccess,
}) {
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firstInputRef = useRef(null);
  const modalCardRef = useRef(null);

  const hasBrochure = Boolean(
    project?.brochureUrl &&
      typeof project.brochureUrl === 'string' &&
      project.brochureUrl.trim()
  );

  // Reset form fields and lock background scroll when opened
  useEffect(() => {
    if (!isOpen) return undefined;

    setFormValues({ fullName: '', phone: '', email: '' });
    setErrors({});
    setSubmitError('');
    setIsSubmitting(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 40);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmitting) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleFieldChange = useCallback((field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSubmitError('');
  }, []);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget && !isSubmitting) {
        onClose();
      }
    },
    [isSubmitting, onClose]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateBrochureEnquiry(formValues);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!hasBrochure) {
      setSubmitError('Brochure Coming Soon for this project.');
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await submitBrochureEnquiry({
        projectId: project?.id || '',
        projectName: project?.name || '',
        fullName: formValues.fullName,
        phone: formValues.phone,
        email: formValues.email,
      });

      if (response && response.ok) {
        const downloaded = await triggerBrochureDownload(
          project.brochureUrl,
          project.brochureFileName
        );

        if (!downloaded) {
          setSubmitError(
            'Unable to download the brochure PDF right now. Please try again shortly.'
          );
          setIsSubmitting(false);
          return;
        }

        if (typeof onDownloadSuccess === 'function') {
          onDownloadSuccess({
            message:
              response.message || 'Thank you! Your brochure download has started.',
            integrationNote: response.integrationNote || '',
          });
        }

        onClose();
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to process your request right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div
      className="sld-brochure-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sld-brochure-modal-title"
      aria-describedby="sld-brochure-modal-desc"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalCardRef}
        className="sld-brochure-modal__card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="sld-brochure-modal__close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close brochure download popup"
        >
          <X size={18} strokeWidth={1.85} aria-hidden="true" />
        </button>

        <header className="sld-brochure-modal__header">
          <div className="sld-brochure-modal__eyebrow">
            <span
              className="sld-brochure-modal__eyebrow-line"
              aria-hidden="true"
            />
            <span>{project.name}</span>
          </div>

          <h2
            id="sld-brochure-modal-title"
            className="sld-brochure-modal__title"
          >
            Download Project Brochure
          </h2>

          <p
            id="sld-brochure-modal-desc"
            className="sld-brochure-modal__subtitle"
          >
            Please share your details to access the project brochure.
          </p>
        </header>

        <form
          className="sld-brochure-modal__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* 1. Full Name */}
          <div className="sld-brochure-modal__field">
            <label
              htmlFor="brochure-full-name"
              className="sld-brochure-modal__label"
            >
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="brochure-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your full name"
              value={formValues.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'brochure-full-name-error' : undefined
              }
              className={`sld-brochure-modal__input ${
                errors.fullName ? 'sld-brochure-modal__input--error' : ''
              }`}
            />
            {errors.fullName && (
              <p
                id="brochure-full-name-error"
                className="sld-brochure-modal__error"
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* 2. Phone Number */}
          <div className="sld-brochure-modal__field">
            <label
              htmlFor="brochure-phone"
              className="sld-brochure-modal__label"
            >
              Phone Number <span aria-hidden="true">*</span>
            </label>
            <input
              id="brochure-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="Enter your phone number"
              value={formValues.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? 'brochure-phone-error' : undefined
              }
              className={`sld-brochure-modal__input ${
                errors.phone ? 'sld-brochure-modal__input--error' : ''
              }`}
            />
            {errors.phone && (
              <p
                id="brochure-phone-error"
                className="sld-brochure-modal__error"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* 3. Email Address */}
          <div className="sld-brochure-modal__field">
            <label
              htmlFor="brochure-email"
              className="sld-brochure-modal__label"
            >
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="brochure-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="Enter your email address"
              value={formValues.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'brochure-email-error' : undefined
              }
              className={`sld-brochure-modal__input ${
                errors.email ? 'sld-brochure-modal__input--error' : ''
              }`}
            />
            {errors.email && (
              <p
                id="brochure-email-error"
                className="sld-brochure-modal__error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {submitError && (
            <p className="sld-brochure-modal__submit-error" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !hasBrochure}
            className="sld-brochure-modal__submit-btn"
          >
            <Download size={16} strokeWidth={1.85} aria-hidden="true" />
            <span>
              {!hasBrochure
                ? 'Brochure Coming Soon'
                : isSubmitting
                ? 'Preparing Download...'
                : 'Submit & Download Brochure'}
            </span>
          </button>

          <div className="sld-brochure-modal__footer-notes">
            <p className="sld-brochure-modal__privacy-note">
              Your details will be used to respond to your project enquiry.
            </p>
            <p className="sld-brochure-modal__mode-note">
              Lead recording will be enabled after backend integration.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
