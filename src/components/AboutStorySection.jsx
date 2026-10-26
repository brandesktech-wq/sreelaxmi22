import React, { useEffect, useRef, useState } from 'react';
import './AboutStorySection.css';

/**
 * Editable content for the About Us page "Our Story" section.
 * Image path uses a replaceable sample luxury residential photograph.
 */
export const ABOUT_STORY_CONTENT = {
  eyebrow: 'WHO WE ARE',
  headingPrefix: 'Our ',
  headingHighlight: 'Story',
  paragraphs: [
    'At Sree Laxmi Developers, we believe a home is more than a structure—it is a place where comfort, trust, and lasting memories come together.',
    'Our focus is on creating thoughtfully designed spaces that balance quality construction, practical layouts, and modern living. We aim to make every property journey clear, comfortable, and rewarding for our customers.',
    'With a commitment to quality, transparency, and customer satisfaction, we strive to develop spaces that offer lasting value and a better living experience.',
  ],
  image: {
    src: '/assets/our-story-residence.jpg',
    alt: 'Contemporary residential property with sunlit glass facade and landscaped outdoor terrace — Sample Architectural Image',
    isSampleImage: true,
  },
};

export default function AboutStorySection({
  content = ABOUT_STORY_CONTENT,
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-about-story ${
        isVisible ? 'sld-about-story--visible' : ''
      }`}
      aria-labelledby="sld-about-story-heading"
    >
      {/* Subtle Architectural Linework Background Accent */}
      <div className="sld-about-story__bg-lines" aria-hidden="true" />

      <div className="sld-about-story__container">
        {/* Left Column — Architectural Property Image with Refined Gold Frame */}
        <div className="sld-about-story__media-col">
          <div className="sld-about-story__media-stage">
            <div className="sld-about-story__geo-accent" aria-hidden="true" />
            <div className="sld-about-story__offset-frame" aria-hidden="true" />

            <div className="sld-about-story__image-frame">
              <img
                src={content.image.src}
                alt={content.image.alt}
                className="sld-about-story__img"
                loading="eager"
                decoding="async"
              />
            </div>

            <span
              className="sld-about-story__corner sld-about-story__corner--tl"
              aria-hidden="true"
            />
            <span
              className="sld-about-story__corner sld-about-story__corner--br"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Column — Eyebrow, Heading & Introductory Copy */}
        <div className="sld-about-story__content-col">
          <div className="sld-about-story__kicker">
            <span
              className="sld-about-story__kicker-line"
              aria-hidden="true"
            />
            <span className="sld-about-story__kicker-text">
              {content.eyebrow}
            </span>
          </div>

          <h2 id="sld-about-story-heading" className="sld-about-story__heading">
            <span>{content.headingPrefix}</span>
            <span className="sld-about-story__heading-accent">
              {content.headingHighlight}
            </span>
          </h2>

          <div
            className="sld-about-story__heading-rule"
            aria-hidden="true"
          />

          <div className="sld-about-story__description">
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`sld-about-story__paragraph sld-about-story__paragraph--${
                  index + 1
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
