import React, { useEffect, useRef, useState } from 'react';
import './LeadershipSection.css';

/**
 * Editable Leadership Profiles Configuration
 * ---------------------------------------------------------------------------
 * Replace `name` and `imageSrc` with the official executive names and portrait
 * photographs when available.
 */
export const LEADERSHIP_PROFILES = [
  {
    id: 'managing-partner',
    name: 'Leader Name',
    designation: 'Managing Partner',
    description:
      'Oversees strategy, business development, project planning, and overall operations, with a focus on quality, transparency, and long-term value.',
    imageSrc: '/assets/leader-managing-partner.svg',
    imageAlt: 'Managing Partner — Sree Laxmi Developers Executive Portrait',
  },
  {
    id: 'partner',
    name: 'Leader Name',
    designation: 'Partner',
    description:
      'Supports business growth, project coordination, and customer relationships, helping deliver thoughtfully planned spaces and a positive customer experience.',
    imageSrc: '/assets/leader-partner.svg',
    imageAlt: 'Partner — Sree Laxmi Developers Executive Portrait',
  },
];

export default function LeadershipSection({
  eyebrow = 'MEET OUR LEADERS',
  heading = 'Leadership',
  profiles = LEADERSHIP_PROFILES,
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
      { threshold: 0.15, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-leadership ${
        isVisible ? 'sld-leadership--visible' : ''
      }`}
      aria-labelledby="sld-leadership-heading"
    >
      <div className="sld-leadership__container">
        {/* Centered Luxury Section Heading */}
        <header className="sld-leadership__header">
          <div className="sld-leadership__eyebrow">
            <span
              className="sld-leadership__eyebrow-line"
              aria-hidden="true"
            />
            <span>{eyebrow}</span>
            <span
              className="sld-leadership__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2 id="sld-leadership-heading" className="sld-leadership__heading">
            {heading}
          </h2>

          <div className="sld-leadership__heading-rule" aria-hidden="true">
            <span className="sld-leadership__heading-line" />
            <span className="sld-leadership__heading-diamond" />
            <span className="sld-leadership__heading-line" />
          </div>
        </header>

        {/* Two Equal-Width Horizontal Leadership Cards */}
        <div className="sld-leadership__grid" role="list">
          {profiles.map((profile, index) => (
            <article
              key={profile.id}
              role="listitem"
              className={`sld-leadership__card sld-leadership__card--${
                (index % 2) + 1
              }`}
            >
              {/* Left: Circular Profile Image */}
              <div className="sld-leadership__avatar">
                {profile.imageSrc ? (
                  <img
                    src={profile.imageSrc}
                    alt={
                      profile.imageAlt ||
                      `${profile.name} — ${profile.designation}`
                    }
                    className="sld-leadership__avatar-img"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className="sld-leadership__avatar-fallback"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: Name, Designation & Description */}
              <div className="sld-leadership__info">
                <h3 className="sld-leadership__name">{profile.name}</h3>

                <p className="sld-leadership__designation">
                  {profile.designation}
                </p>

                {profile.description && (
                  <p className="sld-leadership__description">
                    {profile.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
