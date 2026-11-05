import React, { useEffect, useRef, useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import './BookSiteVisitCTA.css';

export const BOOK_SITE_VISIT_CONTENT = {
  eyebrow: 'YOUR DREAM HOME AWAITS',
  headingPrefix: 'Book A ',
  headingHighlight: 'Site Visit',
  description:
    'Experience our thoughtfully designed spaces in person. Schedule a visit and explore your future home with our team.',
  buttonText: 'Schedule Your Visit',
  enquiryContext: 'Site Visit',
  prefillMessage:
    'Site Visit Request: I would like to schedule a site visit to explore your project in person.',
};

export default function BookSiteVisitCTA({
  content = BOOK_SITE_VISIT_CONTENT,
  targetSectionId = 'sld-contact-section',
  onScheduleVisit = null,
} = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.18, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleScheduleClick = (event) => {
    event.preventDefault();

    if (typeof onScheduleVisit === 'function') {
      onScheduleVisit(content.enquiryContext);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sld:prefill-enquiry', {
          detail: {
            context: content.enquiryContext,
            message: content.prefillMessage,
          },
        })
      );

      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const targetElement =
        document.getElementById(targetSectionId) ||
        document.querySelector('.sld-contact');

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        window.setTimeout(
          () => {
            const projectSelect = document.getElementById('sld-enquiry-project');
            const nameInput = document.getElementById('sld-enquiry-name');
            if (nameInput && !nameInput.value) {
              nameInput.focus({ preventScroll: true });
            } else if (projectSelect) {
              projectSelect.focus({ preventScroll: true });
            }
          },
          prefersReducedMotion ? 50 : 650
        );
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`sld-site-visit-cta ${
        isVisible ? 'sld-site-visit-cta--visible' : ''
      }`}
      aria-labelledby="sld-site-visit-cta-heading"
    >
      {/* Subtle Architectural Line Detail */}
      <div className="sld-site-visit-cta__bg-lines" aria-hidden="true" />

      <div className="sld-site-visit-cta__container">
        <div className="sld-site-visit-cta__inner">
          {/* Left Column: Eyebrow, Heading, Gold Diamond Ornament & Supporting Copy */}
          <div className="sld-site-visit-cta__content">
            <div className="sld-site-visit-cta__eyebrow">
              <span
                className="sld-site-visit-cta__eyebrow-line"
                aria-hidden="true"
              />
              <span>{content.eyebrow}</span>
            </div>

            <h2
              id="sld-site-visit-cta-heading"
              className="sld-site-visit-cta__heading"
            >
              <span>{content.headingPrefix}</span>
              <span className="sld-site-visit-cta__heading-accent">
                {content.headingHighlight}
              </span>
            </h2>

            <div
              className="sld-site-visit-cta__ornament"
              aria-hidden="true"
            >
              <span className="sld-site-visit-cta__ornament-line sld-site-visit-cta__ornament-line--left" />
              <span className="sld-site-visit-cta__ornament-diamond" />
              <span className="sld-site-visit-cta__ornament-line sld-site-visit-cta__ornament-line--right" />
            </div>

            <p className="sld-site-visit-cta__description">
              {content.description}
            </p>
          </div>

          {/* Right Column: Primary Schedule Your Visit Button */}
          <div className="sld-site-visit-cta__actions">
            <a
              href={`#${targetSectionId}`}
              onClick={handleScheduleClick}
              className="sld-site-visit-cta__button"
            >
              <CalendarCheck
                className="sld-site-visit-cta__button-icon"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>{content.buttonText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
