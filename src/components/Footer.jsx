import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_DETAILS } from './ContactSection.jsx';
import './Footer.css';

const DEFAULT_LOGO_SRC = '/assets/aistudio/logo_e890ebd1.png';

/**
 * Six-item Explore navigation menu in exact required order
 */
export const FOOTER_EXPLORE_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Project Portfolio', path: '/projects' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

/**
 * Centralized Social Media Configuration (Editable Placeholders)
 * ---------------------------------------------------------------------------
 * Replace the `url` values below with verified Sree Laxmi Developers social
 * profile URLs prior to publication.
 */
export const FOOTER_SOCIAL_LINKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    url: '#facebook-profile-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: '#instagram-profile-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: '#youtube-channel-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: '#linkedin-company-placeholder',
    isPlaceholder: true,
  },
];

/**
 * Recognizable brand SVG icons for Facebook, Instagram, YouTube, and LinkedIn
 */
function SocialBrandIcon({ id, className }) {
  switch (id) {
    case 'facebook':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13.5 21v-7.5h2.55l.38-2.95H13.5V8.67c0-.85.24-1.43 1.46-1.43h1.56V4.6c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.16H8v2.95h2.44V21h3.06Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z" />
          <polygon
            points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.94 8.5H4.12V19.5h2.82V8.5ZM5.53 7.18a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28ZM19.88 19.5h-2.81v-5.36c0-1.28-.03-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83v5.45H10.43V8.5h2.7v1.5h.04c.37-.71 1.29-1.46 2.66-1.46 2.85 0 3.37 1.87 3.37 4.31v6.65h.68Z" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Subtle gold line-art city skyline illustration along the lower-left edge
 */
function SkylineLineArt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 680 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.85">
        {/* Baseline */}
        <line x1="0" y1="218" x2="680" y2="218" />
        {/* Tower 1 */}
        <rect x="18" y="110" width="52" height="108" />
        <line x1="28" y1="126" x2="60" y2="126" />
        <line x1="28" y1="142" x2="60" y2="142" />
        <line x1="28" y1="158" x2="60" y2="158" />
        <line x1="28" y1="174" x2="60" y2="174" />
        <line x1="28" y1="190" x2="60" y2="190" />
        {/* Stepped High-Rise Tower 2 */}
        <rect x="86" y="48" width="74" height="170" />
        <rect x="98" y="30" width="50" height="18" />
        <line x1="123" y1="10" x2="123" y2="30" />
        <line x1="104" y1="64" x2="104" y2="218" />
        <line x1="123" y1="64" x2="123" y2="218" />
        <line x1="142" y1="64" x2="142" y2="218" />
        <line x1="86" y1="86" x2="160" y2="86" />
        <line x1="86" y1="114" x2="160" y2="114" />
        <line x1="86" y1="142" x2="160" y2="142" />
        <line x1="86" y1="170" x2="160" y2="170" />
        {/* Angled Modern Tower 3 */}
        <path d="M178 218V82L242 54V218" />
        <line x1="194" y1="90" x2="194" y2="218" />
        <line x1="210" y1="82" x2="210" y2="218" />
        <line x1="226" y1="74" x2="226" y2="218" />
        <line x1="178" y1="116" x2="242" y2="116" />
        <line x1="178" y1="148" x2="242" y2="148" />
        <line x1="178" y1="180" x2="242" y2="180" />
        {/* Twin Residential Podium & Tower 4 */}
        <rect x="260" y="96" width="66" height="122" />
        <line x1="274" y1="112" x2="312" y2="112" />
        <line x1="274" y1="128" x2="312" y2="128" />
        <line x1="274" y1="144" x2="312" y2="144" />
        <line x1="274" y1="160" x2="312" y2="160" />
        <line x1="274" y1="176" x2="312" y2="176" />
        <line x1="274" y1="192" x2="312" y2="192" />
        {/* Slender Architectural Spire 5 */}
        <path d="M344 218V66L388 42L412 66V218" />
        <line x1="366" y1="66" x2="366" y2="218" />
        <line x1="388" y1="42" x2="388" y2="218" />
        <line x1="344" y1="102" x2="412" y2="102" />
        <line x1="344" y1="138" x2="412" y2="138" />
        <line x1="344" y1="174" x2="412" y2="174" />
        {/* Low-Rise Terrace 6 */}
        <rect x="430" y="136" width="84" height="82" />
        <line x1="446" y1="154" x2="498" y2="154" />
        <line x1="446" y1="172" x2="498" y2="172" />
        <line x1="446" y1="190" x2="498" y2="190" />
        {/* Distant Skyline Outlines */}
        <path d="M514 218V162H568V124H624V218" opacity="0.55" />
      </g>
    </svg>
  );
}

