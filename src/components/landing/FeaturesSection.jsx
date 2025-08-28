import React from 'react';

const MissionSection = () => {
  return (
    <section className="bg-white py-16 lg:py-20 max-w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                Nhiệm vụ của chúng tôi
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              <span className="text-blue-600">Hỗ trợ người dùng tìm kiếm giải pháp nhà </span>
              <span className="text-orange-500">ở an toàn, minh bạch và phù hợp </span>
              <span className="text-blue-600">Trong hệ sinh thái.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-full aspect-square flex items-center justify-center overflow-hidden">
              {/* Splash Effects */}
              <div className="absolute inset-0">
                {/* Top splash */}
                <div className="absolute top-4 right-8 w-16 h-8 bg-blue-300 rounded-full opacity-60 transform rotate-12"></div>
                <div className="absolute top-8 right-12 w-8 h-4 bg-blue-400 rounded-full opacity-40"></div>

                {/* Side splashes */}
                <div className="absolute left-4 top-1/3 w-12 h-6 bg-blue-300 rounded-full opacity-50 transform -rotate-45"></div>
                <div className="absolute right-6 bottom-1/3 w-10 h-5 bg-blue-300 rounded-full opacity-60 transform rotate-45"></div>

                {/* Bottom splashes */}
                <div className="absolute bottom-6 left-8 w-14 h-7 bg-blue-300 rounded-full opacity-50 transform -rotate-12"></div>

                {/* Small dots */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-70"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
                <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-blue-300 rounded-full opacity-50"></div>
              </div>

              {/* Main Image Placeholder */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">🏠</div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                      <div className="text-white text-3xl">👨‍💼</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
