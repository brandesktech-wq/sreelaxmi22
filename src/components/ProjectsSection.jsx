import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import './ProjectsSection.css';

export const PROJECT_STATUS_TABS = ['Ongoing', 'Upcoming', 'Completed'];

export const FEATURED_PROJECTS = [
  {
    id: 'sree-laxmi-royale',
    name: 'Sree Laxmi Royale',
    status: 'Ongoing',
    location: 'Saketh Township, Kapra',
    image: '/assets/project-royale.jpg',
    imageAlt:
      'Sree Laxmi Royale — modern residential apartment development in Saketh Township, Kapra with landscaped surroundings',
    path: '/portfolio/royale',
  },
  {
    id: 'sln-meadows',
    name: 'SLN Meadows',
    status: 'Upcoming',
    location: 'Kandi, Sangareddy',
    image: '/assets/project-meadows.jpg',
    imageAlt:
      'SLN Meadows — contemporary residential development in Kandi, Sangareddy featuring modern architecture and greenery',
    path: '/portfolio/meadows',
  },
  {
    id: 'sree-laxmi-gardenia',
    name: 'Sree Laxmi Gardenia',
    status: 'Completed',
    location: 'Kapra / ECIL',
    image: '/assets/project-gardenia.jpg',
    imageAlt:
      'Sree Laxmi Gardenia — completed residential apartment community in Kapra / ECIL',
    path: '/portfolio/gardenia',
  },
];

export default function ProjectsSection({
  eyebrow = 'OUR PORTFOLIO',
  heading = 'Featured Projects',
  viewAllLabel = 'View All Projects',
  viewAllPath = '/projects',
  projects = FEATURED_PROJECTS,
  statusTabs = PROJECT_STATUS_TABS,
} = {}) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Clicking a status tab filters by that status; clicking the active status tab again restores all three featured projects
  const handleTabClick = (status) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
  };

  const visibleProjects = selectedStatus
    ? projects.filter((project) => project.status === selectedStatus)
    : projects;

  return (
    <section
      ref={sectionRef}
      className={`sld-projects ${isVisible ? 'sld-projects--visible' : ''}`}
      aria-labelledby="sld-projects-heading"
    >
      <div className="sld-projects__container">
        {/* Heading Row & View All Projects Link */}
        <header className="sld-projects__header">
          <div className="sld-projects__title-group">
            <div className="sld-projects__kicker">
              <span className="sld-projects__kicker-line" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>

            <h2 id="sld-projects-heading" className="sld-projects__heading">
              {heading}
            </h2>
          </div>

          <Link to={viewAllPath} className="sld-projects__view-all">
            <span>{viewAllLabel}</span>
            <ArrowRight className="sld-projects__view-all-icon" aria-hidden="true" />
          </Link>
        </header>

        {/* Interactive Project Status Filter Tabs */}
        <div className="sld-projects__filters-bar">
          <div
            className="sld-projects__tabs"
            role="tablist"
            aria-label="Filter projects by status"
          >
            {statusTabs.map((status) => {
              const isActive = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`sld-projects__tab ${
                    isActive ? 'sld-projects__tab--active' : ''
                  }`}
                  onClick={() => handleTabClick(status)}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <ul className="sld-projects__grid" aria-live="polite">
          {visibleProjects.map((project, index) => (
            <li
              key={`${project.id}-${selectedStatus || 'all'}`}
              className={`sld-projects__card-item sld-projects__card-item--${
                (index % 3) + 1
              }`}
            >
              <Link
                to={project.path}
                className="sld-projects__card"
                aria-label={`${project.name} — ${project.status} project in ${project.location}. View Details`}
              >
                <div className="sld-projects__image-wrap">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="sld-projects__img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="sld-projects__image-overlay" aria-hidden="true" />
                  <span className="sld-projects__status">{project.status}</span>
                </div>

                <div className="sld-projects__body">
                  <h3 className="sld-projects__name">{project.name}</h3>

                  <div className="sld-projects__location">
                    <MapPin className="sld-projects__pin-icon" aria-hidden="true" />
                    <span>{project.location}</span>
                  </div>

                  <div className="sld-projects__footer">
                    <span className="sld-projects__details-link">
                      <span>View Details</span>
                      <ArrowRight
                        className="sld-projects__details-icon"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
