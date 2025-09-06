import React from 'react';
import { Image } from 'antd';

const ImageGallery = ({ images = [] }) => {
  const mainImage = images[0] || '';
  const thumbnails = images.slice(1, 5) || [];

  return (
    <div className="w-full">
      <Image.PreviewGroup>
        <div className="flex gap-2 h-80">
          {/* Main Image */}
          <div className="flex-1">
            <Image
              src={mainImage}
              alt="Main property"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              style={{
                height: '320px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="w-64">
            <div className="grid grid-cols-2 gap-2 h-full">
              {thumbnails.map((image, index) => (
                <div key={index + 1} className="h-full">
                  <Image
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    style={{
                      height: '155px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}

              {/* Show more images if there are more than 5 */}
              {images.length > 5 && thumbnails.length === 4 && (
                <div className="relative h-full">
                  <Image
                    src={images[4]}
                    alt="More images"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    style={{
                      height: '155px',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg pointer-events-none">
                    <span className="text-white font-medium">
                      +{images.length - 4} ảnh
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden images for preview group */}
        {images.length > 5 && images.slice(5).map((image, index) => (
          <Image
            key={`hidden-${index}`}
            src={image}
            style={{ display: 'none' }}
            alt={`Property image ${index + 6}`}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGallery;
