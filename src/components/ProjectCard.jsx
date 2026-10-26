import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 } = {}) {
  if (!project) return null;

  return (
    <article
      className={`sld-project-card sld-project-card--stagger-${
        (index % 3) + 1
      }`}
    >
      <Link
        to={project.detailRoute}
        className="sld-project-card__link"
        aria-label={`${project.name} — ${project.status} project in ${project.location}. View Details`}
      >
        {/* Property Image Area */}
        <div className="sld-project-card__media">
          <img
            src={project.image}
            alt={`${project.name} — ${project.location}`}
            className="sld-project-card__img"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="sld-project-card__overlay" aria-hidden="true" />
          <span
            className={`sld-project-card__badge sld-project-card__badge--${project.status.toLowerCase()}`}
          >
            {project.status}
          </span>
        </div>

        {/* Card Content Body */}
        <div className="sld-project-card__body">
          <h3 className="sld-project-card__title">{project.name}</h3>

          <div className="sld-project-card__location">
            <MapPin className="sld-project-card__pin" aria-hidden="true" />
            <span>{project.location}</span>
          </div>

          <div className="sld-project-card__footer">
            <span className="sld-project-card__cta">
              <span>View Details</span>
              <ArrowRight
                className="sld-project-card__cta-icon"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
