import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import './ProjectSectionNav.css';

/**
 * Centralized Project Detail Section Registry.
 * Defines the standard navigable sections in their canonical display order,
 * while allowing per-project enable/disable rules and automatic inclusion of
 * any newly added DOM sections (`[data-project-nav-section="true"]`) or
 * `project.customSections` / `extraSections`.
 */
export const PROJECT_DETAIL_SECTION_REGISTRY = [
  {
    id: 'project-overview',
    label: 'Overview',
    order: 10,
    isEnabled: (project) => Boolean(project),
  },
  {
    id: 'project-amenities',
    label: 'Amenities',
    order: 20,
    isEnabled: (project) =>
      Boolean(project?.amenities && project.amenities.length > 0),
  },
  {
    id: 'project-highlights',
    label: 'Highlights',
    order: 30,
    isEnabled: (project) =>
      Boolean(project?.highlights && project.highlights.length > 0),
  },
  {
    id: 'project-specifications',
    label: 'Specifications',
    order: 40,
    isEnabled: (project) => Boolean(project),
  },
  {
    id: 'project-nearby-facilities',
    label: 'Nearby Facilities',
    order: 50,
    isEnabled: (project) =>
      Boolean(
        project?.nearbyFacilities?.educational?.length > 0 ||
          project?.nearbyFacilities?.healthcareAndEssentials?.length > 0
      ),
  },
  {
    id: 'project-floor-plans',
    label: 'Floor Plans',
    order: 60,
    isEnabled: (project) => Boolean(project),
  },
  {
    id: 'project-gallery',
    label: 'Gallery',
    order: 70,
    isEnabled: (project) =>
      Boolean((project?.gallery && project.gallery.length > 0) || project?.image),
  },
  {
    id: 'project-video',
    label: 'Video',
    order: 80,
    isEnabled: (project) => Boolean(project),
  },
  {
    id: 'project-location',
    label: 'Location',
    order: 90,
    isEnabled: (project) => Boolean(project),
  },
  {
    id: 'sld-project-enquiry',
    label: 'Enquire',
    order: 100,
    isEnabled: (project) => Boolean(project),
  },
];

/**
 * Reusable wrapper for registering any new independent section on a Project Detail page
 * so it is automatically picked up by ProjectSectionNav without modifying the nav component.
 */
