import React from 'react';
import { HeroSection, ServicesSection, MissionSection } from '../../components/landing';
import AppFeedbackSection from '../../components/landing/VisionSection';

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ServicesSection />
      <MissionSection />
      <AppFeedbackSection />
    </div>
  );
};

export default LandingPage;