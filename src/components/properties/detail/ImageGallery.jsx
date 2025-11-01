import React from 'react';
import { Image, Alert } from 'antd';

const ImageGallery = ({ images = [] }) => {
  const mainImage = images[0] || '';

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
    <div className="w-full">
      <Image.PreviewGroup>
        {/* Single image - show full width */}
        {images.length === 1 && (
          <div className="w-full">
            <Image
              src={mainImage}
              alt="Property image"
              className="w-full object-cover rounded-lg"
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Two images - 50/50 split */}
        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div key={index} style={{ height: '500px' }}>
                <Image
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Three images - 2/3 + 1/3 split with 2 rows */}
        {images.length === 3 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2" style={{ height: '500px' }}>
              <Image
                src={images[0]}
                alt="Main property"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-rows-2 gap-3">
              {images.slice(1, 3).map((image, index) => (
                <div key={index + 1} style={{ height: '244px' }}>
                  <Image
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Four images - 2/3 main + 1/3 grid with 2 rows */}
        {images.length === 4 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2" style={{ height: '500px' }}>
              <Image
                src={images[0]}
                alt="Main property"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-rows-2 gap-3">
              {images.slice(1, 4).map((image, index) => (
                <div key={index + 1} style={{ height: index === 2 ? '244px' : '161px' }}>
                  <Image
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Five images - 2/3 main + 1/3 grid with 3 rows */}
        {images.length === 5 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2" style={{ height: '500px' }}>
              <Image
                src={images[0]}
                alt="Main property"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-rows-4 gap-3">
              {images.slice(1, 5).map((image, index) => (
                <div key={index + 1} style={{ height: '119px' }}>
                  <Image
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGallery;
