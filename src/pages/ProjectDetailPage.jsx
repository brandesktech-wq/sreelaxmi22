import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Droplets,
  Dumbbell,
  ExternalLink,
  Film,
  Footprints,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  MapPin,
  Maximize2,
  Navigation,
  PhoneCall,
  Play,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Sparkles,
  Trees,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import ContactSection from '../components/ContactSection.jsx';
import {
  PORTFOLIO_TABS,
  PROJECT_FLOOR_PLAN_CATEGORIES,
  getProjectByIdOrAlias,
} from '../data/projectsData.js';
import './ProjectDetailPage.css';

/**
 * Extracts a validated 11-character YouTube video ID from a YouTube URL or ID
 * and returns a clean embed URL, or null if not configured/valid.
 */
function getYouTubeEmbedUrl(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  // Direct 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    let videoId = null;

    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] || null;
    } else if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      if (parsed.pathname === '/watch') {
        videoId = parsed.searchParams.get('v');
      } else {
        const parts = parsed.pathname.split('/').filter(Boolean);
        if (
          parts.length >= 2 &&
          (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'v')
        ) {
          videoId = parts[1];
        }
      }
    }

    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Maps amenity icon identifiers to large, clean outline Lucide icons
 */
function AmenityOutlineIcon({ type, className }) {
  switch (type) {
    case 'clubhouse':
      return <Building2 className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'supermarket':
      return <ShoppingBag className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'hall':
      return <Users className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'yoga':
      return <Sparkles className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'play-area':
      return <Smile className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'garden':
      return <Trees className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'indoor-games':
      return <Gamepad2 className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'walking-track':
      return <Footprints className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'fitness':
      return <Dumbbell className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'security':
      return <ShieldCheck className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'parking':
      return <Car className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'power':
      return <Zap className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'water':
      return <Droplets className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'vastu':
      return <Compass className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'sports':
      return <Trophy className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'library':
      return <BookOpen className={className} strokeWidth={1.45} aria-hidden="true" />;
    case 'theatre':
      return <Film className={className} strokeWidth={1.45} aria-hidden="true" />;
    default:
      return <Building2 className={className} strokeWidth={1.45} aria-hidden="true" />;
  }
}

/**
 * Dark Floor Plans Section with Category Tabs & Horizontal Image Slider (Prompt 47)
 * Positioned immediately after Nearby Facilities and before the Scroll-Driven Horizontal Gallery.
 */
