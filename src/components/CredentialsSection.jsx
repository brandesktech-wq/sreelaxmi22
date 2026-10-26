import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, Building2, ShieldCheck } from 'lucide-react';
import './CredentialsSection.css';

/**
 * Supplied credential cards for Sree Laxmi Developers.
 * Do not add fabricated registration numbers or accreditation details.
 */
export const CREDENTIALS_ITEMS = [
  {
    id: 'rera-registered',
    title: 'RERA Registered',
    Icon: BadgeCheck,
  },
  {
    id: 'ghmc-approved',
    title: 'GHMC Approved',
    Icon: Building2,
  },
  {
    id: 'iso-certified',
    title: 'ISO Certified',
    Icon: ShieldCheck,
  },
];

export default function CredentialsSection({
  eyebrow = 'OUR CREDENTIALS',
  headingPrefix = 'Credentials & ',
  headingHighlight = 'Certifications',
  items = CREDENTIALS_ITEMS,
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

  return (
    <section
      ref={sectionRef}
      className={`sld-credentials ${
        isVisible ? 'sld-credentials--visible' : ''
      }`}
      aria-labelledby="sld-credentials-heading"
    >
      {/* Subtle Architectural Linework */}
      <div className="sld-credentials__bg-lines" aria-hidden="true" />

      <div className="sld-credentials__container">
        {/* Centered Section Heading */}
        <header className="sld-credentials__header">
          <div className="sld-credentials__eyebrow">
            <span
              className="sld-credentials__eyebrow-line"
              aria-hidden="true"
            />
            <span>{eyebrow}</span>
            <span
              className="sld-credentials__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2 id="sld-credentials-heading" className="sld-credentials__heading">
            <span>{headingPrefix}</span>
            <span className="sld-credentials__heading-accent">
              {headingHighlight}
            </span>
          </h2>

          <div className="sld-credentials__heading-rule" aria-hidden="true">
            <span className="sld-credentials__heading-line" />
            <span className="sld-credentials__heading-diamond" />
            <span className="sld-credentials__heading-line" />
          </div>
        </header>

        {/* Three Credential Cards Row */}
        <div className="sld-credentials__grid" role="list">
          {items.map((item, index) => {
            const IconComponent = item.Icon;

            return (
              <article
                key={item.id}
                role="listitem"
                className={`sld-credentials__card sld-credentials__card--${
                  (index % 3) + 1
                }`}
              >
                {/* Circular Gold-Outline Icon Medallion */}
                <div
                  className="sld-credentials__icon-frame"
                  aria-hidden="true"
                >
                  <div className="sld-credentials__icon-inner">
                    <IconComponent
                      className="sld-credentials__icon"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                {/* Credential Title */}
                <h3 className="sld-credentials__title">{item.title}</h3>

                {/* Subtle Gold Decorative Accent */}
                <div
                  className="sld-credentials__card-rule"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
