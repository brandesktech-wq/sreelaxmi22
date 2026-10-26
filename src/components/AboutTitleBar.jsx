import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutTitleBar.css';

export const ABOUT_TITLE_BAR_CONTENT = {
  breadcrumbHomeLabel: 'Home',
  breadcrumbHomePath: '/',
  breadcrumbCurrentLabel: 'About Us',
  title: 'About Us',
  backgroundImage: '/assets/hero-slide-1.jpg',
};

export default function AboutTitleBar({
  breadcrumbHomeLabel = ABOUT_TITLE_BAR_CONTENT.breadcrumbHomeLabel,
  breadcrumbHomePath = ABOUT_TITLE_BAR_CONTENT.breadcrumbHomePath,
  breadcrumbCurrentLabel = ABOUT_TITLE_BAR_CONTENT.breadcrumbCurrentLabel,
  title = ABOUT_TITLE_BAR_CONTENT.title,
  backgroundImage = ABOUT_TITLE_BAR_CONTENT.backgroundImage,
} = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => window.cancelAnimationFrame(timer);
  }, []);

  return (
    <section
      className={`sld-about-banner ${
        isVisible ? 'sld-about-banner--visible' : ''
      }`}
      aria-labelledby="sld-about-page-title"
    >
      {/* Subtle Low-Opacity Architectural Image & Refined Dark Navy Overlay */}
      <div
        className="sld-about-banner__bg-image"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden="true"
      />
      <div className="sld-about-banner__overlay" aria-hidden="true" />
      <div className="sld-about-banner__grid-lines" aria-hidden="true" />

      <div className="sld-about-banner__container">
        <div className="sld-about-banner__content">
          {/* Breadcrumb Navigation: Home / About Us */}
          <nav
            className="sld-about-banner__breadcrumb"
            aria-label="Breadcrumb"
          >
            <ol className="sld-about-banner__breadcrumb-list">
              <li className="sld-about-banner__breadcrumb-item">
                <Link
                  to={breadcrumbHomePath}
                  className="sld-about-banner__breadcrumb-link"
                >
                  {breadcrumbHomeLabel}
                </Link>
              </li>
              <li
                className="sld-about-banner__breadcrumb-sep"
                aria-hidden="true"
              >
                /
              </li>
              <li
                className="sld-about-banner__breadcrumb-item sld-about-banner__breadcrumb-item--current"
                aria-current="page"
              >
                {breadcrumbCurrentLabel}
              </li>
            </ol>
          </nav>

          {/* Main Page Heading */}
          <h1 id="sld-about-page-title" className="sld-about-banner__title">
            {title}
          </h1>

          {/* Subtle Decorative Gold Line Beneath Title */}
          <div className="sld-about-banner__rule" aria-hidden="true">
            <span className="sld-about-banner__rule-line" />
            <span className="sld-about-banner__rule-diamond" />
            <span className="sld-about-banner__rule-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
