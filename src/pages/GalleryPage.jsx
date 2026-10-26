import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import { GALLERY_IMAGES } from '../components/GallerySection.jsx';
import './GalleryPage.css';

/**
 * Reusable Gallery Image Collection for the dedicated Gallery Page.
 * Combines the homepage GALLERY_IMAGES with actual Sree Laxmi Developers
 * architectural, exterior, amenity, and residential photography.
 * All thumbnails render in a strict 1:1 square grid with `object-fit: cover`
 * and zero text overlays, while the lightbox displays full uncropped images
 * using `object-fit: contain`.
 */
export const GALLERY_PAGE_IMAGES = [
  ...GALLERY_IMAGES,
  {
    id: 'gallery-page-item-9',
    src: '/assets/projects/gardenia-aerial.webp',
    alt: 'Aerial view of residential community layout and landscaped blocks',
  },
  {
    id: 'gallery-page-item-10',
    src: '/assets/projects/gardenia-clubhouse.webp',
    alt: 'Residential community clubhouse exterior and recreational avenues',
  },
  {
    id: 'gallery-page-item-11',
    src: '/assets/projects/gardenia-block-a.webp',
    alt: 'Multi-storey residential elevation with contemporary facade detailing',
  },
  {
    id: 'gallery-page-item-12',
    src: '/assets/projects/gardenia-night.webp',
    alt: 'Illuminated residential apartment facade at twilight',
  },
  {
    id: 'gallery-page-item-13',
    src: '/assets/projects/sln-dwaja.png',
    alt: 'Contemporary apartment building exterior and entrance driveway',
  },
  {
    id: 'gallery-page-item-14',
    src: '/assets/projects/sarovar-villas.webp',
    alt: 'Gated residential villa enclave with landscaped streetscape',
  },
  {
    id: 'gallery-page-item-15',
    src: '/assets/projects/completed-sreelaxmi-elite.webp',
    alt: 'Completed residential apartment building elevation and balconies',
  },
  {
    id: 'gallery-page-item-16',
    src: '/assets/projects/completed-sree-laxmi-avenue.webp',
    alt: 'Modern residential apartment facade and architectural finishes',
  },
];

