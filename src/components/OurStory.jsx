import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './OurStory.css';

export const OUR_STORY_CONTENT = {
  eyebrow: 'ABOUT SREE LAXMI DEVELOPERS',
  headingLines: ['Building Trust.', 'Creating Better Living.'],
  paragraphs: [
    'At Sree Laxmi Developers, we believe that a home is more than just a property — it is where families grow, memories are created, and futures take shape.',
    'Our focus is on developing thoughtfully planned residential communities that bring together quality construction, practical design, convenient locations, and a comfortable living experience.',
    'With a commitment to transparency and customer satisfaction, we strive to make every home-buying journey a confident and rewarding experience.',
  ],
  cta: {
    label: 'Discover More',
    path: '/about',
  },
  image: {
    src: '/assets/our-story-residence.jpg',
    alt: 'Contemporary luxury residential property developed with modern architecture, glass balconies, and sunlit outdoor spaces',
  },
};

export default function OurStory({ content = OUR_STORY_CONTENT } = {}) {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-story ${isVisible ? 'sld-story--visible' : ''}`}
      aria-labelledby="sld-our-story-heading"
    >
      {/* Subtle Architectural Linework Background Accent */}
      <div className="sld-story__bg-lines" aria-hidden="true" />

      <div className="sld-story__container">
        {/* Left Column — Layered Editorial Real Estate Image */}
        <div className="sld-story__media-col">
          <div className="sld-story__media-stage">
            {/* Decorative Geometric Corner Block Behind Image */}
            <div className="sld-story__geo-accent" aria-hidden="true" />

            {/* Second Offset Champagne-Gold Editorial Outline */}
            <div className="sld-story__offset-frame" aria-hidden="true" />

            {/* Main Image Wrapper with Overflow Hidden */}
            <div className="sld-story__image-frame">
              <img
                src={content.image.src}
                alt={content.image.alt}
                className="sld-story__img"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thin Champagne-Gold Corner Accents */}
            <span
              className="sld-story__corner sld-story__corner--tl"
              aria-hidden="true"
            />
            <span
              className="sld-story__corner sld-story__corner--br"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Column — Coordinated Editorial Content */}
        <div className="sld-story__content-col">
          <div className="sld-story__kicker">
            <span className="sld-story__kicker-line" aria-hidden="true" />
            <span className="sld-story__kicker-text">{content.eyebrow}</span>
          </div>

          <h2 id="sld-our-story-heading" className="sld-story__heading">
            {content.headingLines.map((line, index) => (
              <span
                key={line}
                className={`sld-story__heading-line sld-story__heading-line--${
                  index + 1
                }`}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="sld-story__description">
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`sld-story__paragraph sld-story__paragraph--${
                  index + 1
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="sld-story__cta-wrap">
            <Link to={content.cta.path} className="sld-story__cta">
              <span>{content.cta.label}</span>
              <ArrowRight className="sld-story__cta-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
