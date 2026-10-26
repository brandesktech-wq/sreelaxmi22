import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye } from 'lucide-react';
import './MissionVisionSection.css';

export const MISSION_VISION_ITEMS = [
  {
    id: 'our-mission',
    heading: 'Our Mission',
    text: 'Our mission is to create thoughtfully designed spaces that combine quality construction, practical layouts, and modern living while delivering a transparent and comfortable property-buying experience.',
    Icon: Target,
  },
  {
    id: 'our-vision',
    heading: 'Our Vision',
    text: 'Our vision is to build lasting trust through quality, thoughtful planning, and customer-focused development, creating spaces that offer long-term value and an enhanced living experience.',
    Icon: Eye,
  },
];

export default function MissionVisionSection({
  items = MISSION_VISION_ITEMS,
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
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-mission-vision ${
        isVisible ? 'sld-mission-vision--visible' : ''
      }`}
      aria-label="Our Mission and Vision"
    >
      <div className="sld-mission-vision__container">
        <div className="sld-mission-vision__grid">
          {items.map((item, index) => {
            const IconComponent = item.Icon;

            return (
              <article
                key={item.id}
                className={`sld-mission-vision__card sld-mission-vision__card--${
                  (index % 2) + 1
                }`}
              >
                {/* Gold-Outline Circular Icon Medallion */}
                <div
                  className="sld-mission-vision__icon-badge"
                  aria-hidden="true"
                >
                  <IconComponent
                    className="sld-mission-vision__icon"
                    strokeWidth={1.6}
                  />
                </div>

                {/* Card Heading */}
                <h2 className="sld-mission-vision__heading">{item.heading}</h2>

                {/* Small Gold Decorative Line Beneath Heading */}
                <div
                  className="sld-mission-vision__rule"
                  aria-hidden="true"
                />

                {/* Card Body Copy */}
                <p className="sld-mission-vision__text">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