export default function GalleryPage({
  eyebrow = 'A GLIMPSE OF OUR WORLD',
  headingPrefix = 'Our ',
  headingHighlight = 'Gallery',
  images = GALLERY_PAGE_IMAGES,
} = {}) {
  const sectionRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const touchStartXRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const totalImages = images.length;
  const isLightboxOpen =
    selectedIndex !== null && Boolean(images[selectedIndex]);
  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  // Reveal gallery grid smoothly when entering viewport
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
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((index, event) => {
    if (event && event.currentTarget) {
      lastFocusedElementRef.current = event.currentTarget;
    }
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    if (
      lastFocusedElementRef.current &&
      typeof lastFocusedElementRef.current.focus === 'function'
    ) {
      window.requestAnimationFrame(() => {
        lastFocusedElementRef.current?.focus();
      });
    }
  }, []);

  const showPrevImage = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      if (totalImages <= 1) return;
      setSelectedIndex((prev) =>
        prev === null ? 0 : (prev - 1 + totalImages) % totalImages
      );
    },
    [totalImages]
  );

  const showNextImage = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      if (totalImages <= 1) return;
      setSelectedIndex((prev) =>
        prev === null ? 0 : (prev + 1) % totalImages
      );
    },
    [totalImages]
  );

  // Prevent background scrolling & bind Escape / ArrowLeft / ArrowRight keys when popup is open
  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
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
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, closeLightbox, showPrevImage, showNextImage]);

  // Touch swipe navigation on mobile/tablet lightbox
  const handleTouchStart = (event) => {
    if (event.touches && event.touches.length > 0) {
      touchStartXRef.current = event.touches[0].clientX;
    }
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartXRef.current === null ||
      !event.changedTouches ||
      event.changedTouches.length === 0
    ) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;
    const swipeThreshold = 44;

    if (deltaX > swipeThreshold) {
      showPrevImage();
    } else if (deltaX < -swipeThreshold) {
      showNextImage();
    }

    touchStartXRef.current = null;
  };

  return (
    <div className="sld-gallery-page">
      {/* 1. Compact Dark Navy Title Bar (Home / Gallery) */}
      <ProjectTitleBar
        title="Gallery"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Gallery', path: null },
        ]}
        backgroundImage="/assets/hero-slide-2.jpg"
      />

      {/* 2. Main Gallery Content Section */}
      <section
        ref={sectionRef}
        className={`sld-gallery-page__section ${
          isVisible ? 'sld-gallery-page__section--visible' : ''
        }`}
        aria-labelledby="sld-gallery-page-heading"
      >
        {/* Subtle Architectural Linework on Soft Ivory Surface */}
        <div className="sld-gallery-page__bg-decor" aria-hidden="true" />

        <div className="sld-gallery-page__container">
          {/* Centered Luxury Section Heading */}
          <header className="sld-gallery-page__header">
            <div className="sld-gallery-page__eyebrow">
              <span
                className="sld-gallery-page__eyebrow-line"
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
              <span
                className="sld-gallery-page__eyebrow-line"
                aria-hidden="true"
              />
            </div>

            <h2
              id="sld-gallery-page-heading"
              className="sld-gallery-page__heading"
            >
              <span>{headingPrefix}</span>
              <span className="sld-gallery-page__heading-accent">
                {headingHighlight}
              </span>
            </h2>

            <div className="sld-gallery-page__heading-rule" aria-hidden="true">
              <span className="sld-gallery-page__heading-line" />
              <span className="sld-gallery-page__heading-diamond" />
              <span className="sld-gallery-page__heading-line" />
            </div>
          </header>

          {/* 3. Responsive Square 1:1 Image Grid (4 Desktop, 2–3 Tablet, 1 Mobile) */}
          <div className="sld-gallery-page__grid" role="list">
            {images.map((item, index) => (
              <div
                key={item.id}
                role="listitem"
                className={`sld-gallery-page__tile sld-gallery-page__tile--delay-${
                  (index % 4) + 1
                }`}
              >
                <button
                  type="button"
                  className="sld-gallery-page__trigger"
                  onClick={(e) => openLightbox(index, e)}
                  aria-label={`Open gallery image ${index + 1} of ${totalImages}`}
                >
                  <div className="sld-gallery-page__media">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={index < 8 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="sld-gallery-page__img"
                    />
                  </div>

                  {/* Subtle Expand Icon on Hover — Zero Text Overlays */}
                  <span
                    className="sld-gallery-page__expand-badge"
                    aria-hidden="true"
                  >
                    <Maximize2
                      className="sld-gallery-page__expand-icon"
                      strokeWidth={1.65}
                    />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Full-Image Lightbox Popup (object-fit: contain, uncropped) */}
        {isLightboxOpen && activeImage && (
          <div
            className="sld-gallery-page__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image ${selectedIndex + 1} of ${totalImages}`}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Counter & Close Button */}
            <div
              className="sld-gallery-page__lightbox-topbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="sld-gallery-page__lightbox-counter"
                aria-live="polite"
              >
                <span className="sld-gallery-page__lightbox-current">
                  {String(selectedIndex + 1).padStart(2, '0')}
                </span>
                <span className="sld-gallery-page__lightbox-sep">/</span>
                <span>{String(totalImages).padStart(2, '0')}</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="sld-gallery-page__lightbox-close"
                onClick={closeLightbox}
                aria-label="Close image popup"
              >
                <X
                  className="sld-gallery-page__lightbox-close-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Previous Image Navigation */}
            {totalImages > 1 && (
              <button
                type="button"
                className="sld-gallery-page__lightbox-nav sld-gallery-page__lightbox-nav--prev"
                onClick={showPrevImage}
                aria-label="Previous gallery image"
              >
                <ChevronLeft
                  className="sld-gallery-page__lightbox-nav-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            )}

            {/* Full Uncropped Image Stage (Clicking image does not close popup) */}
            <div
              className="sld-gallery-page__lightbox-stage"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sld-gallery-page__lightbox-img-wrap">
                <img
                  key={activeImage.id}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="sld-gallery-page__lightbox-img"
                />
              </div>
            </div>

            {/* Next Image Navigation */}
            {totalImages > 1 && (
              <button
                type="button"
                className="sld-gallery-page__lightbox-nav sld-gallery-page__lightbox-nav--next"
                onClick={showNextImage}
                aria-label="Next gallery image"
              >
                <ChevronRight
                  className="sld-gallery-page__lightbox-nav-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
