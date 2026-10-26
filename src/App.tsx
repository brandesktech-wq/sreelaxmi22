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
import FunFactsSection from './components/FunFactsSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectPortfolioPage from './pages/ProjectPortfolioPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

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
      <FunFactsSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
