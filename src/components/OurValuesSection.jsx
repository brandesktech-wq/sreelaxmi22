import React, { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  ShieldCheck,
  UsersRound,
  Lightbulb,
  Handshake,
  House,
} from 'lucide-react';
import './OurValuesSection.css';

/**
 * Editable Core Values Configuration
 * ---------------------------------------------------------------------------
 * Six foundational principles guiding Sree Laxmi Developers.
 */
export const OUR_VALUES_DATA = [
  {
    id: 'value-quality',
    title: 'Quality',
    description:
      'We focus on quality construction, thoughtful planning, and attention to detail in every development.',
    Icon: BadgeCheck,
  },
  {
    id: 'value-integrity',
    title: 'Integrity',
    description:
      'We value honesty, transparent communication, and responsible practices throughout the property journey.',
    Icon: ShieldCheck,
  },
  {
    id: 'value-customer-commitment',
    title: 'Customer Commitment',
    description:
      'We put customer needs first and aim to create a clear, comfortable, and dependable experience.',
    Icon: UsersRound,
  },
  {
    id: 'value-innovation',
    title: 'Innovation',
    description:
      'We embrace thoughtful design and modern ideas to create practical spaces for contemporary living.',
    Icon: Lightbulb,
  },
  {
    id: 'value-transparency',
    title: 'Transparency',
    description:
      'We believe in clear information, straightforward communication, and building lasting trust.',
    Icon: Handshake,
  },
  {
    id: 'value-long-term-value',
    title: 'Long-Term Value',
    description:
      'We focus on considered planning and functional spaces designed to deliver lasting value.',
    Icon: House,
  },
];

export default function OurValuesSection({
  eyebrow = 'WHAT GUIDES US',
  heading = 'Our Values',
  values = OUR_VALUES_DATA,
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
      { threshold: 0.15, rootMargin: '0px 0px -28px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-values ${isVisible ? 'sld-values--visible' : ''}`}
      aria-labelledby="sld-values-heading"
    >
      {/* Subtle Architectural Line Pattern */}
      <div className="sld-values__backdrop" aria-hidden="true" />

      <div className="sld-values__container">
        {/* Centered Luxury Section Heading */}
        <header className="sld-values__header">
          <div className="sld-values__eyebrow">
            <span className="sld-values__eyebrow-line" aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="sld-values__eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="sld-values-heading" className="sld-values__heading">
            {heading}
          </h2>

          <div className="sld-values__heading-rule" aria-hidden="true">
            <span className="sld-values__heading-line" />
            <span className="sld-values__heading-diamond" />
            <span className="sld-values__heading-line" />
          </div>
        </header>

        {/* Six Core Values Grid (3x2 Desktop, 2x3 Tablet, 1x6 Mobile) */}
        <div className="sld-values__grid" role="list">
          {values.map((item, index) => {
            const IconComponent = item.Icon;

            return (
              <article
                key={item.id}
                role="listitem"
                className={`sld-values__card sld-values__card--${
                  (index % 6) + 1
                }`}
              >
                {/* Gold Line Icon Inside Subtle Circular Medallion */}
                <div className="sld-values__icon-frame" aria-hidden="true">
                  <IconComponent
                    className="sld-values__icon"
                    strokeWidth={1.65}
                  />
                </div>

                {/* Value Heading */}
                <h3 className="sld-values__title">{item.title}</h3>

                {/* Small Gold Accent Line Beneath Heading */}
                <div className="sld-values__card-rule" aria-hidden="true" />

                {/* Short Readable Description */}
                <p className="sld-values__description">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
