import React from 'react';
import AboutTitleBar from '../components/AboutTitleBar.jsx';
import AboutStorySection from '../components/AboutStorySection.jsx';
import FunFactsSection from '../components/FunFactsSection.jsx';
import MissionVisionSection from '../components/MissionVisionSection.jsx';
import CredentialsSection from '../components/CredentialsSection.jsx';
import LeadershipSection from '../components/LeadershipSection.jsx';
import MilestonesSection from '../components/MilestonesSection.jsx';
import OurValuesSection from '../components/OurValuesSection.jsx';

export default function AboutPage() {
  return (
    <div className="sld-about-page">
      <AboutTitleBar />
      <AboutStorySection />
      <FunFactsSection showHeader={false} />
      <MissionVisionSection />
      <CredentialsSection />
      <LeadershipSection />
      <MilestonesSection />
      <OurValuesSection />
    </div>
  );
}