export default function Footer({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = 'Sree Laxmi Developers Logo',
  exploreLinks = FOOTER_EXPLORE_LINKS,
  socialLinks = FOOTER_SOCIAL_LINKS,
  contactInfo = CONTACT_DETAILS,
} = {}) {
  const handleSocialClick = (event, item) => {
    if (item.isPlaceholder || item.url.startsWith('#')) {
      event.preventDefault();
    }
  };

  return (
    <footer className="sld-footer" aria-label="Site Footer">
      {/* Subtle Architectural Background Decorations */}
      <div className="sld-footer__bg-layer" aria-hidden="true">
        <SkylineLineArt className="sld-footer__skyline-left" />
        <div className="sld-footer__building-right" />
      </div>

      <div className="sld-footer__container">
        {/* Three-Column Main Footer Layout */}
        <div className="sld-footer__grid">
          {/* Column 1 – Prominent White Logo, Gold Line, About Text, and Social Icons */}
          <div className="sld-footer__col sld-footer__col--about">
            <Link
              to="/"
              className="sld-footer__brand"
              aria-label="Sree Laxmi Developers Home"
            >
              <img
                src={logoSrc || DEFAULT_LOGO_SRC}
                alt={logoAlt}
                className="sld-footer__logo-img"
              />
              <div className="sld-footer__brand-text">
                <span className="sld-footer__brand-primary">SREE LAXMI</span>
                <span className="sld-footer__brand-secondary">DEVELOPERS</span>
              </div>
            </Link>

            {/* Short Gold Decorative Line Beneath Logo */}
            <div className="sld-footer__logo-rule" aria-hidden="true" />

            {/* Two-Line About Description */}
            <div className="sld-footer__description">
              <p className="sld-footer__desc-line">
                Building thoughtfully designed spaces for modern living.
              </p>
              <p className="sld-footer__desc-line">
                Committed to quality, trust, and lasting value.
              </p>
            </div>

            {/* Four Circular Gold-Outline Social Media Icons */}
            <ul
              className="sld-footer__social-list"
              aria-label="Social Media Links"
            >
              {socialLinks.map((social) => (
                <li key={social.id} className="sld-footer__social-item">
                  <a
                    href={social.url}
                    target={social.isPlaceholder ? undefined : '_blank'}
                    rel={
                      social.isPlaceholder ? undefined : 'noopener noreferrer'
                    }
                    onClick={(e) => handleSocialClick(e, social)}
                    className="sld-footer__social-link"
                    aria-label={`Visit Sree Laxmi Developers on ${social.label}`}
                  >
                    <SocialBrandIcon
                      id={social.id}
                      className="sld-footer__social-icon"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 – Explore Menu (Six Items with Gold Chevrons) */}
          <nav
            className="sld-footer__col sld-footer__col--explore"
            aria-label="Footer Explore Navigation"
          >
            <h2 className="sld-footer__heading">Explore</h2>
            <ul className="sld-footer__nav-list">
              {exploreLinks.map((item) => (
                <li key={item.path} className="sld-footer__nav-item">
                  <Link to={item.path} className="sld-footer__nav-link">
                    <ChevronRight
                      className="sld-footer__nav-chevron"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 – Contact Us (Three Rows with Circular Gold-Outline Icons) */}
          <div className="sld-footer__col sld-footer__col--contact">
            <h2 className="sld-footer__heading">Contact Us</h2>
            <ul className="sld-footer__contact-list">
              {/* Row 1: Phone / WhatsApp */}
              <li className="sld-footer__contact-item">
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sld-footer__contact-row-link"
                  aria-label={`Phone or WhatsApp ${contactInfo.whatsappDisplay}`}
                >
                  <span
                    className="sld-footer__contact-icon-wrap"
                    aria-hidden="true"
                  >
                    <Phone
                      className="sld-footer__contact-icon"
                      strokeWidth={1.65}
                    />
                  </span>
                  <div className="sld-footer__contact-body">
                    <span className="sld-footer__contact-label">
                      PHONE / WHATSAPP
                    </span>
                    <span className="sld-footer__contact-value">
                      {contactInfo.whatsappDisplay}
                    </span>
                  </div>
                </a>
              </li>

              {/* Row 2: Email */}
              <li className="sld-footer__contact-item">
                <a
                  href={contactInfo.emailUrl}
                  className="sld-footer__contact-row-link"
                  aria-label={`Email ${contactInfo.email}`}
                >
                  <span
                    className="sld-footer__contact-icon-wrap"
                    aria-hidden="true"
                  >
                    <Mail
                      className="sld-footer__contact-icon"
                      strokeWidth={1.65}
                    />
                  </span>
                  <div className="sld-footer__contact-body">
                    <span className="sld-footer__contact-label">EMAIL</span>
                    <span className="sld-footer__contact-value sld-footer__contact-email">
                      {contactInfo.email}
                    </span>
                  </div>
                </a>
              </li>

              {/* Row 3: Location */}
              <li className="sld-footer__contact-item">
                <div className="sld-footer__contact-row-static">
                  <span
                    className="sld-footer__contact-icon-wrap"
                    aria-hidden="true"
                  >
                    <MapPin
                      className="sld-footer__contact-icon"
                      strokeWidth={1.65}
                    />
                  </span>
                  <div className="sld-footer__contact-body">
                    <span className="sld-footer__contact-label">LOCATION</span>
                    <span className="sld-footer__contact-value">
                      {contactInfo.location}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Thin Gold Divider with Diamond Ornament Between Main Footer & Copyright Bar */}
        <div className="sld-footer__divider" aria-hidden="true">
          <span className="sld-footer__divider-line" />
          <span className="sld-footer__divider-diamond" />
          <span className="sld-footer__divider-line" />
        </div>

        {/* Bottom Copyright Bar with Exact Wording & Right-Side Gold Diamond Ornament */}
        <div className="sld-footer__bottom">
          <p className="sld-footer__copyright">
            All Rights Reserved by Sree Laxmi Developers
          </p>

          <div className="sld-footer__bottom-ornament" aria-hidden="true">
            <span className="sld-footer__bottom-line" />
            <span className="sld-footer__bottom-diamond" />
            <span className="sld-footer__bottom-line sld-footer__bottom-line--short" />
          </div>
        </div>
      </div>
    </footer>
  );
}
