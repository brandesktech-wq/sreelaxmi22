import React, { useEffect, useRef, useState } from 'react';
import './MilestonesSection.css';

/**
 * Editable Milestones Configuration
 * ---------------------------------------------------------------------------
 * Chronological milestones for Sree Laxmi Developers (2013 – 2024).
 */
export const MILESTONES_DATA = [
  {
    id: 'milestone-2013',
    year: '2013',
    title: 'SLD Founded',
    description: 'The beginning of Sree Laxmi Developers.',
  },
  {
    id: 'milestone-2017',
    year: '2017',
    title: 'Gardenia Completed',
    description: 'A milestone marking the completion of Gardenia.',
  },
  {
    id: 'milestone-2021',
    year: '2021',
    title: 'Royale Launched',
    description: 'The launch of the Royale project.',
  },
  {
    id: 'milestone-2024',
    year: '2024',
    title: 'Heights & Meadows Launched',
    description: 'The launch of Heights and Meadows.',
  },
];

export default function MilestonesSection({
  eyebrow = 'OUR JOURNEY',
  heading = 'Milestones',
  milestones = MILESTONES_DATA,
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
      { threshold: 0.18, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-milestones ${
        isVisible ? 'sld-milestones--visible' : ''
      }`}
      aria-labelledby="sld-milestones-heading"
    >
      {/* Subtle Architectural Line-Art Backdrop */}
      <div className="sld-milestones__backdrop" aria-hidden="true">
        <svg
          className="sld-milestones__skyline"
          viewBox="0 0 1440 320"
          fill="none"
           preserveAspectRatio="none"
        >
          <g
            stroke="rgba(201, 164, 92, 0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            {/* Left Architectural Towers */}
            <rect x="48" y="110" width="90" height="210" />
            <line x1="70" y1="110" x2="70" y2="320" />
            <line x1="93" y1="110" x2="93" y2="320" />
            <line x1="116" y1="110" x2="116" y2="320" />
            <rect x="138" y="155" width="76" height="165" />
            <line x1="164" y1="155" x2="164" y2="320" />
            <line x1="188" y1="155" x2="188" y2="320" />

            {/* Center-Left Geometric Lines */}
            <rect x="310" y="135" width="104" height="185" />
            <line x1="310" y1="175" x2="414" y2="175" />
            <line x1="310" y1="215" x2="414" y2="215" />
            <line x1="310" y1="255" x2="414" y2="255" />
            <line x1="362" y1="135" x2="362" y2="320" />

            {/* Center-Right High-Rise Silhouette */}
            <rect x="1010" y="120" width="96" height="200" />
            <line x1="1034" y1="120" x2="1034" y2="320" />
            <line x1="1058" y1="120" x2="1058" y2="320" />
            <line x1="1082" y1="120" x2="1082" y2="320" />

            {/* Right Architectural Towers */}
            <rect x="1210" y="96" width="110" height="224" />
            <line x1="1210" y1="140" x2="1320" y2="140" />
            <line x1="1210" y1="184" x2="1320" y2="184" />
            <line x1="1210" y1="228" x2="1320" y2="228" />
            <line x1="1265" y1="96" x2="1265" y2="320" />
            <rect x="1320" y="160" width="72" height="160" />
          </g>
        </svg>
      </div>

      {/* Top & Bottom Subtle Gold Hairlines */}
      <div className="sld-milestones__edge-line sld-milestones__edge-line--top" aria-hidden="true" />
      <div className="sld-milestones__edge-line sld-milestones__edge-line--bottom" aria-hidden="true" />

      <div className="sld-milestones__container">
        {/* Centered Section Heading */}
        <header className="sld-milestones__header">
          <div className="sld-milestones__eyebrow">
            <span
              className="sld-milestones__eyebrow-line"
              aria-hidden="true"
            />
            <span>{eyebrow}</span>
            <span
              className="sld-milestones__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2 id="sld-milestones-heading" className="sld-milestones__heading">
            {heading}
          </h2>

          <div className="sld-milestones__heading-rule" aria-hidden="true">
            <span className="sld-milestones__heading-line" />
            <span className="sld-milestones__heading-diamond" />
            <span className="sld-milestones__heading-line" />
          </div>
        </header>

        {/* Chronological Timeline (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="sld-milestones__timeline-wrapper">
          {/* Animated Connecting Gold Line */}
          <div className="sld-milestones__track" aria-hidden="true">
            <span className="sld-milestones__track-fill" />
          </div>

          <ol className="sld-milestones__list">
            {milestones.map((item, index) => (
              <li
                key={item.id}
                className={`sld-milestones__item sld-milestones__item--${
                  index + 1
                }`}
              >
                {/* Prominent Year Above Marker on Desktop / Beside Marker on Mobile */}
                <div className="sld-milestones__year-wrap">
                  <span className="sld-milestones__year">{item.year}</span>
                </div>

                {/* Champagne-Gold Timeline Node with Restrained Glow */}
                <div className="sld-milestones__marker" aria-hidden="true">
                  <span className="sld-milestones__marker-ring">
                    <span className="sld-milestones__marker-diamond" />
                  </span>
                </div>

                {/* Milestone Content Card */}
                <article className="sld-milestones__card">
                  <span className="sld-milestones__year-mobile" aria-hidden="true">
                    {item.year}
                  </span>
                  <h3 className="sld-milestones__title">{item.title}</h3>
                  <div
                    className="sld-milestones__card-divider"
                    aria-hidden="true"
                  />
                  <p className="sld-milestones__description">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
