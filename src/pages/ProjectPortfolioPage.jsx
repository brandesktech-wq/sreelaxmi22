import React, { useEffect, useRef, useState } from 'react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import ProjectFilters from '../components/ProjectFilters.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import {
  PORTFOLIO_TABS,
  getCombinedPortfolioProjects,
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

  const displayedProjects = statusFilter
    ? getProjectsByStatus(statusFilter)
    : getCombinedPortfolioProjects();

  return (
    <div className="sld-portfolio-page">
      {/* Part 1: Compact Dark Luxury Title Bar */}
      <ProjectTitleBar title={bannerTitle} breadcrumbs={breadcrumbs} />

      {/* Part 2 & 3: Portfolio Section with Navigable Filter Tabs & Unified Project Grid */}
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

          <div className="sld-portfolio-section__group">
            <div className="sld-portfolio-section__grid" role="list">
              {displayedProjects.map((project, index) => (
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
        </div>
      </section>
    </div>
  );
}
