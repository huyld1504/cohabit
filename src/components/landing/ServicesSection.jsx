import React from 'react';
import { SearchOutlined, BarChartOutlined, TeamOutlined, BulbOutlined } from '@ant-design/icons';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: <SearchOutlined className="text-5xl text-blue-600" />,
      title: "Phòng trao đổi",
      subtitle: "Thuê phòng"
    },
    {
      id: 2,
      icon: <BarChartOutlined className="text-5xl text-blue-600" />,
      title: "Phân bổ",
      subtitle: "Chỗ/Phòng"
    },
    {
      id: 3,
      icon: <TeamOutlined className="text-5xl text-blue-600" />,
      title: "Diễn đàn",
      subtitle: "Cộng đồng"
    },
    {
      id: 4,
      icon: <BulbOutlined className="text-5xl text-blue-600" />,
      title: "Trợ chuyển",
      subtitle: "tự động Bằng AI"
    }
  ];

  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            {/* Background Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gray-200 rounded-full opacity-40"></div>
            </div>

            {/* Main Image Container */}
            <div className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Splash Effects */}
              <div className="absolute inset-0">
                {/* Blue splash shapes around the image */}
                <div className="absolute top-8 left-12 w-6 h-6 bg-blue-400 rounded-full opacity-70"></div>
                <div className="absolute top-16 right-8 w-4 h-4 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-16 left-4 w-8 h-8 bg-blue-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-8 right-16 w-5 h-5 bg-blue-200 rounded-full opacity-80"></div>

                {/* Abstract curved shapes */}
                <div className="absolute top-1/4 left-2 w-16 h-12 bg-blue-400 opacity-30 rounded-full transform -rotate-45"></div>
                <div className="absolute top-1/2 right-2 w-12 h-16 bg-blue-500 opacity-25 rounded-full transform rotate-45"></div>
                <div className="absolute bottom-1/4 left-1/3 w-10 h-6 bg-blue-300 opacity-35 rounded-full transform rotate-12"></div>

                {/* Curved lines/shapes */}
                <div className="absolute top-12 left-1/2 w-20 h-8 bg-blue-600 opacity-20 rounded-full transform -rotate-12"></div>
                <div className="absolute bottom-12 right-1/4 w-16 h-6 bg-blue-400 opacity-25 rounded-full transform rotate-45"></div>
              </div>

              {/* Circular Image Container */}
              <div className="relative z-20 w-72 h-72 bg-white rounded-full shadow-2xl overflow-hidden border-4 border-white">
                {/* Real handshake image placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-50 to-gray-50 flex items-center justify-center">
                  {/* Handshake illustration */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      {/* Two hands shaking representation */}
                      <div className="w-20 h-16 bg-gradient-to-r from-orange-300 to-pink-200 rounded-lg transform -rotate-12 shadow-lg"></div>
                      <div className="w-20 h-16 bg-gradient-to-r from-pink-200 to-orange-300 rounded-lg transform rotate-12 shadow-lg -ml-8"></div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Professional Handshake</div>
                  </div>
                </div>
              </div>

              {/* Additional decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-50"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Service Badge */}
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg">
              <span className="text-blue-600 font-medium">Dịch vụ của chúng tôi</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                <span className="text-blue-600">Chúng tôi mở rộng </span>
                <span className="text-yellow-500">dịch vụ</span>
              </h2>
              <h2 className="text-5xl lg:text-5xl font-bold leading-tight">
                <span className="text-blue-600">đến nhiều </span>
                <span className="text-yellow-500">khách hàng</span>
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-blue-600">
                khác nhau
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[80px]"
                >
                  <div className="flex items-center justify-center space-x-3 h-full">
                    <div className="flex-shrink-0 text-blue-600">
                      {service.icon}
                    </div>
                    <div className="text-left mt-3">
                      <h3 className="d-d-inline-block font-bold text-blue-600 text-lg leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-blue-600 text-base font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;