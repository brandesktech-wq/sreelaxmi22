import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import './Header.css';

const DEFAULT_LOGO_SRC = '/assets/aistudio/logo_e890ebd1.png';

export const NAVIGATION_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Project Portfolio',
    path: '/projects',
    children: [
      { label: 'Ongoing', path: '/ongoing-projects' },
      { label: 'Upcoming', path: '/upcoming-projects' },
      { label: 'Completed', path: '/completed-projects' },
    ],
  },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Header({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = 'Sree Laxmi Developers Logo',
} = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const dropdownItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Detect scroll for sticky shadow and surface elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Keyboard navigation for Project Portfolio dropdown
  const handleDropdownKeyDown = (event) => {
    const items = dropdownItemsRef.current.filter(Boolean);
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsDropdownOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isDropdownOpen) {
        setIsDropdownOpen(true);
        requestAnimationFrame(() => items[0]?.focus());
      } else {
        const currentIndex = items.indexOf(document.activeElement);
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
      }
    } else if (event.key === 'ArrowUp' && isDropdownOpen) {
      event.preventDefault();
      const currentIndex = items.indexOf(document.activeElement);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex]?.focus();
    }
  };

  // Close dropdown when focus leaves the dropdown container
  const handleDropdownBlur = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  // Keyboard Escape handler for mobile menu
  const handleMobileKeyDown = (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const isPortfolioActive =
    location.pathname === '/projects' ||
    location.pathname.startsWith('/projects/') ||
    location.pathname.startsWith('/portfolio/') ||
    location.pathname === '/ongoing-projects' ||
    location.pathname === '/upcoming-projects' ||
    location.pathname === '/completed-projects';

  return (
    <header
      className={`sld-header ${isScrolled ? 'sld-header--scrolled' : ''}`}
      onKeyDown={handleMobileKeyDown}
    >
      <div className="sld-header__container">
        {/* Zone 1: Logo Icon & Two-Line Brand Identity */}
        <Link to="/" className="sld-brand" aria-label="Sree Laxmi Developers Home">
          <img
            src={logoSrc || DEFAULT_LOGO_SRC}
            alt={logoAlt}
            className="sld-brand__logo-img"
          />
          <div className="sld-brand__text">
            <span className="sld-brand__line-primary">SREE LAXMI</span>
            <span className="sld-brand__line-secondary">DEVELOPERS</span>
          </div>
        </Link>

        {/* Zone 2: Desktop Navigation Menu */}
        <nav className="sld-nav" aria-label="Primary Navigation">
          <ul className="sld-nav__list">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <li
                    key={item.label}
                    ref={dropdownRef}
                    className="sld-nav__item"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    onKeyDown={handleDropdownKeyDown}
                    onBlur={handleDropdownBlur}
                  >
                    <Link
                      ref={triggerRef}
                      to={item.path}
                      className={`sld-nav__link ${
                        isPortfolioActive ? 'sld-nav__link--active' : ''
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="portfolio-dropdown-menu"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="sld-nav__chevron" aria-hidden="true" />
                    </Link>

                    <ul
                      id="portfolio-dropdown-menu"
                      role="menu"
                      aria-label="Project Portfolio Submenu"
                      className={`sld-dropdown ${
                        isDropdownOpen ? 'sld-dropdown--open' : ''
                      }`}
                    >
                      {item.children.map((child, idx) => (
                        <li key={child.path} role="none" className="sld-dropdown__item">
                          <NavLink
                            ref={(el) => {
                              dropdownItemsRef.current[idx] = el;
                            }}
                            to={child.path}
                            role="menuitem"
                            className={({ isActive }) =>
                              `sld-dropdown__link ${
                                isActive ? 'sld-dropdown__link--active' : ''
                              }`
                            }
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <span>{child.label}</span>
                            <ChevronRight
                              className="sld-dropdown__indicator"
                              aria-hidden="true"
                            />
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.path} className="sld-nav__item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sld-nav__link ${isActive ? 'sld-nav__link--active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Zone 3: Header CTA & Mobile Menu Toggle */}
        <div className="sld-actions">
          <Link to="/contact" className="sld-cta">
            Enquire Now
          </Link>

          <button
            type="button"
            className="sld-mobile-toggle"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="sld-mobile-navigation"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        id="sld-mobile-navigation"
        ref={mobileMenuRef}
        className={`sld-mobile-panel ${isMobileMenuOpen ? 'sld-mobile-panel--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="sld-mobile-panel__inner" aria-label="Mobile Navigation">
          <ul className="sld-mobile-nav__list">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <li key={item.label} className="sld-mobile-nav__item">
                    <button
                      type="button"
                      className={`sld-mobile-nav__link ${
                        isPortfolioActive ? 'sld-mobile-nav__link--active' : ''
                      }`}
                      aria-expanded={isMobilePortfolioOpen}
                      aria-controls="mobile-portfolio-submenu"
                      onClick={() => setIsMobilePortfolioOpen((prev) => !prev)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="sld-nav__chevron" aria-hidden="true" />
                    </button>

                    <ul
                      id="mobile-portfolio-submenu"
                      className={`sld-mobile-submenu ${
                        isMobilePortfolioOpen ? 'sld-mobile-submenu--open' : ''
                      }`}
                    >
                      <li>
                        <NavLink
                          to={item.path}
                          end
                          className={({ isActive }) =>
                            `sld-mobile-submenu__link ${
                              isActive ? 'sld-mobile-submenu__link--active' : ''
                            }`
                          }
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>All Projects</span>
                          <ChevronRight size={15} aria-hidden="true" />
                        </NavLink>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `sld-mobile-submenu__link ${
                                isActive ? 'sld-mobile-submenu__link--active' : ''
                              }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span>{child.label}</span>
                            <ChevronRight size={15} aria-hidden="true" />
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.path} className="sld-mobile-nav__item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sld-mobile-nav__link ${
                        isActive ? 'sld-mobile-nav__link--active' : ''
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="sld-mobile-panel__cta-wrapper">
            <Link
              to="/contact"
              className="sld-cta sld-cta--mobile"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enquire Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
