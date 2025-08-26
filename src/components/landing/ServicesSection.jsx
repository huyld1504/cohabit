import React from 'react';
import { SearchOutlined, BarChartOutlined, TeamOutlined, BulbOutlined } from '@ant-design/icons';
import { element2 } from '../../assets';
import { Button } from 'antd';

const ServicesSection = () => {
  const services = [
    {
      // Responsive Icon Size
      id: 1,
      icon: <SearchOutlined className="text-3xl md:text-4xl lg:text-5xl text-blue-600" />,
      title: "Phòng trao đổi",
      subtitle: "Thuê phòng"
    },
    {
      id: 2,
      icon: <BarChartOutlined className="text-3xl md:text-4xl lg:text-5xl text-blue-600" />,
      title: "Phân bổ",
      subtitle: "Chỗ/Phòng"
    },
    {
      id: 3,
      icon: <TeamOutlined className="text-3xl md:text-4xl lg:text-5xl text-blue-600" />,
      title: "Diễn đàn",
      subtitle: "Cộng đồng"
    },
    {
      id: 4,
      icon: <BulbOutlined className="text-3xl md:text-4xl lg:text-5xl text-blue-600" />,
      title: "Trợ chuyển",
      subtitle: "tự động Bằng AI"
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16 items-center">

          {/* Left Content - Image */}
          <div className="col-span-12 lg:col-span-7 relative flex justify-center items-center order-last lg:order-first md:my-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] sm:mt-15 md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80 shadow-xl border border-blue-200 transform scale-110"></div>
            </div>
            <div className="relative z-10">
              <img
                src={element2}
                alt="Our Services"
                className="w-[300px] h-[300px] sm:w-[400px] sm:h-[350px] sm:mt-16 mr-5 md:w-[400px] md:h-[350px] lg:w-[600px] lg:h-[550px] object-cover"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-8 order-first lg:order-last text-left">
            {/* Service Badge */}
            <div className='md:mx-33 lg:mx-auto'>
              <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg">
                <span className="text-blue-600 font-medium">Dịch vụ của chúng tôi</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-blue-600">Chúng tôi mở rộng </span>
                  <span className="text-yellow-500">dịch vụ</span>
                </h2>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-blue-600">đến nhiều </span>
                  <span className="text-yellow-500">khách hàng</span>
                </h2>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-blue-600">
                  khác nhau
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {services.map((service) => (
                  <Button
                    key={service.id}
                    // onClick={() => handleServiceClick(service)}
                    className="!h-full !bg-blue-50 !border-2 !border-blue-200 !rounded-xl !p-4
                       hover:!bg-blue-100 hover:!border-blue-400 
                       !shadow-sm hover:!shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 h-full text-center sm:text-left">
                      <div className="flex-shrink-0 text-blue-600">
                        {service.icon}
                      </div>
                      <div className=' mt-3'>
                        <h3 className="font-bold text-blue-800 text-base sm:text-lg leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-blue-700 text-sm sm:text-base font-medium">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;