import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './GallerySection.css';

/**
 * REPLACEABLE SAMPLE GALLERY IMAGES
 * ---------------------------------------------------------------------------
 * Each entry supports images of any original dimensions or aspect ratio.
 * Thumbnails render in a uniform 1:1 square grid using `object-fit: cover`,
 * while the popup lightbox displays the full uncropped image with `object-fit: contain`.
 */
export const GALLERY_IMAGES = [
  {
    id: 'gallery-item-1',
    src: '/assets/project-royale.jpg',
    alt: 'Contemporary residential elevation and landscaped arrival court — Sample Architectural Showcase',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-2',
    src: '/assets/gallery-portrait-facade.jpg',
    alt: 'Vertical architectural facade detail with glass balconies — Sample Architectural Detail',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-3',
    src: '/assets/our-story-residence.jpg',
    alt: 'Modern villa terrace, indoor-outdoor living room, and tranquil pool — Sample Interior & Amenity View',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-4',
    src: '/assets/project-meadows.jpg',
    alt: 'Tree-lined residential enclave and manicured green avenues — Sample Landscaping View',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-5',
    src: '/assets/hero-slide-2.jpg',
    alt: 'Open-plan luxury residence with floor-to-ceiling glazing and courtyard — Sample Amenities Showcase',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-6',
    src: '/assets/project-gardenia.jpg',
    alt: 'Completed multi-storey residential community with dusk illumination — Sample Exterior View',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-7',
    src: '/assets/gallery-balcony-detail.jpg',
    alt: 'Precision brickwork, recessed warm lighting, and cantilevered balconies — Sample Structural Detail',
    isSampleImage: true,
  },
  {
    id: 'gallery-item-8',
    src: '/assets/hero-slide-1.jpg',
    alt: 'Twilight perspective of modern residential apartment tower — Sample Architectural Perspective',
    isSampleImage: true,
  },
];

export default function GallerySection({
  eyebrow = 'A GLIMPSE OF OUR WORLD',
  headingPrefix = 'Our ',
  headingHighlight = 'Gallery',
  images = GALLERY_IMAGES,
} = {}) {
  const sectionRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const touchStartXRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isLightboxOpen = selectedIndex !== null && Boolean(images[selectedIndex]);
  const totalImages = images.length;

  // Reveal section smoothly when entering viewport
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
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
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

  // Lock background page scroll and bind keyboard navigation while popup is open
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

  // Touch swipe inside lightbox popup
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

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <section
      ref={sectionRef}
      className={`sld-gallery ${isVisible ? 'sld-gallery--visible' : ''}`}
      aria-labelledby="sld-gallery-heading"
    >
      {/* Subtle Architectural Background Accent */}
      <div className="sld-gallery__bg-decor" aria-hidden="true" />

      <div className="sld-gallery__container">
        {/* Centered Luxury Section Heading */}
        <header className="sld-gallery__header">
          <div className="sld-gallery__eyebrow">
            <span className="sld-gallery__eyebrow-line" aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="sld-gallery__eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="sld-gallery-heading" className="sld-gallery__heading">
            <span>{headingPrefix}</span>
            <span className="sld-gallery__heading-accent">
              {headingHighlight}
            </span>
          </h2>

          <div className="sld-gallery__heading-rule" aria-hidden="true">
            <span className="sld-gallery__heading-line" />
            <span className="sld-gallery__heading-diamond" />
            <span className="sld-gallery__heading-line" />
          </div>
        </header>

        {/* Uniform Square Image Grid (4 Cols Desktop, 2 Cols Tablet, 1 Col Mobile) */}
        <div className="sld-gallery__grid" role="list">
          {images.map((item, index) => (
            <div
              key={item.id}
              role="listitem"
              className={`sld-gallery__tile sld-gallery__tile--delay-${
                (index % 4) + 1
              }`}
            >
              <button
                type="button"
                className="sld-gallery__trigger"
                onClick={(e) => openLightbox(index, e)}
                aria-label={`View full image ${index + 1} of ${totalImages}`}
              >
                <div className="sld-gallery__media">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="sld-gallery__img"
                  />
                </div>

                {/* Subtle Expand Icon Indicator on Hover (No Text Overlays) */}
                <span className="sld-gallery__expand-badge" aria-hidden="true">
                  <Maximize2
                    className="sld-gallery__expand-icon"
                    strokeWidth={1.65}
                  />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Image Lightbox Popup */}
      {isLightboxOpen && activeImage && (
        <div
          className="sld-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${selectedIndex + 1} of ${totalImages}`}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="sld-gallery__lightbox-topbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sld-gallery__lightbox-counter" aria-live="polite">
              <span className="sld-gallery__lightbox-current">
                {String(selectedIndex + 1).padStart(2, '0')}
              </span>
              <span className="sld-gallery__lightbox-sep">/</span>
              <span>{String(totalImages).padStart(2, '0')}</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="sld-gallery__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image popup"
            >
              <X
                className="sld-gallery__lightbox-close-icon"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Previous Image Button */}
          {totalImages > 1 && (
            <button
              type="button"
              className="sld-gallery__lightbox-nav sld-gallery__lightbox-nav--prev"
              onClick={showPrevImage}
              aria-label="Previous gallery image"
            >
              <ChevronLeft
                className="sld-gallery__lightbox-nav-icon"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          )}

          {/* Full Uncropped Image Stage (object-fit: contain) */}
          <div
            className="sld-gallery__lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sld-gallery__lightbox-img-wrap">
              <img
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.alt}
                className="sld-gallery__lightbox-img"
              />
            </div>
          </div>

          {/* Next Image Button */}
          {totalImages > 1 && (
            <button
              type="button"
              className="sld-gallery__lightbox-nav sld-gallery__lightbox-nav--next"
              onClick={showNextImage}
              aria-label="Next gallery image"
            >
              <ChevronRight
                className="sld-gallery__lightbox-nav-icon"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
