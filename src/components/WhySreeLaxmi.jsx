import React, { useEffect, useRef, useState } from 'react';
import {
  Building2,
  ShieldCheck,
  MapPin,
  UsersRound,
  House,
  ChartNoAxesCombined,
} from 'lucide-react';
import './WhySreeLaxmi.css';

export const WHY_SREE_LAXMI_FEATURES = [
  {
    id: 'quality-construction',
    number: '01',
    title: 'Quality Construction',
    description:
      'Thoughtfully designed homes with a focus on construction quality, practical layouts, and lasting comfort.',
    Icon: Building2,
  },
  {
    id: 'transparent-process',
    number: '02',
    title: 'Transparent Process',
    description:
      'Clear communication and a straightforward approach throughout the property-buying journey.',
    Icon: ShieldCheck,
  },
  {
    id: 'thoughtful-locations',
    number: '03',
    title: 'Thoughtful Locations',
    description:
      'Residential developments planned around accessibility, everyday convenience, and connectivity.',
    Icon: MapPin,
  },
  {
    id: 'customer-first-approach',
    number: '04',
    title: 'Customer-First Approach',
    description:
      'A customer-focused experience designed to make the home-buying journey more informed and comfortable.',
    Icon: UsersRound,
  },
  {
    id: 'modern-living',
    number: '05',
    title: 'Modern Living',
    description:
      'Residential spaces designed to balance functionality, comfort, and contemporary lifestyles.',
    Icon: House,
  },
  {
    id: 'long-term-value',
    number: '06',
    title: 'Long-Term Value',
    description:
      'A considered approach to property selection, location, and practical residential planning.',
    Icon: ChartNoAxesCombined,
  },
];

export default function WhySreeLaxmi({
  eyebrow = 'THE SREE LAXMI DIFFERENCE',
  heading = 'Why Sree Laxmi',
  features = WHY_SREE_LAXMI_FEATURES,
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sld-why ${isVisible ? 'sld-why--visible' : ''}`}
      aria-labelledby="sld-why-heading"
    >
      {/* Subtle Architectural Linework & Ambient Lighting */}
      <div className="sld-why__bg-pattern" aria-hidden="true" />

      <div className="sld-why__container">
        {/* Centered Section Header (No Subtitle Below Heading) */}
        <header className="sld-why__header">
          <div className="sld-why__kicker">
            <span className="sld-why__kicker-line" aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="sld-why__kicker-line" aria-hidden="true" />
          </div>

          <h2 id="sld-why-heading" className="sld-why__heading">
            {heading}
          </h2>
        </header>

        {/* Six Icon-Based Architectural Features */}
        <ul className="sld-why__grid">
          {features.map((feature, index) => {
            const IconComponent = feature.Icon;
            return (
              <li
                key={feature.id}
                className={`sld-why__item sld-why__item--${index + 1}`}
              >
                <div className="sld-why__item-top">
                  <span className="sld-why__icon-frame" aria-hidden="true">
                    <IconComponent className="sld-why__icon" strokeWidth={1.6} />
                  </span>
                  <span className="sld-why__index" aria-hidden="true">
                    {feature.number}
                  </span>
                </div>

                <h3 className="sld-why__item-title">{feature.title}</h3>
                <div className="sld-why__item-divider" aria-hidden="true" />
                <p className="sld-why__item-desc">{feature.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
