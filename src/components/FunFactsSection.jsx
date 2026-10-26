import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, UsersRound, Building2, Landmark } from 'lucide-react';
import './FunFactsSection.css';

// Editable placeholder statistics — update from this single array when confirmed
export const FUN_FACTS_STATS = [
  {
    id: 'years-experience',
    target: 10,
    suffix: '+',
    label: 'Years of Experience',
    Icon: CalendarCheck,
  },
  {
    id: 'happy-customers',
    target: 500,
    suffix: '+',
    label: 'Happy Customers',
    Icon: UsersRound,
  },
  {
    id: 'projects-delivered',
    target: 15,
    suffix: '+',
    label: 'Projects Delivered',
    Icon: Building2,
  },
  {
    id: 'sqft-developed',
    target: 1,
    suffix: 'M+',
    label: 'Sq. Ft. Developed',
    Icon: Landmark,
  },
];

const ANIMATION_DURATION_MS = 1650;

export default function FunFactsSection({
  eyebrow = 'OUR JOURNEY IN NUMBERS',
  heading = 'OUR ACHIEVEMENTS',
  stats = FUN_FACTS_STATS,
  showHeader = true,
} = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  // Detect when section enters viewport once per visit
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
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animate numbers smoothly from 0 to target once visible, respecting reduced motion
  useEffect(() => {
    if (!isVisible) return undefined;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounts(stats.map((item) => item.target));
      return undefined;
    }

    let animationFrameId = null;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
      // Smooth cubic ease-out curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((item) => Math.round(easedProgress * item.target))
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animateCount);
      } else {
        setCounts(stats.map((item) => item.target));
      }
    };

    animationFrameId = window.requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, stats]);

  return (
    <section
      ref={sectionRef}
      className={`sld-funfacts ${isVisible ? 'sld-funfacts--visible' : ''} ${
        !showHeader ? 'sld-funfacts--headless' : ''
      }`}
      aria-labelledby={showHeader ? 'sld-funfacts-heading' : undefined}
      aria-label={!showHeader ? 'Company Achievements and Statistics' : undefined}
    >
      {/* Subtle Architectural Grid & Ambient Radial Glow */}
      <div className="sld-funfacts__bg-decor" aria-hidden="true" />
      <div className="sld-funfacts__ambient-light" aria-hidden="true" />

      <div className="sld-funfacts__container">
        {/* Centered Section Heading with Animated Gold Underline (Hidden when showHeader is false) */}
        {showHeader && (
          <header className="sld-funfacts__header">
            <div className="sld-funfacts__kicker">
              <span className="sld-funfacts__kicker-line" aria-hidden="true" />
              <span>{eyebrow}</span>
              <span className="sld-funfacts__kicker-line" aria-hidden="true" />
            </div>

            <h2 id="sld-funfacts-heading" className="sld-funfacts__heading">
              {heading}
            </h2>

            <div className="sld-funfacts__heading-rule" aria-hidden="true">
              <span className="sld-funfacts__heading-line" />
              <span className="sld-funfacts__heading-diamond" />
              <span className="sld-funfacts__heading-line" />
            </div>
          </header>
        )}

        {/* Glass-Like Dark Navy Statistics Panel (4-Col Desktop, 2-Col Tablet, 1-Col Mobile) */}
        <div className="sld-funfacts__panel">
          <ul className="sld-funfacts__grid sld-funfacts__grid--mobile-stack">
            {stats.map((stat, index) => {
              const IconComponent = stat.Icon;
              const currentCount = counts[index] ?? stat.target;

              return (
                <li
                  key={stat.id}
                  className={`sld-funfacts__item sld-funfacts__item--${
                    (index % 4) + 1
                  }`}
                >
                  {/* Circular Architectural Medallion with Layered Outer Ring */}
                  <div className="sld-funfacts__medallion" aria-hidden="true">
                    <span className="sld-funfacts__medallion-ring" />
                    <span className="sld-funfacts__medallion-core">
                      <IconComponent
                        className="sld-funfacts__icon"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>

                  {/* Animated Statistic Number */}
                  <div
                    className="sld-funfacts__number"
                    aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
                  >
                    <span className="sld-funfacts__value" aria-hidden="true">
                      {currentCount}
                    </span>
                    <span className="sld-funfacts__suffix" aria-hidden="true">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Elegant Gold Divider Beneath Number */}
                  <div className="sld-funfacts__divider" aria-hidden="true">
                    <span className="sld-funfacts__divider-dot" />
                  </div>

                  {/* Statistic Label */}
                  <h3 className="sld-funfacts__label">{stat.label}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
