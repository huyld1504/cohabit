import React from 'react';
import { HeroSection, ServicesSection, MissionSection, VisionSection } from '../../components/landing';

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ServicesSection />
      <MissionSection />
      <VisionSection />
    </div>
  );
};

export default LandingPage;