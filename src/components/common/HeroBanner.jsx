import React from 'react';

const HeroBanner = ({
  backgroundImage,
  height = "lg:h-[40vh] lg:w-[100vw]"
}) => {
  return (
    <div
      className={`hero-banner bg-cover bg-center bg-no-repeat ${height}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Banner image already contains all text and design */}
    </div>
  );
};

export default HeroBanner;
