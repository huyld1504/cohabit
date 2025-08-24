import React from 'react';
import { Button } from 'antd';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo Badge */}
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg">
              <div className="text-lg font-bold text-blue-600 flex items-center">
                <span>COHABIT</span>
                <span className="inline-block w-4 h-4 bg-blue-600 rounded-sm mx-1 relative">
                  <span className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-sm"></span>
                </span>
              </div>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="text-yellow-400 font-bold">FIND </span>
                <span className='text-5xl font-bold text-blue-500 leading-tight'>YOUR MATCH</span>
              </h1>
              <h1 className="text-7xl font-bold leading-tight">
                <span className="text-yellow-400 font-bold">LIVE </span>
                <span className='text-7xl text-blue-500 font-bold leading-tight'>YOUR VIBE</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="large"
                className="!bg-blue-600 border-blue-600 !text-white hover:bg-blue-700 hover:border-blue-700 px-8 py-3 h-auto font-medium text-base rounded-lg"
              >
                Đăng ký
              </Button>
              <Button
                size="large"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-3 h-auto font-medium text-base rounded-lg"
              >
                Dịch vụ
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gray-200 rounded-full opacity-30"></div>
            </div>

            {/* Main Image Container */}
            <div className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Splash Effects */}
              <div className="absolute inset-0">
                {/* Various splash shapes */}
                <div className="absolute top-10 left-10 w-8 h-8 bg-blue-400 rounded-full opacity-70"></div>
                <div className="absolute top-20 right-16 w-6 h-6 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-20 left-8 w-10 h-10 bg-blue-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-12 w-4 h-4 bg-blue-200 rounded-full opacity-80"></div>

                {/* Abstract splash shapes */}
                <div className="absolute top-1/4 left-0 w-20 h-16 bg-blue-400 opacity-40 rounded-lg transform -rotate-12"></div>
                <div className="absolute top-1/2 right-0 w-16 h-20 bg-blue-500 opacity-35 rounded-lg transform rotate-45"></div>
                <div className="absolute bottom-1/4 left-1/4 w-12 h-8 bg-blue-300 opacity-45 rounded-full transform rotate-12"></div>
              </div>

              {/* Handshake Image Placeholder */}
              <div className="relative z-20 w-64 h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-2xl">
                {/* Simple handshake representation */}
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-20 bg-orange-400 rounded-lg transform -rotate-12 opacity-80"></div>
                  <div className="w-16 h-20 bg-orange-500 rounded-lg transform rotate-12 opacity-90"></div>
                </div>

                {/* Hand illustration placeholder */}
                <div className="absolute inset-4 bg-gradient-to-br from-pink-200 to-orange-200 rounded-xl opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
