import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

export const HERO_SLIDES = [
  {
    id: 'slide-luxury-apartments',
    kicker: 'SREE LAXMI DEVELOPERS',
    headingLines: ['A Better Way to Live.', 'A Brighter Way to Invest.'],
    image: '/assets/hero-slide-1.jpg',
    imageAlt:
      'Contemporary luxury residential apartment building with glass balconies and warm architectural illumination',
    cta: {
      label: 'Explore Our Projects',
      path: '/projects',
    },
  },
  {
    id: 'slide-premium-living',
    kicker: 'SPACES DESIGNED FOR LIFE',
    headingLines: ['Your Dream Home.', 'Your Next Chapter.'],
    image: '/assets/hero-slide-2.jpg',
    imageAlt:
      'Modern luxury residential development featuring contemporary architecture, expansive glass windows, and landscaped grounds',
    cta: {
      label: 'View All Projects',
      path: '/projects',
    },
  },
];

const AUTOPLAY_INTERVAL_MS = 5500;
const SWIPE_THRESHOLD_PX = 44;

export default function HeroSlider({ slides = HERO_SLIDES } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);
  const totalSlides = slides.length;

  // Respect user reduced-motion accessibility setting
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Continuous automatic rotation every 5.5s; resets timer when activeIndex changes manually
  useEffect(() => {
    if (prefersReducedMotion || totalSlides <= 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [activeIndex, prefersReducedMotion, totalSlides, goToNext]);

  // Keyboard arrow navigation
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  // Mobile touch swipe navigation
  const handleTouchStart = (event) => {
    touchEndXRef.current = null;
    touchStartXRef.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndXRef.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const deltaX = touchStartXRef.current - touchEndXRef.current;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      className="sld-hero"
      aria-roledescription="carousel"
      aria-label="Sree Laxmi Developers Featured Residences"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sld-hero__slides">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={slide.id}
              className={`sld-hero__slide ${
                isActive ? 'sld-hero__slide--active' : ''
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={slide.headingLines.join(' ')}
              aria-hidden={!isActive}
            >
              {/* Real Estate Photograph Container */}
              <div
                className={`sld-hero__media sld-hero__media--slide-${index + 1}`}
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className={`sld-hero__img sld-hero__img--slide-${index + 1}`}
                  referrerPolicy="no-referrer"
                />
                <div className="sld-hero__overlay" aria-hidden="true" />
              </div>

              {/* Left-aligned Content inside Max-Width Container */}
              <div className="sld-hero__container">
                <div className="sld-hero__content">
                  <div className="sld-hero__kicker">
                    <span className="sld-hero__kicker-line" aria-hidden="true" />
                    <span>{slide.kicker}</span>
                  </div>

                  <h1 className="sld-hero__heading">
                    <span className="sld-hero__heading-line">
                      {slide.headingLines[0]}
                    </span>
                    <span className="sld-hero__heading-line sld-hero__heading-line--second">
                      {slide.headingLines[1]}
                    </span>
                  </h1>

                  <div className="sld-hero__actions">
                    <Link
                      to={slide.cta.path}
                      className="sld-hero__btn"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>{slide.cta.label}</span>
                      <ArrowRight className="sld-hero__btn-icon" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Discreet Previous / Next Arrow Controls in Lower-Right Corner */}
      <div className="sld-hero__controls-wrapper">
        <div className="sld-hero__controls">
          <div className="sld-hero__arrows">
            <button
              type="button"
              className="sld-hero__arrow"
              aria-label="Previous slide"
              onClick={goToPrev}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="sld-hero__arrow"
              aria-label="Next slide"
              onClick={goToNext}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
