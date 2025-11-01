import React, { useEffect } from 'react';
import { PaymentDetailSection } from '../../components/premium';
import { Footer, Header } from '../../components/common';
import { premiumBg, premiumBg2 } from '../../assets';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const PremiumPaymentDetailPage = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { profile } = useSelector(state => state.user);

  useEffect(() => {
    if (!profile) {
      message.warning('Vui lòng đăng nhập để xem chi tiết thanh toán');
      navigate('/login', { state: { from: `/premium/payment-detail/${plan}` } });
    }
  }, [profile, navigate, plan]);

  // Show loading or redirect if not logged in
  if (!profile) {
    return null;
  }

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