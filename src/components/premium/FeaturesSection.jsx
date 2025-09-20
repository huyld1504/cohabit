import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const plusFeatures = [
    {
      title: 'Tính năng tìm bạn phòng',
      description: 'Tìm kiếm và kết nối với những người cùng nhu cầu thuê phòng trong khu vực'
    },
    {
      title: 'Nhận tin trực tiếp chatbot',
      description: 'Nhận thông báo và hỗ trợ tự động 24/7 qua chatbot thông minh'
    },
    {
      title: 'Lọc nâng cao',
      description: 'Bộ lọc chi tiết giúp tìm kiếm chính xác theo nhiều tiêu chí'
    }
  ];

  const proFeatures = [
    {
      title: 'Tính năng tìm bạn phòng',
      description: 'Tìm kiếm và kết nối với những người cùng nhu cầu thuê phòng trong khu vực'
    },
    {
      title: 'Nhận tin trực tiếp chatbot',
      description: 'Nhận thông báo và hỗ trợ tự động 24/7 qua chatbot thông minh'
    },
    {
      title: 'Lọc nâng cao',
      description: 'Bộ lọc chi tiết giúp tìm kiếm chính xác theo nhiều tiêu chí'
    },
    {
      title: 'Đăng nhiều tin cùng lúc',
      description: 'Đăng và quản lý nhiều tin cho thuê cùng một lúc một cách dễ dàng'
    },
    {
      title: 'Tin ưu tiên hiển thị trên đầu',
      description: 'Tin đăng của bạn sẽ được ưu tiên hiển thị ở vị trí đầu tiên'
    },
    {
      title: 'Quản lí phòng trọ dành cho chủ nhà',
      description: 'Công cụ quản lý toàn diện cho chủ nhà với nhiều tính năng tiện ích'
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Đặc quyền khi nâng cấp
          </h2>
        </div>

        {/* Plus Features */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold">
              Plus
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plusFeatures.map((feature, index) => (
              <FeatureCard
                key={`plus-${index}`}
                title={feature.title}
                description={feature.description}
                variant="plus"
              />
            ))}
          </div>
        </div>

        {/* Pro Features */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold">
              Pro
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {proFeatures.map((feature, index) => (
              <FeatureCard
                key={`pro-${index}`}
                title={feature.title}
                description={feature.description}
                variant="pro"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;