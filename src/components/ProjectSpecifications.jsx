import React from 'react';
import { motion } from 'motion/react';
import {
  BrickWall,
  DoorOpen,
  Droplets,
  Layers,
  LayoutGrid,
  Utensils,
  Zap,
} from 'lucide-react';
import './ProjectSpecifications.css';

const SPECIFICATION_CATEGORIES = [
  {
    key: 'structure',
    title: 'Structure',
    icon: Layers,
  },
  {
    key: 'walls',
    title: 'Walls',
    icon: BrickWall,
  },
  {
    key: 'flooring',
    title: 'Flooring',
    icon: LayoutGrid,
  },
  {
    key: 'doorsWindows',
    title: 'Doors & Windows',
    icon: DoorOpen,
  },
  {
    key: 'kitchen',
    title: 'Kitchen',
    icon: Utensils,
  },
  {
    key: 'electrical',
    title: 'Electrical',
    icon: Zap,
  },
  {
    key: 'plumbing',
    title: 'Plumbing',
    icon: Droplets,
  },
];

export default function ProjectSpecifications({
  project,
  prefersReducedMotion = false,
  id = 'project-specifications',
  navLabel = 'Specifications',
}) {
  if (!project) return null;

  const specsData =
    project.specifications &&
    typeof project.specifications === 'object' &&
    !Array.isArray(project.specifications)
      ? project.specifications
      : {};

  const headerRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      };

  const gridVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.11,
            delayChildren: 0.05,
          },
        },
      };

  const cardVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  return (
    <section
      id={id}
      data-project-nav-section="true"
      data-project-nav-label={navLabel}
      className="sld-project-specs"
      aria-labelledby="sld-project-specifications-heading"
    >
      <div className="sld-project-specs__container">
        <motion.header
          className="sld-project-specs__header"
          {...headerRevealProps}
        >
          <div className="sld-project-specs__eyebrow">
            <span
              className="sld-project-specs__eyebrow-line"
              aria-hidden="true"
            />
            <span>QUALITY IN EVERY DETAIL</span>
            <span
              className="sld-project-specs__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2
            id="sld-project-specifications-heading"
            className="sld-project-specs__heading"
          >
            Specifications
          </h2>

          <div className="sld-project-specs__rule" aria-hidden="true">
            <span className="sld-project-specs__rule-line" />
            <span className="sld-project-specs__rule-diamond" />
            <span className="sld-project-specs__rule-line" />
          </div>
        </motion.header>

        <motion.ul
          className="sld-project-specs__grid"
          variants={gridVariants}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={
            prefersReducedMotion ? undefined : { once: true, amount: 0.15 }
          }
        >
          {SPECIFICATION_CATEGORIES.map((category) => {
            const SpecIcon = category.icon;
            const rawText = specsData[category.key];
            const hasDetail =
              typeof rawText === 'string' && rawText.trim().length > 0;
            const displayText = hasDetail
              ? rawText.trim()
              : 'Details Coming Soon';

            return (
              <motion.li
                key={category.key}
                className="sld-project-specs__card"
                variants={cardVariants}
              >
                <div className="sld-project-specs__card-top">
                  <span
                    className="sld-project-specs__icon-box"
                    aria-hidden="true"
                  >
                    <SpecIcon
                      className="sld-project-specs__icon"
                      size={20}
                      strokeWidth={1.65}
                    />
                  </span>
                  <h3 className="sld-project-specs__card-title">
                    {category.title}
                  </h3>
                </div>

                <div
                  className="sld-project-specs__card-divider"
                  aria-hidden="true"
                />

                <p
                  className={`sld-project-specs__card-desc specification-description ${
                    !hasDetail ? 'sld-project-specs__card-desc--fallback' : ''
                  }`}
                >
                  {displayText}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
