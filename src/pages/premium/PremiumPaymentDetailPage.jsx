import React from 'react';
import { PaymentDetailSection } from '../../components/premium';
import { Footer, Header } from '../../components/common';
import { premiumBg, premiumBg2 } from '../../assets';
import { useParams } from 'react-router-dom';

const PremiumPaymentDetailPage = () => {
  const { plan } = useParams();
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${plan === 'plus' ? premiumBg : premiumBg2})`,
      }}
    >
      <Header variant="premium" />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Payment Detail Section */}
        <PaymentDetailSection />

        {/* Footer */}
        <Footer variant="premium" />
      </div>
    </div>
  );
};

export default PremiumPaymentDetailPage;