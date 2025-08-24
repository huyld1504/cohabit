import React from 'react';
import { HeroSection, ServicesSection, MissionSection, VisionSection } from '../components/landing';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <MissionSection />
      <VisionSection />
    </div>
  );
};

export default LandingPage;