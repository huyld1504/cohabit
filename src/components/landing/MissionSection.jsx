import React from 'react';
import { element3 } from '../../assets';

const MissionSection = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-y-12 md:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 lg:space-y-8 md:space-y-8 space-y-6 md:mx-33 lg:mx-5 text-left">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                Nhiệm vụ của chúng tôi
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-3xl font-bold leading-tight">
              <span className="text-blue-600">Hỗ trợ người dùng tìm kiếm giải pháp nhà </span>
              <span className="text-yellow-500">ở an toàn, minh bạch và phù hợp </span>
              <br />
              <span className="text-blue-600 text-4xl">Trong hệ sinh thái.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </div>

          {/* Right Image */}
          <div className="col-span-1 lg:col-span-7 relative flex justify-center items-center mt-12 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80 shadow-xl border border-blue-200 transform scale-110"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <img
                src={element3}
                alt="Our Services"
                className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[450px] lg:w-[700px] lg:h-[650px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
