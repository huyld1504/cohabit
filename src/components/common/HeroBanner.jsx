import React from 'react';

const HeroBanner = ({
  backgroundImage,
  height = "h-[40vh] sm:h-[42vh] md:h-[44vh] lg:h-[45vh] xl:h-[45vh] 2xl:h-[40vh]",
  objectFit = "fill" // "cover", "contain", "fill", "scale-down"
}) => {
  return (
    <div
      className={`hero-banner relative w-full ${height} min-h-[50vh] overflow-hidden lg:block md:hidden sm:hidden hidden`}
      style={{
        backgroundColor: '#f5f5f5'
      }}
    >
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt="Hero Banner"
          className={`w-full h-full object-${objectFit}`}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />
      )}
    </div>
  );
};

export default HeroBanner;
