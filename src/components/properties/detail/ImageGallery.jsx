import React from 'react';
import { Image, Alert } from 'antd';

const ImageGallery = ({ images = [] }) => {
  const mainImage = images[0] || '';
  const thumbnails = images.slice(1, 5) || [];

  // If no images, show alert
  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <Alert
          message="Không có ảnh"
          description="Bài đăng này chưa có ảnh nào được tải lên."
          type="info"
          showIcon
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Image.PreviewGroup>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 min-h-0">
          {/* Main Image */}
          <div className="flex-1 min-w-0 max-w-full">
            <Image
              src={mainImage}
              alt="Main property"
              className="w-full h-5 object-cover rounded-lg cursor-pointer"
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="flex-shrink-0 w-full lg:w-64">
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 h-20 lg:h-80">
              {thumbnails.map((image, index) => (
                <div key={index + 1} className="aspect-square">
                  <Image
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </div>
              ))}

              {/* Show more images if there are more than 5 */}
              {images.length > 5 && thumbnails.length === 4 && (
                <div className="relative aspect-square">
                  <Image
                    src={images[4]}
                    alt="More images"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg pointer-events-none">
                    <span className="text-white font-medium text-xs lg:text-sm">
                      +{images.length - 4}
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
            className="hidden"
            alt={`Property image ${index + 6}`}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGallery;
