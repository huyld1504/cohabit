import React from 'react';
import Slider from 'react-slick';

const VisionSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const slides = [
    { id: 1, content: "Card 1" },
    { id: 2, content: "Card 2" },
    { id: 3, content: "Card 3" },
    { id: 4, content: "Card 4" },
    { id: 5, content: "Card 5" },
    { id: 6, content: "Card 6" }
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            Tầm nhìn của chúng tôi
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto">
            <span className="text-blue-600">Trở thành nền tảng cho thuê hàng đầu tại Việt Nam, nơi mọi người không chỉ tìm được chỗ ở mà còn tìm thấy những </span>
            <span className="text-orange-500">người phù hợp</span>
            <span className="text-blue-600"> và </span>
            <span className="text-orange-500">cộng đồng</span>
            <span className="text-blue-600"> để </span>
            <span className="text-orange-500">cùng chung sống</span>
            <span className="text-blue-600">.</span>
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            CoHabit là một nền tảng giúp người thuê nhà tìm kiếm các lựa chọn thuê
            phù hợp, có thể có hoặc không có bạn cùng phòng.
          </p>
        </div>

        {/* React Slick Carousel */}
        <div className="mb-16">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="border-2 border-blue-300 rounded-lg h-64 bg-white flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">{slide.content}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
