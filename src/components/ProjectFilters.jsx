import React from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_TABS } from '../data/projectsData.js';
import './ProjectFilters.css';

export default function ProjectFilters({
  eyebrow = 'PROJECT PORTFOLIO',
  heading = 'Our Projects',
  activeStatus = '',
  tabs = PORTFOLIO_TABS,
} = {}) {
  return (
    <div className="sld-portfolio-filters">
      {/* Centered Section Heading */}
      <header className="sld-portfolio-filters__header">
        <div className="sld-portfolio-filters__eyebrow">
          <span
            className="sld-portfolio-filters__eyebrow-line"
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
          <span
            className="sld-portfolio-filters__eyebrow-line"
            aria-hidden="true"
          />
        </div>

        <h2 className="sld-portfolio-filters__heading">{heading}</h2>

        <div className="sld-portfolio-filters__rule" aria-hidden="true">
          <span className="sld-portfolio-filters__rule-line" />
          <span className="sld-portfolio-filters__rule-diamond" />
          <span className="sld-portfolio-filters__rule-line" />
        </div>
      </header>

      {/* Three Navigable Status Tabs */}
      <nav
        className="sld-portfolio-filters__nav"
        aria-label="Project Status Navigation"
      >
        <div className="sld-portfolio-filters__tabs" role="tablist">
          {tabs.map((tab) => {
            const isActive =
              activeStatus &&
              activeStatus.toLowerCase() === tab.id.toLowerCase();

            return (
              <Link
                key={tab.id}
                to={isActive ? '/projects' : tab.route}
                role="tab"
                aria-selected={Boolean(isActive)}
                aria-current={isActive ? 'page' : undefined}
                className={`sld-portfolio-filters__tab ${
                  isActive ? 'sld-portfolio-filters__tab--active' : ''
                }`}
              >
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {activeStatus && (
          <div className="sld-portfolio-filters__all-wrap">
            <Link to="/projects" className="sld-portfolio-filters__all-link">
              View All Projects in Portfolio
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