export function ProjectNavSection({
  id,
  label,
  order,
  enabled = true,
  as: Component = 'section',
  className = '',
  children,
  ...rest
}) {
  if (!enabled) return null;
  return (
    <Component
      id={id}
      data-project-nav-section="true"
      data-project-nav-label={label}
      data-project-nav-order={order !== undefined ? String(order) : undefined}
      data-project-nav-enabled="true"
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Sticky Section Navigation Menu for all Sree Laxmi Developers Project Detail pages.
 * Dynamically supports Overview, Amenities, Highlights, Specifications, Nearby Facilities,
 * Floor Plans, Gallery, Video, Location, Enquire, and any additional independent sections
 * registered via config, `project.customSections`, or `[data-project-nav-section="true"]`.
 */
export default function ProjectSectionNav({
  project,
  containerRef,
  extraSections = [],
  sectionRegistry = PROJECT_DETAIL_SECTION_REGISTRY,
}) {
  const navBarRef = useRef(null);
  const scrollListRef = useRef(null);
  const itemRefs = useRef({});
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef(null);

  const [discoveredDomSections, setDiscoveredDomSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(
    sectionRegistry[0]?.id || 'project-overview'
  );
  const [isStuck, setIsStuck] = useState(false);

  // Check if a section is explicitly disabled for this project
  const isSectionEnabledForProject = useCallback(
    (sectionId, defaultEnabled = true) => {
      if (!project) return false;
      if (
        Array.isArray(project.disabledSections) &&
        project.disabledSections.includes(sectionId)
      ) {
        return false;
      }
      if (
        Array.isArray(project.enabledSections) &&
        project.enabledSections.includes(sectionId)
      ) {
        return true;
      }
      return defaultEnabled;
    },
    [project]
  );

  // Scan the DOM for any registered independent sections (`[data-project-nav-section="true"]`)
  const scanDomSections = useCallback(() => {
    if (typeof document === 'undefined') return;
    const rootEl = containerRef?.current || document;
    const nodes = rootEl.querySelectorAll('[data-project-nav-section="true"]');
    const found = [];

    nodes.forEach((node, index) => {
      const id = node.getAttribute('id')?.trim();
      const label = node.getAttribute('data-project-nav-label')?.trim();
      const enabledAttr = node.getAttribute('data-project-nav-enabled');
      const orderAttr = node.getAttribute('data-project-nav-order');

      if (!id || !label || enabledAttr === 'false') return;

      const parsedOrder =
        orderAttr !== null && orderAttr !== '' && !Number.isNaN(Number(orderAttr))
          ? Number(orderAttr)
          : 1000 + index * 10;

      found.push({
        id,
        label,
        order: parsedOrder,
      });
    });

    setDiscoveredDomSections((prev) => {
      if (
        prev.length === found.length &&
        prev.every(
          (item, idx) =>
            item.id === found[idx].id &&
            item.label === found[idx].label &&
            item.order === found[idx].order
        )
      ) {
        return prev;
      }
      return found;
    });
  }, [containerRef]);

  useEffect(() => {
    scanDomSections();

    if (typeof MutationObserver === 'undefined') return undefined;
    const rootEl = containerRef?.current || document.body;
    if (!rootEl) return undefined;

    const observer = new MutationObserver(() => {
      scanDomSections();
    });

    observer.observe(rootEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'id',
        'data-project-nav-section',
        'data-project-nav-label',
        'data-project-nav-enabled',
        'data-project-nav-order',
      ],
    });

    return () => observer.disconnect();
  }, [scanDomSections, project?.id, containerRef]);

  // Merge centralized registry, project customSections, extraSections prop, and DOM-discovered sections
  const navItems = useMemo(() => {
    const map = new Map();

    // 1. Standard registry sections
    sectionRegistry.forEach((entry, idx) => {
      if (!entry || !entry.id || !entry.label) return;
      const defaultEnabled =
        typeof entry.isEnabled === 'function'
          ? entry.isEnabled(project)
          : entry.enabled !== false;
      const enabled = isSectionEnabledForProject(entry.id, defaultEnabled);
      if (!enabled) return;

      map.set(entry.id, {
        id: entry.id,
        label: entry.label,
        order: typeof entry.order === 'number' ? entry.order : (idx + 1) * 10,
      });
    });

    // 2. Project-specific customSections & extraSections prop
    const projectCustom = Array.isArray(project?.customSections)
      ? project.customSections
      : [];
    const combinedCustom = [...projectCustom, ...(extraSections || [])];

    combinedCustom.forEach((custom, idx) => {
      if (!custom || !custom.id || !custom.label) return;
      const defaultEnabled = custom.enabled !== false;
      const enabled = isSectionEnabledForProject(custom.id, defaultEnabled);
      if (!enabled) return;

      const existing = map.get(custom.id);
      map.set(custom.id, {
        id: custom.id,
        label: custom.label,
        order:
          typeof custom.order === 'number'
            ? custom.order
            : existing?.order ?? 500 + idx * 10,
      });
    });

    // 3. Automatically discovered DOM sections (`[data-project-nav-section="true"]`)
    discoveredDomSections.forEach((domSec) => {
      if (!isSectionEnabledForProject(domSec.id, true)) return;
      if (!map.has(domSec.id)) {
        map.set(domSec.id, {
          id: domSec.id,
          label: domSec.label,
          order: domSec.order,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.order - b.order);
  }, [
    sectionRegistry,
    project,
    extraSections,
    discoveredDomSections,
    isSectionEnabledForProject,
  ]);

  // Calculate total sticky offset (Global Header + Sticky Section Nav)
  const getStickyOffset = useCallback(() => {
    const headerEl = document.querySelector('.sld-header');
    const headerHeight = headerEl
      ? headerEl.getBoundingClientRect().height
      : 84;
    const navHeight = navBarRef.current
      ? navBarRef.current.getBoundingClientRect().height
      : 54;
    return Math.ceil(headerHeight + navHeight);
  }, []);

  // Scroll-spy: determine which registered section is currently active in the viewport
  const updateActiveSectionOnScroll = useCallback(() => {
    if (typeof window === 'undefined' || navItems.length === 0) return;

    const headerEl = document.querySelector('.sld-header');
    const headerHeight = headerEl
      ? headerEl.getBoundingClientRect().height
      : 84;

    if (navBarRef.current) {
      const navRect = navBarRef.current.getBoundingClientRect();
      setIsStuck(navRect.top <= headerHeight + 2);
    }

    if (isProgrammaticScrollRef.current) return;

    const triggerLine = getStickyOffset() + 28;

    let bestCandidateId = navItems[0].id;
    let bestPassedTop = -Infinity;
    let earliestUpcomingId = null;
    let earliestUpcomingTop = Infinity;

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();

      // Section top has reached or passed the trigger line and section is still in view
      if (rect.top <= triggerLine && rect.bottom > triggerLine - 60) {
        if (rect.top > bestPassedTop) {
          bestPassedTop = rect.top;
          bestCandidateId = item.id;
        }
      } else if (rect.top <= triggerLine && bestPassedTop === -Infinity) {
        bestCandidateId = item.id;
      }

      if (rect.top > triggerLine && rect.top < earliestUpcomingTop) {
        earliestUpcomingTop = rect.top;
        earliestUpcomingId = item.id;
      }
    }

    // If user scrolled to the very bottom of the page, highlight the last visible section in DOM
    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 40;
    if (scrolledToBottom) {
      let lowestTop = -Infinity;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.top > lowestTop) {
          lowestTop = rect.top;
          bestCandidateId = item.id;
        }
      }
    } else if (bestPassedTop === -Infinity && earliestUpcomingId) {
      bestCandidateId = navItems[0].id;
    }

    setActiveSectionId((prev) =>
      prev !== bestCandidateId ? bestCandidateId : prev
    );
  }, [navItems, getStickyOffset]);

  useEffect(() => {
    updateActiveSectionOnScroll();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSectionOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateActiveSectionOnScroll]);

  // Automatically keep the active navigation item visible inside the horizontal scroll bar on mobile/tablet
  useEffect(() => {
    const listEl = scrollListRef.current;
    const activeBtn = itemRefs.current[activeSectionId];
    if (!listEl || !activeBtn) return;

    const listRect = listEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const isOutOfBoundsLeft = btnRect.left < listRect.left + 16;
    const isOutOfBoundsRight = btnRect.right > listRect.right - 16;

    if (isOutOfBoundsLeft || isOutOfBoundsRight) {
      const targetScrollLeft =
        activeBtn.offsetLeft -
        listEl.clientWidth / 2 +
        activeBtn.clientWidth / 2;
      listEl.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeSectionId]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
    };
  }, []);

  const handleNavClick = useCallback(
    (event, sectionId) => {
      event.preventDefault();
      const targetEl = document.getElementById(sectionId);
      if (!targetEl) return;

      setActiveSectionId(sectionId);
      isProgrammaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }

      const offset = getStickyOffset() + 8;
      const elementTop =
        targetEl.getBoundingClientRect().top + window.scrollY;
      const targetScrollTop = Math.max(0, elementTop - offset);

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });

      programmaticScrollTimerRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        updateActiveSectionOnScroll();
      }, 650);
    },
    [getStickyOffset, updateActiveSectionOnScroll]
  );

  if (navItems.length === 0) return null;

  return (
    <nav
      ref={navBarRef}
      className={`sld-project-secnav ${
        isStuck ? 'sld-project-secnav--stuck' : ''
      }`}
      aria-label="Project sections navigation"
    >
      <div className="sld-project-secnav__container">
        <ul
          ref={scrollListRef}
          className="sld-project-secnav__list"
          role="list"
        >
          {navItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <li key={item.id} className="sld-project-secnav__item">
                <a
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[item.id] = el;
                    }
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`sld-project-secnav__link ${
                    isActive ? 'sld-project-secnav__link--active' : ''
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="sld-project-secnav__label">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
