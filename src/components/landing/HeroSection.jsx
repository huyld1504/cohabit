import React from 'react';
import { Button } from 'antd';
import { element1, logo, sloganImage, sloganImage2 } from '../../assets';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-10 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-16 items-center">
          
          {/* Left Content - Text */}
          <div className="col-span-12 lg:col-span-5 lg:space-y-8 md:space-y-8 space-y-6 md:mx-33 lg:mx-5">
            {/* Logo Badge */}
            <div className="inline-flex items-center bg-[#b8d5e0] px-3 rounded-lg">
              <span className="text-[#1279a2] text-xl font-bold uppercase px-auto">Cohabit</span>
              <div className="flex items-center justify-center h-12 pl-2">
                <img
                  src={logo}
                  alt="COHABIT Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
            {/* Slogan section */}
            <div className="flex flex-col items-start -mt-10 lg:-ml-10 lg:-space-y-20 md:-space-y-20 md:-ml-9 -space-y-15 -ml-7">
              <img
                src={sloganImage}
                alt="Find Your Match"
                className="w-[280px] md:w-[350px] lg:w-[400px] h-auto object-contain"
              />
              <img
                src={sloganImage2}
                alt="Live Your Vibe"
                className="w-[320px] md:w-[400px] lg:w-[480px] h-auto object-contain -mt-24 md:-mt-28 lg:-mt-36 lg:-ml-2 md:-ml-1 -ml-1"
              />
            </div>
            
            {/* Description */}
            <div className='-mt-12 md:-mt-16 lg:-mt-20'>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-start">
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
          <div className="col-span-12 lg:col-span-7 relative flex justify-center items-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80 shadow-xl border border-blue-200 transform scale-110"></div>
            </div>

            {/* Main Image - Element 1 */}
            <div className="relative z-10 flex items-center justify-center">
              <img
                src={element1}
                alt="Find Your Match - Live Your Vibe"
                className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
