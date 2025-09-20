import React from 'react';
import { 
  PremiumHero, 
  PricingSection, 
  FeaturesSection
} from '../../components/premium';
import { Footer, Header } from '../../components/common';
import { premiumBg } from '../../assets';

const PremiumPage = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${premiumBg})`,
      }}
    >
      <Header variant="premium" />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Pricing Section */}
        <PricingSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Footer */}
        <Footer variant="premium" />
      </div>
    </div>
  );
};

export default PremiumPage;