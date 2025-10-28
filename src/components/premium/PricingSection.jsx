import PricingCard from './PricingCard';
import { PAYMENT_PACKAGES } from '../../constants/payment.constant';

const PricingSection = () => {
  const handleSubscribe = (plan) => {
    console.log(`Subscribing to ${plan} plan`);
    // Handle subscription logic here - now handled in PricingCard
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nâng cấp tài khoản
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Sử dụng các tính năng cao cấp
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plus Card */}
          <PricingCard
            plan={PAYMENT_PACKAGES.PLUS.name}
            price={PAYMENT_PACKAGES.PLUS.displayPrice}
            period={PAYMENT_PACKAGES.PLUS.period}
            features={PAYMENT_PACKAGES.PLUS.features}
            variant="plus"
            onSubscribe={() => handleSubscribe('Plus')}
          />

          {/* Pro Card */}
          <PricingCard
            plan={PAYMENT_PACKAGES.PRO.name}
            price={PAYMENT_PACKAGES.PRO.displayPrice}
            period={PAYMENT_PACKAGES.PRO.period}
            features={PAYMENT_PACKAGES.PRO.features}
            variant="pro"
            onSubscribe={() => handleSubscribe('Pro')}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;