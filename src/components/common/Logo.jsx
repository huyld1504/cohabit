import React from 'react';
import { artboard } from '../../assets';

const Logo = ({
  width = 170,
  height = 90,
  className = "",
  alt = "CoHabit Logo",
  onClick = null,
  src = artboard
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-contain ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`
        }}
      />
    </div>
  );
};

export default Logo;