function ProjectFloorPlansSection({
  project,
  prefersReducedMotion,
  onSelectFloorPlan,
}) {
  const categories =
    project.floorPlans && project.floorPlans.length > 0
      ? project.floorPlans
      : PROJECT_FLOOR_PLAN_CATEGORIES;

  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id || 'ground-floor'
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [stepPx, setStepPx] = useState(0);
  const [maxTranslatePx, setMaxTranslatePx] = useState(0);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  // Reset category and slide index when switching projects
  useEffect(() => {
    setActiveCategoryId(categories[0]?.id || 'ground-floor');
    setCurrentSlide(0);
  }, [project.id, categories]);

  const activeCategory =
    categories.find((cat) => cat.id === activeCategoryId) || categories[0];
  const slides = activeCategory ? activeCategory.items : [];
  const totalSlides = slides.length;

  const measureSlider = useCallback(() => {
    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl) return;

    const w = window.innerWidth;
    const nextVisible = w <= 640 ? 1 : w <= 1024 ? 2 : 3;
    setVisibleCount(nextVisible);

    const firstSlide = trackEl.querySelector('.floor-plan-slide');
    if (firstSlide) {
      const slideRect = firstSlide.getBoundingClientRect();
      const computedTrack = window.getComputedStyle(trackEl);
      const gap = parseFloat(computedTrack.columnGap || computedTrack.gap || '0') || 0;
      setStepPx(slideRect.width + gap);
    }

    const maxOverflow = Math.max(
      0,
      Math.ceil(trackEl.scrollWidth - viewportEl.clientWidth)
    );
    setMaxTranslatePx(maxOverflow);

    const maxIndex = Math.max(0, totalSlides - nextVisible);
    setCurrentSlide((prev) => Math.min(prev, maxIndex));
  }, [totalSlides]);

  useEffect(() => {
    measureSlider();

    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureSlider();
      });
      if (viewportEl) resizeObserver.observe(viewportEl);
      if (trackEl) resizeObserver.observe(trackEl);
    }

    window.addEventListener('resize', measureSlider, { passive: true });
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', measureSlider);
    };
  }, [measureSlider, activeCategoryId]);

  const maxSlideIndex = Math.max(0, totalSlides - visibleCount);
  const clampedSlide = Math.min(currentSlide, maxSlideIndex);

  const rawTranslate = clampedSlide * stepPx;
  const translateX =
    maxTranslatePx > 0 ? Math.min(rawTranslate, maxTranslatePx) : 0;

  const isPrevDisabled = clampedSlide <= 0;
  const isNextDisabled =
    clampedSlide >= maxSlideIndex ||
    (maxTranslatePx > 0 && translateX >= maxTranslatePx - 2);

  const handleSelectCategory = useCallback((categoryId) => {
    setActiveCategoryId(categoryId);
    setCurrentSlide(0);
  }, []);

  const handleTabKeyDown = useCallback(
    (event, index) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const dir = event.key === 'ArrowRight' ? 1 : -1;
      const nextIdx = (index + dir + categories.length) % categories.length;
      const nextCat = categories[nextIdx];
      if (nextCat) {
        handleSelectCategory(nextCat.id);
        const tabBtn = document.getElementById(`floor-plan-tab-${nextCat.id}`);
        tabBtn?.focus();
      }
    },
    [categories, handleSelectCategory]
  );

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(maxSlideIndex, prev + 1));
  }, [maxSlideIndex]);

  const handleTouchStart = useCallback((event) => {
    if (!event.touches || event.touches.length === 0) return;
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (
      touchStartXRef.current === null ||
      !event.touches ||
      event.touches.length === 0
    ) {
      return;
    }
    touchDeltaXRef.current =
      event.touches[0].clientX - touchStartXRef.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartXRef.current === null) return;
    const delta = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;

    if (Math.abs(delta) > 42) {
      if (delta < 0) {
        setCurrentSlide((prev) => Math.min(maxSlideIndex, prev + 1));
      } else {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    }
  }, [maxSlideIndex]);

  if (!activeCategory || totalSlides === 0) return null;

  return (
    <section
      className="floor-plans-section sld-project-detail__floor-plans"
      aria-labelledby="sld-project-floor-plans-heading"
    >
      <div
        className="sld-project-detail__floor-plans-pattern"
        aria-hidden="true"
      />

      <div className="sld-project-detail__container">
        {/* Section Heading */}
        <header className="floor-plans-header sld-project-detail__section-header sld-project-detail__section-header--dark sld-project-detail__floor-plans-header">
          <h2
            id="sld-project-floor-plans-heading"
            className="sld-project-detail__section-heading sld-project-detail__section-heading--light"
          >
            Floor Plans
          </h2>

          <div
            className="sld-project-detail__section-rule"
            aria-hidden="true"
          >
            <span className="sld-project-detail__section-rule-line" />
            <span className="sld-project-detail__section-rule-diamond" />
            <span className="sld-project-detail__section-rule-line" />
          </div>
        </header>

        {/* Category Tabs: Ground Floor & Typical Floor */}
        <div
          className="floor-plans-tabs sld-project-detail__floor-plans-tabs"
          role="tablist"
          aria-label="Floor Plan Categories"
        >
          {categories.map((category, idx) => {
            const isSelected = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                id={`floor-plan-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`floor-plan-panel-${category.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`sld-project-detail__floor-plans-tab ${
                  isSelected
                    ? 'sld-project-detail__floor-plans-tab--active'
                    : ''
                }`}
                onClick={() => handleSelectCategory(category.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Floor Plans Slider */}
        <div
          id={`floor-plan-panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`floor-plan-tab-${activeCategory.id}`}
          className="floor-plans-slider-wrapper sld-project-detail__floor-plans-slider-wrapper"
        >
          <button
            type="button"
            className="sld-project-detail__floor-plans-arrow sld-project-detail__floor-plans-arrow--prev"
            onClick={handlePrevSlide}
            disabled={isPrevDisabled}
            aria-label="Previous floor plan"
          >
            <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <div
            ref={viewportRef}
            className="floor-plans-slider-viewport sld-project-detail__floor-plans-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <ul
              ref={trackRef}
              className={`floor-plans-slider-track sld-project-detail__floor-plans-track ${
                prefersReducedMotion
                  ? 'sld-project-detail__floor-plans-track--no-motion'
                  : ''
              }`}
              style={{
                transform: `translate3d(${-translateX}px, 0, 0)`,
              }}
            >
              {slides.map((item, idx) => (
                <li
                  key={item.id || `${item.title}-${idx}`}
                  className="floor-plan-slide sld-project-detail__floor-plan-slide"
                >
                  <button
                    type="button"
                    className="sld-project-detail__floor-plan-card"
                    onClick={(event) => onSelectFloorPlan(slides, idx, event)}
                    aria-label={`View full size ${item.alt || item.title}`}
                  >
                    <div className="sld-project-detail__floor-plan-img-box">
                      <img
                        src={item.image}
                        alt={item.alt || item.title}
                        className="floor-plan-img sld-project-detail__floor-plan-img"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        onLoad={measureSlider}
                      />
                      <span
                        className="sld-project-detail__floor-plan-zoom"
                        aria-hidden="true"
                      >
                        <Maximize2 size={15} strokeWidth={1.75} />
                      </span>
                    </div>
                    {item.title && (
                      <span className="sld-project-detail__floor-plan-caption">
                        {item.title}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="sld-project-detail__floor-plans-arrow sld-project-detail__floor-plans-arrow--next"
            onClick={handleNextSlide}
            disabled={isNextDisabled}
            aria-label="Next floor plan"
          >
            <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * Scroll-Driven Horizontal Gallery Section (Prompt 43)
 * Positioned immediately after the Floor Plans section and before the Dark Video Block.
 */
function ScrollHorizontalGallery({
  project,
  images,
  prefersReducedMotion,
  onSelectImage,
}) {
  const scrollSectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const galleryItems = images.slice(0, 6);
  const totalCount = galleryItems.length;

  const measureTrack = useCallback(() => {
    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl) return;

    const viewportWidth = viewportEl.clientWidth;
    const trackWidth = trackEl.scrollWidth;
    const overflow = Math.max(0, Math.ceil(trackWidth - viewportWidth));
    setMaxTranslate(overflow);
  }, []);

  useEffect(() => {
    measureTrack();

    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureTrack();
      });
      if (viewportEl) resizeObserver.observe(viewportEl);
      if (trackEl) resizeObserver.observe(trackEl);
    }

    window.addEventListener('resize', measureTrack, { passive: true });
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', measureTrack);
    };
  }, [measureTrack, galleryItems]);

  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  });

  const isScrollDriven = !prefersReducedMotion && maxTranslate > 0 && totalCount > 1;

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isScrollDriven ? -maxTranslate : 0]
  );

  const progressScaleX = useTransform(scrollYProgress, [0, 1], [1 / totalCount, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isScrollDriven) return;
    const clamped = Math.max(0, Math.min(1, latest));
    const step = Math.min(
      totalCount,
      Math.max(1, Math.round(clamped * (totalCount - 1)) + 1)
    );
    setCurrentStep((prev) => (prev !== step ? step : prev));
  });

  // Handle native horizontal scroll progress when reduced motion is active
  const handleNativeScroll = useCallback(
    (event) => {
      if (isScrollDriven || totalCount <= 1) return;
      const el = event.currentTarget;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (maxScrollLeft <= 0) return;
      const ratio = Math.max(0, Math.min(1, el.scrollLeft / maxScrollLeft));
      const step = Math.min(
        totalCount,
        Math.max(1, Math.round(ratio * (totalCount - 1)) + 1)
      );
      setCurrentStep(step);
    },
    [isScrollDriven, totalCount]
  );

  if (totalCount === 0) return null;

  // Dynamic scroll runway height proportional to actual horizontal travel distance
  const dynamicRunwayStyle = isScrollDriven
    ? { height: `calc(100vh + ${maxTranslate}px)` }
    : undefined;

  return (
    <section
      ref={scrollSectionRef}
      className={`sld-project-detail__hgallery ${
        isScrollDriven
          ? 'sld-project-detail__hgallery--scroll-driven'
          : 'sld-project-detail__hgallery--static'
      }`}
      style={dynamicRunwayStyle}
      aria-labelledby="sld-project-hgallery-heading"
    >
      <div className="sld-project-detail__hgallery-sticky">
        <div className="sld-project-detail__container">
          {/* Editorial Section Header */}
          <header className="sld-project-detail__section-header sld-project-detail__hgallery-header">
            <div className="sld-project-detail__section-eyebrow">
              <span
                className="sld-project-detail__section-eyebrow-line"
                aria-hidden="true"
              />
              <span>PROJECT GALLERY</span>
              <span
                className="sld-project-detail__section-eyebrow-line"
                aria-hidden="true"
              />
            </div>

            <h2
              id="sld-project-hgallery-heading"
              className="sld-project-detail__section-heading"
            >
              A Closer Look
            </h2>

            <div
              className="sld-project-detail__section-rule"
              aria-hidden="true"
            >
              <span className="sld-project-detail__section-rule-line" />
              <span className="sld-project-detail__section-rule-diamond" />
              <span className="sld-project-detail__section-rule-line" />
            </div>

            <p className="sld-project-detail__hgallery-subtitle">
              Explore the architecture, spaces, and details of our project.
            </p>
          </header>

          {/* Horizontal Gallery Viewport & Track */}
          <div
            ref={viewportRef}
            onScroll={handleNativeScroll}
            className={`sld-project-detail__hgallery-viewport ${
              !isScrollDriven
                ? 'sld-project-detail__hgallery-viewport--browsable'
                : ''
            }`}
          >
            <motion.ul
              ref={trackRef}
              className={`sld-project-detail__hgallery-track ${
                totalCount === 1
                  ? 'sld-project-detail__hgallery-track--single'
                  : ''
              }`}
              style={isScrollDriven ? { x: translateX } : undefined}
            >
              {galleryItems.map((imgSrc, idx) => {
                const customAlt =
                  project.galleryCaptions && project.galleryCaptions[idx]
                    ? `${project.name} — ${project.galleryCaptions[idx]}`
                    : `${project.name} — ${project.location} architectural view ${
                        idx + 1
                      }`;

                return (
                  <li
                    key={`${imgSrc}-${idx}`}
                    className="sld-project-detail__hgallery-item"
                  >
                    <button
                      type="button"
                      className="sld-project-detail__hgallery-card"
                      onClick={(event) => onSelectImage(idx, event)}
                      aria-label={`Open full-size photograph ${idx + 1} of ${totalCount}: ${customAlt}`}
                    >
                      <img
                        src={imgSrc}
                        alt={customAlt}
                        className="sld-project-detail__hgallery-img"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        onLoad={measureTrack}
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* Minimal Progress Indicator & Counter */}
          <div
            className="sld-project-detail__hgallery-footer"
            aria-label={`Gallery progress: photograph ${currentStep} of ${totalCount}`}
          >
            <div className="sld-project-detail__hgallery-counter">
              <span className="sld-project-detail__hgallery-counter-active">
                {String(currentStep).padStart(2, '0')}
              </span>
              <span
                className="sld-project-detail__hgallery-counter-sep"
                aria-hidden="true"
              >
                /
              </span>
              <span>{String(totalCount).padStart(2, '0')}</span>
            </div>

            <div
              className="sld-project-detail__hgallery-progress-track"
              aria-hidden="true"
            >
              {isScrollDriven ? (
                <motion.div
                  className="sld-project-detail__hgallery-progress-bar"
                  style={{ scaleX: progressScaleX }}
                />
              ) : (
                <div
                  className="sld-project-detail__hgallery-progress-bar"
                  style={{
                    transform: `scaleX(${currentStep / totalCount})`,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Dark Cinematic Video Block with Scroll-Triggered Video Reveal Effect (Prompt 46)
 * Positioned immediately after the Scroll-Driven Horizontal Gallery
 * and before Start A Conversation.
 */
function ProjectVideoBlock({ project, prefersReducedMotion }) {
  const videoSectionRef = useRef(null);

  const [isVideoActive, setIsVideoActive] = useState(false);
  const [showPlaceholderNotice, setShowPlaceholderNotice] = useState(false);

  const embedBaseUrl = getYouTubeEmbedUrl(project.youtubeVideoUrl);
  const coverImageSrc = project.videoCoverImage || project.image;

  useEffect(() => {
    setIsVideoActive(false);
    setShowPlaceholderNotice(false);
  }, [project.id]);

  const handlePlayClick = useCallback(() => {
    if (embedBaseUrl) {
      setIsVideoActive(true);
    } else {
      setShowPlaceholderNotice(true);
    }
  }, [embedBaseUrl]);

  // Track the video section's scroll progress through the viewport
  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ['start 85%', 'center 45%'],
  });

  // Smooth center-outward clipping mask reveal mapped directly to scroll progress
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(35% 35% 35% 35%)', 'inset(0% 0% 0% 0%)']
  );

  const activeIframeSrc = embedBaseUrl
    ? `${embedBaseUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : '';

  return (
    <section
      ref={videoSectionRef}
      className="sld-project-detail__video-block"
      aria-labelledby="sld-project-video-heading"
    >
      <div
        className="sld-project-detail__video-pattern"
        aria-hidden="true"
      />

      <div className="sld-project-detail__container">
        <header className="sld-project-detail__section-header sld-project-detail__section-header--dark sld-project-detail__video-header">
          <div className="sld-project-detail__section-eyebrow">
            <span
              className="sld-project-detail__section-eyebrow-line"
              aria-hidden="true"
            />
            <span>EXPERIENCE THE PROJECT</span>
            <span
              className="sld-project-detail__section-eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2
            id="sld-project-video-heading"
            className="sld-project-detail__section-heading sld-project-detail__section-heading--light"
          >
            See The Vision Come To Life
          </h2>

          <div
            className="sld-project-detail__section-rule"
            aria-hidden="true"
          >
            <span className="sld-project-detail__section-rule-line" />
            <span className="sld-project-detail__section-rule-diamond" />
            <span className="sld-project-detail__section-rule-line" />
          </div>

          <p className="sld-project-detail__video-subtitle">
            Discover the architecture, spaces, and vision behind our project.
          </p>
        </header>

        {/* Large Centered 16:9 Landscape Video Container with Scroll-Triggered Reveal */}
        <motion.div
          className="project-video-container sld-project-detail__video-frame"
          style={prefersReducedMotion ? undefined : { clipPath }}
        >
          {/* Embedded YouTube Player inside the same 16:9 Scroll-Revealed Container */}
          {isVideoActive && embedBaseUrl && (
            <iframe
              className="sld-project-detail__video-iframe"
              src={activeIframeSrc}
              title={`${project.name} — Sree Laxmi Developers Project Video`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {/* Cover Image & Play Trigger Layer */}
          <AnimatePresence initial={false}>
            {!isVideoActive && (
              <motion.div
                key="video-cover-layer"
                className="video-cover sld-project-detail__video-cover"
                initial={false}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: prefersReducedMotion ? 0 : 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
              >
                <img
                  src={coverImageSrc}
                  alt={`${project.name} — ${project.location} architectural video preview`}
                  className="sld-project-detail__video-cover-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                <div
                  className="sld-project-detail__video-overlay"
                  aria-hidden="true"
                />

                <div className="sld-project-detail__video-center">
                  <button
                    type="button"
                    className="sld-project-detail__video-play-btn"
                    onClick={handlePlayClick}
                    aria-label={
                      embedBaseUrl
                        ? `Play project video for ${project.name}`
                        : `Project video preview for ${project.name}`
                    }
                  >
                    <span
                      className="sld-project-detail__video-play-ring"
                      aria-hidden="true"
                    />
                    <Play
                      className="sld-project-detail__video-play-icon"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>

                  {showPlaceholderNotice && !embedBaseUrl && (
                    <p
                      className="sld-project-detail__video-placeholder-note"
                      role="status"
                    >
                      Official walkthrough video for {project.name} will be
                      available shortly.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProjectByIdOrAlias(projectId);
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCustomItems, setLightboxCustomItems] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mapLoadError, setMapLoadError] = useState(false);

  const closeBtnRef = useRef(null);
  const triggerBtnRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const lightboxTouchStartXRef = useRef(null);

  const galleryImages =
    project && project.gallery && project.gallery.length > 0
      ? project.gallery
      : project
      ? [project.image]
      : [];

  useEffect(() => {
    setActiveIndex(0);
    setIsLightboxOpen(false);
    setLightboxCustomItems(null);
    setLightboxIndex(0);
    setMapLoadError(false);
  }, [projectId]);

  const totalGalleryImages = galleryImages.length;

  const activeLightboxItems =
    lightboxCustomItems && lightboxCustomItems.length > 0
      ? lightboxCustomItems
      : galleryImages.map((src, idx) => ({
          image: src,
          alt: `${project?.name || 'Project'} — ${
            project?.location || ''
          } (Full View ${idx + 1})`,
          title: '',
        }));

  const totalLightboxItems = activeLightboxItems.length;

  const openLightbox = useCallback(
    (event) => {
      if (event && event.currentTarget) {
        lastFocusedElementRef.current = event.currentTarget;
      } else {
        lastFocusedElementRef.current = triggerBtnRef.current;
      }
      setLightboxCustomItems(null);
      setLightboxIndex(activeIndex);
      setIsLightboxOpen(true);
    },
    [activeIndex]
  );

  const openLightboxAtIndex = useCallback((index, event) => {
    if (event && event.currentTarget) {
      lastFocusedElementRef.current = event.currentTarget;
    }
    setActiveIndex(index);
    setLightboxCustomItems(null);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const openFloorPlanLightbox = useCallback((items, index, event) => {
    if (event && event.currentTarget) {
      lastFocusedElementRef.current = event.currentTarget;
    }
    setLightboxCustomItems(items);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    window.requestAnimationFrame(() => {
      if (
        lastFocusedElementRef.current &&
        typeof lastFocusedElementRef.current.focus === 'function'
      ) {
        lastFocusedElementRef.current.focus();
      } else {
        triggerBtnRef.current?.focus();
      }
    });
  }, []);

  const showPrevImage = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      if (totalLightboxItems <= 1) return;
      setLightboxIndex(
        (prev) => (prev - 1 + totalLightboxItems) % totalLightboxItems
      );
    },
    [totalLightboxItems]
  );

  const showNextImage = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      if (totalLightboxItems <= 1) return;
      setLightboxIndex((prev) => (prev + 1) % totalLightboxItems);
    },
    [totalLightboxItems]
  );

  const handleLightboxTouchStart = useCallback((event) => {
    if (!event.touches || event.touches.length === 0) return;
    lightboxTouchStartXRef.current = event.touches[0].clientX;
  }, []);

  const handleLightboxTouchEnd = useCallback(
    (event) => {
      if (
        lightboxTouchStartXRef.current === null ||
        !event.changedTouches ||
        event.changedTouches.length === 0
      ) {
        return;
      }
      const deltaX =
        event.changedTouches[0].clientX - lightboxTouchStartXRef.current;
      lightboxTouchStartXRef.current = null;
      if (Math.abs(deltaX) > 42) {
        if (deltaX < 0) {
          showNextImage();
        } else {
          showPrevImage();
        }
      }
    },
    [showNextImage, showPrevImage]
  );

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, closeLightbox, showPrevImage, showNextImage]);

  if (!project) {
    return (
      <div className="sld-project-detail">
        <ProjectTitleBar
          title="Project Portfolio"
          breadcrumbs={[
            { label: 'Home', path: '/' },
            { label: 'Project Portfolio', path: '/projects' },
          ]}
        />
        <section className="sld-project-detail__not-found">
          <div className="sld-project-detail__container">
            <h2 className="sld-project-detail__not-found-title">
              Project Not Found
            </h2>
            <p className="sld-project-detail__not-found-text">
              Explore our complete portfolio of Ongoing, Upcoming, and Completed
              residential developments.
            </p>
            <Link to="/projects" className="sld-project-detail__btn-primary">
              <span>Back to Project Portfolio</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const statusTab = PORTFOLIO_TABS.find(
    (t) => t.id.toLowerCase() === project.status.toLowerCase()
  );

  const statusRoute = statusTab ? statusTab.route : '/projects';
  const statusLabel = statusTab ? statusTab.title : 'Ongoing Projects';

  const activeImageSrc = galleryImages[activeIndex] || project.image;

  const educationalFacilities =
    project.nearbyFacilities?.educational || [];
  const healthcareFacilities =
    project.nearbyFacilities?.healthcareAndEssentials || [];

  const locationQuery = (
    project.mapQuery ||
    (project.location ? `${project.name}, ${project.location}` : '')
  ).trim();

  const encodedLocationQuery = encodeURIComponent(locationQuery);
  const mapEmbedSrc = locationQuery
    ? `https://maps.google.com/maps?q=${encodedLocationQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    : '';
  const mapDirectionsUrl = locationQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodedLocationQuery}`
    : '';

  const scrollToNextSection = (event) => {
    event.preventDefault();
    const nextEl = document.getElementById('project-details-next');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToEnquiry = (event) => {
    event.preventDefault();
    const contactEl = document.getElementById('sld-project-enquiry');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div className="sld-project-detail">
      {/* =====================================================================
          1. Compact Project Title Bar
          ===================================================================== */}
      <ProjectTitleBar
        title={project.name}
        backgroundImage={project.image}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Project Portfolio', path: '/projects' },
          { label: statusLabel, path: statusRoute },
          { label: project.name, path: null },
        ]}
      />

      {/* =====================================================================
          2. Full-Width Project Image Section (Immediately Below Title Bar)
          ===================================================================== */}
      <section
        className="sld-project-detail__full-image-section"
        aria-label={`${project.name} Featured Elevation`}
      >
        <div className="sld-project-detail__container">
          <motion.div
            className="sld-project-detail__full-image-frame"
            {...revealProps}
          >
            <img
              src={project.image}
              alt={`${project.name} — ${project.location}`}
              className="sld-project-detail__full-image"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          3. Square Project Gallery (1:1) & Equal-Width Project Details Side Panel
          ===================================================================== */}
      <section
        className="sld-project-detail__main"
        aria-label={`${project.name} Introduction`}
      >
        <div className="sld-project-detail__container">
          <div className="sld-project-detail__hero-grid">
            {/* Left Panel: Square (1:1) Project Gallery + Thumbnails */}
            <motion.div
              className="sld-project-detail__media-col"
              {...revealProps}
            >
              <button
                ref={triggerBtnRef}
                type="button"
                className="sld-project-detail__main-image-btn"
                onClick={openLightbox}
                aria-label={`Open full-size image of ${project.name} (${
                  activeIndex + 1
                } of ${totalGalleryImages})`}
              >
                <img
                  src={activeImageSrc}
                  alt={`${project.name} — ${project.location} (View ${
                    activeIndex + 1
                  })`}
                  className="sld-project-detail__main-img"
                  referrerPolicy="no-referrer"
                />
                <span
                  className="sld-project-detail__expand-badge"
                  aria-hidden="true"
                >
                  <Maximize2 size={16} strokeWidth={1.75} />
                </span>
              </button>

              <div
                className="sld-project-detail__thumbs"
                role="group"
                aria-label={`${project.name} Thumbnail Gallery`}
              >
                {galleryImages.map((imgSrc, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={`${imgSrc}-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`sld-project-detail__thumb-btn ${
                        isSelected
                          ? 'sld-project-detail__thumb-btn--active'
                          : ''
                      }`}
                      aria-label={`Select view ${idx + 1} of ${project.name}`}
                      aria-pressed={isSelected}
                    >
                      <img
                        src={imgSrc}
                        alt={`${project.name} thumbnail ${idx + 1}`}
                        className="sld-project-detail__thumb-img"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Panel: Equal-Width Project Details Side Panel */}
            <motion.div
              className="sld-project-detail__info-col"
              {...revealProps}
            >
              <div className="sld-project-detail__info-top">
                {/* 1. Project Status Label */}
                <div className="sld-project-detail__eyebrow">
                  <span
                    className="sld-project-detail__eyebrow-line"
                    aria-hidden="true"
                  />
                  <span>{project.status} Project</span>
                </div>

                {/* 2. Project Name */}
                <h2 className="sld-project-detail__title">{project.name}</h2>

                {/* 3. Project Location with Pin Icon */}
                <div className="sld-project-detail__location">
                  <MapPin
                    className="sld-project-detail__pin-icon"
                    aria-hidden="true"
                  />
                  <span>{project.location}</span>
                </div>

                {/* 4. Thin Gold Divider */}
                <div
                  className="sld-project-detail__divider"
                  aria-hidden="true"
                />

                {/* 5. Introduction Heading & Project Description */}
                {project.overview && (
                  <div className="sld-project-detail__intro">
                    <h3 className="sld-project-detail__sub-heading">
                      Introduction
                    </h3>
                    <p className="sld-project-detail__overview">
                      {project.overview}
                    </p>
                  </div>
                )}
              </div>

              {/* 6. Side-by-Side Action Buttons: Read More & Enquire Now */}
              <div className="sld-project-detail__actions">
                <a
                  href="#project-details-next"
                  onClick={scrollToNextSection}
                  className="sld-project-detail__btn-read-more"
                  aria-label={`Read more about ${project.name}`}
                >
                  <span>Read More</span>
                  <ArrowRight
                    size={17}
                    strokeWidth={1.75}
                    className="sld-project-detail__btn-arrow"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="#sld-project-enquiry"
                  onClick={scrollToEnquiry}
                  className="sld-project-detail__btn-primary"
                  aria-label={`Enquire now about ${project.name}`}
                >
                  <PhoneCall size={17} strokeWidth={1.75} aria-hidden="true" />
                  <span>Enquire Now</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. Amenities – Large Icons in Three Rows (4 Columns x 3 Rows on Desktop)
          ===================================================================== */}
      {project.amenities && project.amenities.length > 0 && (
        <section
          id="project-details-next"
          className="sld-project-detail__amenities"
          aria-labelledby="sld-project-amenities-heading"
        >
          <div className="sld-project-detail__container">
            <motion.header
              className="sld-project-detail__section-header"
              {...revealProps}
            >
              <div className="sld-project-detail__section-eyebrow">
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
                <span>LIFESTYLE & COMFORT</span>
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
              </div>

              <h2
                id="sld-project-amenities-heading"
                className="sld-project-detail__section-heading"
              >
                Amenities
              </h2>

              <div
                className="sld-project-detail__section-rule"
                aria-hidden="true"
              >
                <span className="sld-project-detail__section-rule-line" />
                <span className="sld-project-detail__section-rule-diamond" />
                <span className="sld-project-detail__section-rule-line" />
              </div>
            </motion.header>

            <motion.ul
              className="sld-project-detail__amenities-grid"
              {...revealProps}
            >
              {project.amenities.slice(0, 12).map((amenity) => (
                <li
                  key={amenity.label}
                  className="sld-project-detail__amenity-item"
                >
                  <div
                    className="sld-project-detail__amenity-icon-wrap"
                    aria-hidden="true"
                  >
                    <AmenityOutlineIcon
                      type={amenity.icon}
                      className="sld-project-detail__amenity-icon"
                    />
                  </div>
                  <span className="sld-project-detail__amenity-label">
                    {amenity.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* =====================================================================
          5. Project Highlights – Dark Navy Design
          ===================================================================== */}
      {project.highlights && project.highlights.length > 0 && (
        <section
          className="sld-project-detail__highlights-dark"
          aria-labelledby="sld-project-highlights-heading"
        >
          <div
            className="sld-project-detail__highlights-pattern"
            aria-hidden="true"
          />

          <div className="sld-project-detail__container">
            <motion.header
              className="sld-project-detail__section-header sld-project-detail__section-header--dark"
              {...revealProps}
            >
              <div className="sld-project-detail__section-eyebrow">
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
                <span>KEY FEATURES</span>
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
              </div>

              <h2
                id="sld-project-highlights-heading"
                className="sld-project-detail__section-heading sld-project-detail__section-heading--light"
              >
                Project Highlights
              </h2>

              <div
                className="sld-project-detail__section-rule"
                aria-hidden="true"
              >
                <span className="sld-project-detail__section-rule-line" />
                <span className="sld-project-detail__section-rule-diamond" />
                <span className="sld-project-detail__section-rule-line" />
              </div>
            </motion.header>

            <motion.ul
              className="sld-project-detail__highlights-list"
              {...revealProps}
            >
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="sld-project-detail__highlight-row"
                >
                  <CheckCircle2
                    className="sld-project-detail__highlight-icon"
                    strokeWidth={1.65}
                    aria-hidden="true"
                  />
                  <span className="sld-project-detail__highlight-text">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* =====================================================================
          6. Nearby Facilities – Two Equal-Width Blocks
          ===================================================================== */}
      {(educationalFacilities.length > 0 ||
        healthcareFacilities.length > 0) && (
        <section
          className="sld-project-detail__nearby"
          aria-labelledby="sld-project-nearby-heading"
        >
          <div className="sld-project-detail__container">
            <motion.header
              className="sld-project-detail__section-header"
              {...revealProps}
            >
              <div className="sld-project-detail__section-eyebrow">
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
                <span>CONNECTIVITY & CONVENIENCE</span>
                <span
                  className="sld-project-detail__section-eyebrow-line"
                  aria-hidden="true"
                />
              </div>

              <h2
                id="sld-project-nearby-heading"
                className="sld-project-detail__section-heading"
              >
                Nearby Facilities
              </h2>

              <div
                className="sld-project-detail__section-rule"
                aria-hidden="true"
              >
                <span className="sld-project-detail__section-rule-line" />
                <span className="sld-project-detail__section-rule-diamond" />
                <span className="sld-project-detail__section-rule-line" />
              </div>
            </motion.header>

            <div className="sld-project-detail__nearby-grid">
              {/* Block 1: Educational Institutions */}
              <motion.div
                className="sld-project-detail__nearby-block"
                {...revealProps}
              >
                <div className="sld-project-detail__nearby-block-head">
                  <div className="sld-project-detail__nearby-title-row">
                    <GraduationCap
                      className="sld-project-detail__nearby-head-icon"
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                    <h3 className="sld-project-detail__nearby-block-title">
                      Educational Institutions
                    </h3>
                  </div>
                  <div
                    className="sld-project-detail__nearby-underline"
                    aria-hidden="true"
                  />
                </div>

                <ul className="sld-project-detail__nearby-list">
                  {educationalFacilities.map((facility) => (
                    <li
                      key={`${facility.name}-${facility.distance}`}
                      className="sld-project-detail__nearby-item"
                    >
                      <Navigation
                        className="sld-project-detail__nearby-pin"
                        strokeWidth={1.65}
                        aria-hidden="true"
                      />
                      <div className="sld-project-detail__nearby-item-body">
                        <span className="sld-project-detail__nearby-name">
                          {facility.name}
                        </span>
                        <div className="sld-project-detail__nearby-meta">
                          {facility.category && (
                            <span>{facility.category}</span>
                          )}
                          {facility.category && facility.distance && (
                            <span aria-hidden="true">·</span>
                          )}
                          {facility.distance && (
                            <span className="sld-project-detail__nearby-distance">
                              {facility.distance}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Block 2: Healthcare & Essential Facilities */}
              <motion.div
                className="sld-project-detail__nearby-block"
                {...revealProps}
              >
                <div className="sld-project-detail__nearby-block-head">
                  <div className="sld-project-detail__nearby-title-row">
                    <HeartPulse
                      className="sld-project-detail__nearby-head-icon"
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                    <h3 className="sld-project-detail__nearby-block-title">
                      Healthcare & Essential Facilities
                    </h3>
                  </div>
                  <div
                    className="sld-project-detail__nearby-underline"
                    aria-hidden="true"
                  />
                </div>

                <ul className="sld-project-detail__nearby-list">
                  {healthcareFacilities.map((facility) => (
                    <li
                      key={`${facility.name}-${facility.distance}`}
                      className="sld-project-detail__nearby-item"
                    >
                      <Navigation
                        className="sld-project-detail__nearby-pin"
                        strokeWidth={1.65}
                        aria-hidden="true"
                      />
                      <div className="sld-project-detail__nearby-item-body">
                        <span className="sld-project-detail__nearby-name">
                          {facility.name}
                        </span>
                        <div className="sld-project-detail__nearby-meta">
                          {facility.category && (
                            <span>{facility.category}</span>
                          )}
                          {facility.category && facility.distance && (
                            <span aria-hidden="true">·</span>
                          )}
                          {facility.distance && (
                            <span className="sld-project-detail__nearby-distance">
                              {facility.distance}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          7. Dark Floor Plans Section with Image Slider (Immediately Before Horizontal Gallery)
          ===================================================================== */}
      <ProjectFloorPlansSection
        project={project}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
        onSelectFloorPlan={openFloorPlanLightbox}
      />

      {/* =====================================================================
          8. Scroll-Driven Horizontal Gallery (Immediately After Floor Plans)
          ===================================================================== */}
      <ScrollHorizontalGallery
        project={project}
        images={galleryImages}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
        onSelectImage={openLightboxAtIndex}
      />

      {/* =====================================================================
          9. Dark Video Block With Scroll-Triggered Video Reveal Effect
          ===================================================================== */}
      <ProjectVideoBlock
        project={project}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
      />

      {/* =====================================================================
          10. Start A Conversation – Enquiry Section (Preselects Current Project)
          ===================================================================== */}
      <div id="sld-project-enquiry">
        <ContactSection defaultProject={project.name} />
      </div>

      {/* =====================================================================
          11. Project Location – Google Map
          ===================================================================== */}
      <section
        className="sld-project-detail__location-map"
        aria-labelledby="sld-project-location-heading"
      >
        <div className="sld-project-detail__container">
          <motion.header
            className="sld-project-detail__section-header"
            {...revealProps}
          >
            <div className="sld-project-detail__section-eyebrow">
              <span
                className="sld-project-detail__section-eyebrow-line"
                aria-hidden="true"
              />
              <span>FIND US</span>
              <span
                className="sld-project-detail__section-eyebrow-line"
                aria-hidden="true"
              />
            </div>

            <h2
              id="sld-project-location-heading"
              className="sld-project-detail__section-heading"
            >
              Project Location
            </h2>

            <div
              className="sld-project-detail__section-rule"
              aria-hidden="true"
            >
              <span className="sld-project-detail__section-rule-line" />
              <span className="sld-project-detail__section-rule-diamond" />
              <span className="sld-project-detail__section-rule-line" />
            </div>
          </motion.header>

          {locationQuery ? (
            <motion.div
              className="sld-project-detail__map-card"
              {...revealProps}
            >
              <div className="sld-project-detail__map-frame">
                {!mapLoadError ? (
                  <iframe
                    key={project.id}
                    title={`${project.name} Location Map — ${project.location}`}
                    src={mapEmbedSrc}
                    className="sld-project-detail__map-iframe"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    onError={() => setMapLoadError(true)}
                  />
                ) : (
                  <div className="sld-project-detail__map-fallback">
                    <MapPin
                      size={28}
                      strokeWidth={1.5}
                      className="sld-project-detail__map-fallback-icon"
                      aria-hidden="true"
                    />
                    <p className="sld-project-detail__map-fallback-text">
                      {project.name} — {project.location}
                    </p>
                  </div>
                )}
              </div>

              <div className="sld-project-detail__map-footer">
                <div className="sld-project-detail__map-address">
                  <MapPin
                    size={16}
                    strokeWidth={1.75}
                    className="sld-project-detail__pin-icon"
                    aria-hidden="true"
                  />
                  <span>
                    {project.name} — {project.location}
                  </span>
                </div>

                {mapDirectionsUrl && (
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sld-project-detail__directions-btn"
                    aria-label={`Get directions to ${project.name} in Google Maps`}
                  >
                    <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="sld-project-detail__map-unavailable">
              <p>Location details for this project will be updated shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          Full-Image Lightbox Modal for Project Gallery & Floor Plans
          ===================================================================== */}
      {isLightboxOpen && activeLightboxItems[lightboxIndex] && (
        <div
          className="sld-project-detail__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            activeLightboxItems[lightboxIndex].alt ||
            activeLightboxItems[lightboxIndex].title ||
            `${project.name} image ${
              lightboxIndex + 1
            } of ${totalLightboxItems}`
          }
          onClick={closeLightbox}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        >
          <div
            className="sld-project-detail__lightbox-topbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sld-project-detail__lightbox-counter">
              <span className="sld-project-detail__lightbox-current">
                {String(lightboxIndex + 1).padStart(2, '0')}
              </span>
              <span className="sld-project-detail__lightbox-sep">/</span>
              <span>{String(totalLightboxItems).padStart(2, '0')}</span>
              {activeLightboxItems[lightboxIndex].title && (
                <span className="sld-project-detail__lightbox-title">
                  — {activeLightboxItems[lightboxIndex].title}
                </span>
              )}
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              className="sld-project-detail__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image lightbox"
            >
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {totalLightboxItems > 1 && (
            <button
              type="button"
              className="sld-project-detail__lightbox-nav sld-project-detail__lightbox-nav--prev"
              onClick={showPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}

          <div
            className="sld-project-detail__lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxItems[lightboxIndex].image}
              alt={
                activeLightboxItems[lightboxIndex].alt ||
                activeLightboxItems[lightboxIndex].title ||
                `${project.name} — ${project.location}`
              }
              className="sld-project-detail__lightbox-img"
              referrerPolicy="no-referrer"
            />
          </div>

          {totalLightboxItems > 1 && (
            <button
              type="button"
              className="sld-project-detail__lightbox-nav sld-project-detail__lightbox-nav--next"
              onClick={showNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
