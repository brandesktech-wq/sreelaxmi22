import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import ProjectFilters from '../components/ProjectFilters.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import {
  PORTFOLIO_TABS,
  getProjectsByStatus,
} from '../data/projectsData.js';
import './ProjectPortfolioPage.css';

export default function ProjectPortfolioPage({ statusFilter = '' } = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => window.cancelAnimationFrame(timer);
  }, [statusFilter]);

  const activeTabConfig = statusFilter
    ? PORTFOLIO_TABS.find(
        (t) => t.id.toLowerCase() === statusFilter.toLowerCase()
      )
    : null;

  const bannerTitle = activeTabConfig ? activeTabConfig.title : 'Our Projects';

  const breadcrumbs = activeTabConfig
    ? [
        { label: 'Home', path: '/' },
        { label: 'Project Portfolio', path: '/projects' },
        { label: activeTabConfig.breadcrumbLabel, path: null },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Project Portfolio', path: null },
      ];

  const filteredProjects = statusFilter
    ? getProjectsByStatus(statusFilter)
    : [];

  return (
    <div className="sld-portfolio-page">
      {/* Part 1: Compact Dark Luxury Title Bar */}
      <ProjectTitleBar title={bannerTitle} breadcrumbs={breadcrumbs} />

      {/* Part 2 & 3: Portfolio Section with Navigable Filter Tabs & Project Cards */}
      <section
        ref={sectionRef}
        className={`sld-portfolio-section ${
          isVisible ? 'sld-portfolio-section--visible' : ''
        }`}
        aria-label={bannerTitle}
      >
        <div className="sld-portfolio-section__container">
          <ProjectFilters
            heading="Our Projects"
            activeStatus={statusFilter}
          />

          {statusFilter ? (
            /* Single Status Page View (/ongoing-projects, /upcoming-projects, /completed-projects) */
            <div className="sld-portfolio-section__group">
              <div className="sld-portfolio-section__grid" role="list">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    role="listitem"
                    className="sld-portfolio-section__grid-item"
                    style={{ '--card-index': index }}
                  >
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Main Portfolio Overview (/projects) — Grouped by Ongoing, Upcoming & Completed */
            <div className="sld-portfolio-section__categories">
              {PORTFOLIO_TABS.map((category) => {
                const categoryProjects = getProjectsByStatus(category.id);

                return (
                  <div
                    key={category.id}
                    className="sld-portfolio-section__category-block"
                  >
                    <div className="sld-portfolio-section__category-bar">
                      <div className="sld-portfolio-section__category-titles">
                        <span className="sld-portfolio-section__category-tag">
                          {category.label}
                        </span>
                        <h3 className="sld-portfolio-section__category-heading">
                          {category.title}
                        </h3>
                      </div>

                      <Link
                        to={category.route}
                        className="sld-portfolio-section__category-link"
                      >
                        <span>Explore {category.title}</span>
                        <ArrowRight
                          className="sld-portfolio-section__category-icon"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                    <div className="sld-portfolio-section__grid" role="list">
                      {categoryProjects.map((project, index) => (
                        <div
                          key={project.id}
                          role="listitem"
                          className="sld-portfolio-section__grid-item"
                          style={{ '--card-index': index }}
                        >
                          <ProjectCard project={project} index={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
