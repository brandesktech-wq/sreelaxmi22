import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './TestimonialsSection.css';

/**
 * SAMPLE PLACEHOLDER TESTIMONIALS (EDITABLE)
 * ---------------------------------------------------------------------------
 * All six entries below are sample placeholders covering construction quality,
 * thoughtful layouts, transparent communication, prime location, clear
 * documentation, and responsive customer service.
 * Replace these sample text entries, placeholder client labels, and sample
 * ratings with verified customer feedback prior to publication.
 */
export const TESTIMONIALS_DATA = [
  {
    id: 'sample-testimonial-1',
    isSamplePlaceholder: true,
    focusArea: 'Construction Quality',
    rating: 5,
    quote:
      'Every structural element and material finish reflects enduring construction quality. From the foundation stages to the final handover, the engineering standards gave our family complete confidence.',
    customerName: 'Sample Homeowner 01',
    customerRole: 'Homebuyer',
  },
  {
    id: 'sample-testimonial-2',
    isSamplePlaceholder: true,
    focusArea: 'Thoughtful Layouts',
    rating: 5,
    quote:
      'The floor plans are remarkably well-proportioned, offering abundant natural light, cross-ventilation, and privacy. Every square foot is thoughtfully designed around comfortable day-to-day family living.',
    customerName: 'Sample Property Owner 02',
    customerRole: 'Property Owner',
  },
  {
    id: 'sample-testimonial-3',
    isSamplePlaceholder: true,
    focusArea: 'Transparent Communication',
    rating: 5,
    quote:
      'Throughout the development timeline, we received clear milestone updates and honest communication. Having direct, transparent answers at every stage made the homebuying journey effortless.',
    customerName: 'Sample Homebuyer 03',
    customerRole: 'Homebuyer',
  },
  {
    id: 'sample-testimonial-4',
    isSamplePlaceholder: true,
    focusArea: 'Strategic Location',
    rating: 5,
    quote:
      'The location strikes an ideal balance between peaceful residential surroundings and quick access to schools, healthcare, and daily conveniences. It has proven to be a sound long-term decision.',
    customerName: 'Sample Property Owner 04',
    customerRole: 'Property Owner',
  },
  {
    id: 'sample-testimonial-5',
    isSamplePlaceholder: true,
    focusArea: 'Clear Documentation',
    rating: 5,
    quote:
      'All legal paperwork, approvals, and registration formalities were organized with complete clarity. The documentation process was systematic, straightforward, and thoroughly guided from day one.',
    customerName: 'Sample Homebuyer 05',
    customerRole: 'Homebuyer',
  },
  {
    id: 'sample-testimonial-6',
    isSamplePlaceholder: true,
    focusArea: 'Customer Service',
    rating: 5,
    quote:
      'From our very first inquiry to post-possession support, the customer service team has been courteous, attentive, and prompt. Their dedication to homeowner satisfaction truly sets them apart.',
    customerName: 'Sample Property Owner 06',
    customerRole: 'Property Owner',
  },
];

const CLONE_COUNT = 3;
const AUTO_SCROLL_INTERVAL_MS = 4400;
const TRANSITION_DURATION_MS = 680;

