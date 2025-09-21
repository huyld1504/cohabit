import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanDetailsCard from '../../components/payment/PlanDetailsCard';
import PaymentDetailsCard from '../../components/payment/PaymentDetailsCard';
import { Header, Footer } from '../../components/common';
import { toast } from 'react-toastify';
import { premiumBg, premiumBg2 } from '../../assets';

const PaymentPage = () => {
  const { plan } = useParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');

  // Plan data
  const planData = {
    plus: {
      name: 'PLUS',
      price: '30,000đ',
      features: [
        'Tính năng tìm bạn ở ghép',
        'Có thể nhận tin trực tiếp trong hệ thống (chatbot)',
        'Lọc nâng cao'
      ],
      bgClass: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      badgeClass: 'bg-blue-500'
    },
    pro: {
      name: 'PRO',
      price: '80,000đ',
      features: [
        'Tính năng tìm bạn ở ghép',
        'Có thể nhận tin trực tiếp trong hệ thống (chatbot)',
        'Lọc nâng cao',
        'Đăng nhiều tin nhà trọ cùng lúc không bị giới hạn',
        'Tin được ưu tiên hiển thị trên đầu có biểu tượng',
        'Quản lí nhà trọ được thuê'
      ],
      bgClass: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
      badgeClass: 'bg-yellow-500'
    }
  };

  const currentPlan = planData[plan] || planData.plus;

  const handlePayment = () => {
    toast.info(`Processing payment for ${plan} plan with ${selectedPaymentMethod}`);
    // Handle payment logic here
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${currentPlan.name === 'PLUS' ? premiumBg : premiumBg2})`,
      }}
    >

      <Header variant="premium" />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Payment Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                COHABIT{' '}
                <span className={`${currentPlan.badgeClass} px-4 py-2 rounded-lg text-2xl md:text-3xl`}>
                  {currentPlan.name}
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Thanh toán gói {currentPlan.name} - {currentPlan.price}/tháng
              </p>
            </div>

            {/* Payment Cards */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Plan Details Card */}
              <PlanDetailsCard
                plan={currentPlan.name}
                features={currentPlan.features}
                variant={plan}
              />

              {/* Payment Details Card */}
              <PaymentDetailsCard
                price={currentPlan.price}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onPayment={handlePayment}
                variant={plan}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer variant="premium" />
      </div>
    </div>
  );
};

export default PaymentPage;