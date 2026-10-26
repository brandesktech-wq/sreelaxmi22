import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectTitleBar.css';

export default function ProjectTitleBar({
  title = 'Our Projects',
  breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Project Portfolio', path: null },
  ],
  backgroundImage = '/assets/hero-slide-2.jpg',
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
      className={`sld-project-banner ${
        isVisible ? 'sld-project-banner--visible' : ''
      }`}
      aria-labelledby="sld-project-page-title"
    >
      {/* Subtle Low-Opacity Architectural Image & Refined Dark Navy Overlay */}
      <div
        className="sld-project-banner__bg-image"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden="true"
      />
      <div className="sld-project-banner__overlay" aria-hidden="true" />
      <div className="sld-project-banner__grid-lines" aria-hidden="true" />

      <div className="sld-project-banner__container">
        <div className="sld-project-banner__content">
          {/* Breadcrumb Navigation */}
          <nav
            className="sld-project-banner__breadcrumb"
            aria-label="Breadcrumb"
          >
            <ol className="sld-project-banner__breadcrumb-list">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={`${crumb.label}-${index}`}>
                    <li
                      className={`sld-project-banner__breadcrumb-item ${
                        isLast
                          ? 'sld-project-banner__breadcrumb-item--current'
                          : ''
                      }`}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.path && !isLast ? (
                        <Link
                          to={crumb.path}
                          className="sld-project-banner__breadcrumb-link"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </li>
                    {!isLast && (
                      <li
                        className="sld-project-banner__breadcrumb-sep"
                        aria-hidden="true"
                      >
                        /
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>

          {/* Main Page Heading */}
          <h1 id="sld-project-page-title" className="sld-project-banner__title">
            {title}
          </h1>

          {/* Thin Gold Decorative Line with Center Diamond */}
          <div className="sld-project-banner__rule" aria-hidden="true">
            <span className="sld-project-banner__rule-line" />
            <span className="sld-project-banner__rule-diamond" />
            <span className="sld-project-banner__rule-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