export default function TestimonialsSection({
  eyebrow = 'CLIENT TESTIMONIALS',
  headingPrefix = 'What Our ',
  headingHighlight = 'Customers Say',
  testimonials = TESTIMONIALS_DATA,
} = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const totalSlides = testimonials.length;
  const enableLoop = totalSlides > CLONE_COUNT;

  // Track index starts at CLONE_COUNT (3) so the first real card is aligned at index 0
  const [trackIndex, setTrackIndex] = useState(() =>
    enableLoop ? CLONE_COUNT : 0
  );
  const [isInstantJump, setIsInstantJump] = useState(false);
  const isAnimatingRef = useRef(false);
  const touchStartXRef = useRef(null);

  // Build extended track with 3 leading clones and 3 trailing clones for seamless 3/2/1-card looping
  const extendedTestimonials = useMemo(() => {
    if (!enableLoop) return testimonials;
    const leadingClones = testimonials
      .slice(-CLONE_COUNT)
      .map((item, idx) => ({
        ...item,
        trackKey: `clone-pre-${idx}-${item.id}`,
        isClone: true,
      }));
    const mainSlides = testimonials.map((item) => ({
      ...item,
      trackKey: `main-${item.id}`,
      isClone: false,
    }));
    const trailingClones = testimonials
      .slice(0, CLONE_COUNT)
      .map((item, idx) => ({
        ...item,
        trackKey: `clone-post-${idx}-${item.id}`,
        isClone: true,
      }));
    return [...leadingClones, ...mainSlides, ...trailingClones];
  }, [testimonials, enableLoop]);

  // Logical active index (0 .. totalSlides - 1) for pagination indicators
  const activeLogicalIndex = useMemo(() => {
    if (totalSlides === 0) return 0;
    if (!enableLoop) {
      return ((trackIndex % totalSlides) + totalSlides) % totalSlides;
    }
    return (
      (((trackIndex - CLONE_COUNT) % totalSlides) + totalSlides) % totalSlides
    );
  }, [trackIndex, totalSlides, enableLoop]);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    return undefined;
  }, []);

  // Trigger entrance reveal once when section enters viewport
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
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Advance to next testimonial
  const handleNextSlide = useCallback(() => {
    if (totalSlides <= 1 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsInstantJump(false);
    setTrackIndex((prev) => prev + 1);
  }, [totalSlides]);

  // Move to previous testimonial
  const handlePrevSlide = useCallback(() => {
    if (totalSlides <= 1 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsInstantJump(false);
    setTrackIndex((prev) => prev - 1);
  }, [totalSlides]);

  // Jump directly to a specific testimonial via pagination dot
  const handleSelectDot = useCallback(
    (targetLogicalIndex) => {
      if (targetLogicalIndex === activeLogicalIndex || isAnimatingRef.current) {
        return;
      }
      isAnimatingRef.current = true;
      setIsInstantJump(false);
      setTrackIndex(
        enableLoop ? CLONE_COUNT + targetLogicalIndex : targetLogicalIndex
      );
    },
    [activeLogicalIndex, enableLoop]
  );

  // Seamless loop wrap reset after slide transition completes
  useEffect(() => {
    if (!enableLoop) {
      isAnimatingRef.current = false;
      return undefined;
    }

    const timeoutDuration = prefersReducedMotion ? 20 : TRANSITION_DURATION_MS;
    const timer = window.setTimeout(() => {
      if (trackIndex >= CLONE_COUNT + totalSlides) {
        setIsInstantJump(true);
        setTrackIndex((prev) => prev - totalSlides);
      } else if (trackIndex < CLONE_COUNT) {
        setIsInstantJump(true);
        setTrackIndex((prev) => prev + totalSlides);
      }
      isAnimatingRef.current = false;
    }, timeoutDuration);

    return () => window.clearTimeout(timer);
  }, [trackIndex, enableLoop, totalSlides, prefersReducedMotion]);

  // Continuous automatic scrolling (paused on hover/focus or when reduced-motion is active)
  useEffect(() => {
    if (prefersReducedMotion || isPaused || totalSlides <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      handleNextSlide();
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, isPaused, totalSlides, handleNextSlide]);

  // Keyboard accessibility for Left/Right arrows
  const handleCarouselKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNextSlide();
    }
  };

  // Touch swipe gesture handlers
  const handleTouchStart = (event) => {
    setIsPaused(true);
    if (event.touches && event.touches.length > 0) {
      touchStartXRef.current = event.touches[0].clientX;
    }
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartXRef.current !== null &&
      event.changedTouches &&
      event.changedTouches.length > 0
    ) {
      const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;
      const swipeThreshold = 42;

      if (deltaX > swipeThreshold) {
        handlePrevSlide();
      } else if (deltaX < -swipeThreshold) {
        handleNextSlide();
      }
    }

    touchStartXRef.current = null;
    setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`sld-testimonials ${
        isVisible ? 'sld-testimonials--visible' : ''
      }`}
      aria-labelledby="sld-testimonials-heading"
    >
      {/* Subtle Architectural Linework & Soft Ambient Lighting */}
      <div className="sld-testimonials__bg-pattern" aria-hidden="true" />
      <div className="sld-testimonials__ambient-glow" aria-hidden="true" />

      <div className="sld-testimonials__container">
        {/* Centered Luxury Section Heading */}
        <header className="sld-testimonials__header">
          <div className="sld-testimonials__eyebrow">
            <span
              className="sld-testimonials__eyebrow-line"
              aria-hidden="true"
            />
            <span>{eyebrow}</span>
            <span
              className="sld-testimonials__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2 id="sld-testimonials-heading" className="sld-testimonials__heading">
            <span>{headingPrefix}</span>
            <span className="sld-testimonials__heading-accent">
              {headingHighlight}
            </span>
          </h2>

          <div className="sld-testimonials__heading-rule" aria-hidden="true">
            <span className="sld-testimonials__heading-line" />
            <span className="sld-testimonials__heading-diamond" />
            <span className="sld-testimonials__heading-line" />
          </div>
        </header>

        {/* Auto-Scrolling Carousel Region (Pauses on Hover / Keyboard Focus) */}
        <div
          className="sld-testimonials__carousel-region"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          onKeyDown={handleCarouselKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials showcase"
        >
          <div className="sld-testimonials__viewport">
            <div
              className={`sld-testimonials__track ${
                isInstantJump ? 'sld-testimonials__track--instant' : ''
              }`}
              style={{ '--track-index': trackIndex }}
            >
              {extendedTestimonials.map((item, index) => {
                const starCount = Math.max(1, Math.min(5, item.rating || 5));

                return (
                  <div
                    key={item.trackKey || item.id}
                    className="sld-testimonials__slide"
                    aria-hidden={item.isClone ? 'true' : undefined}
                  >
                    <article
                      className={`sld-testimonials__card sld-testimonials__card--${
                        (index % 3) + 1
                      }`}
                      aria-label={`Sample testimonial from ${item.customerName}, ${item.customerRole}`}
                    >
                      {/* Decorative Background Watermark Quote */}
                      <Quote
                        className="sld-testimonials__watermark-quote"
                        strokeWidth={1}
                        aria-hidden="true"
                      />

                      {/* Card Top Row: Refined Gold Quotation Icon & 5-Star Rating */}
                      <div className="sld-testimonials__card-top">
                        <div
                          className="sld-testimonials__quote-badge"
                          aria-hidden="true"
                        >
                          <Quote
                            className="sld-testimonials__quote-icon"
                            strokeWidth={1.6}
                          />
                        </div>

                        <div
                          className="sld-testimonials__rating"
                          role="img"
                          aria-label={`${starCount} out of 5 stars`}
                        >
                          {Array.from({ length: starCount }).map(
                            (_, starIdx) => (
                              <Star
                                key={starIdx}
                                className="sld-testimonials__star"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            )
                          )}
                        </div>
                      </div>

                      {/* Testimonial Quote Body */}
                      <blockquote className="sld-testimonials__quote-body">
                        <p className="sld-testimonials__quote-text">
                          “{item.quote}”
                        </p>
                      </blockquote>

                      {/* Customer Attribution Footer */}
                      <footer className="sld-testimonials__author">
                        <div
                          className="sld-testimonials__author-rule"
                          aria-hidden="true"
                        />
                        <div className="sld-testimonials__author-meta">
                          <cite className="sld-testimonials__author-name">
                            {item.customerName}
                          </cite>
                          <span className="sld-testimonials__author-role">
                            {item.customerRole}
                          </span>
                        </div>
                      </footer>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discreet Previous / Next Controls & Pagination Indicators */}
          {totalSlides > 1 && (
            <nav
              className="sld-testimonials__controls"
              aria-label="Testimonials carousel navigation"
            >
              <button
                type="button"
                className="sld-testimonials__nav-btn"
                onClick={handlePrevSlide}
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  className="sld-testimonials__nav-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>

              <div
                className="sld-testimonials__dots"
                role="tablist"
                aria-label="Choose testimonial slide"
              >
                {testimonials.map((item, idx) => {
                  const isSelected = idx === activeLogicalIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Show testimonial ${idx + 1} of ${totalSlides}`}
                      className={`sld-testimonials__dot ${
                        isSelected ? 'sld-testimonials__dot--active' : ''
                      }`}
                      onClick={() => handleSelectDot(idx)}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                className="sld-testimonials__nav-btn"
                onClick={handleNextSlide}
                aria-label="Next testimonial"
              >
                <ChevronRight
                  className="sld-testimonials__nav-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
