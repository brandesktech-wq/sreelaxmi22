/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import OurStory from './components/OurStory.jsx';
import WhySreeLaxmi from './components/WhySreeLaxmi.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import BookSiteVisitCTA from './components/BookSiteVisitCTA.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectPortfolioPage from './pages/ProjectPortfolioPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { getEffectiveBaseUrl } from './utils/assetUrl.ts';

function getRouterBasename(): string {
  if (
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/sreelaxmi22')
  ) {
    return '/sreelaxmi22';
  }
  const effectiveBase = getEffectiveBaseUrl().replace(/\/+$/, '');
  if (
    typeof window !== 'undefined' &&
    effectiveBase &&
    !window.location.pathname.startsWith(effectiveBase)
  ) {
    return '/';
  }
  return effectiveBase || '/sreelaxmi22';
}

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <HeroSlider />
      <OurStory />
      <WhySreeLaxmi />
      <ProjectsSection />
      <GallerySection />
      <TestimonialsSection />
      <BookSiteVisitCTA />
      <ContactSection />
    </>
  );
}

export default function App() {
  const routerBasename = getRouterBasename();

  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTopOnNavigate />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectPortfolioPage />} />
          <Route
            path="/ongoing-projects"
            element={<ProjectPortfolioPage statusFilter="Ongoing" />}
          />
          <Route
            path="/upcoming-projects"
            element={<ProjectPortfolioPage statusFilter="Upcoming" />}
          />
          <Route
            path="/completed-projects"
            element={<ProjectPortfolioPage statusFilter="Completed" />}
          />
          <Route
            path="/projects/ongoing"
            element={<ProjectPortfolioPage statusFilter="Ongoing" />}
          />
          <Route
            path="/projects/upcoming"
            element={<ProjectPortfolioPage statusFilter="Upcoming" />}
          />
          <Route
            path="/projects/completed"
            element={<ProjectPortfolioPage statusFilter="Completed" />}
          />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}
