import React from 'react';
import { Image } from 'antd';

const ImageGallery = ({ images = [] }) => {
    const mainImage = images[0] || '';
    const thumbnails = images.slice(1, 5) || [];

    return (
        <div className="w-full">
            <Image.PreviewGroup
                preview={{
                    toolbarRender: () => null, // Remove toolbar if not needed
                }}
            >
                <div className="flex h-80">
                    {/* Main Image */}
                    <div className="flex-1 mr-0.5">
                        <Image
                            src={mainImage}
                            alt="Main property"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            style={{
                                height: '320px',
                                objectFit: 'cover'
                            }}
                            preview={{
                                mask: <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                    <span className="text-white text-lg">🔍 Xem ảnh</span>
                                </div>
                            }}
                        />
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="w-72">
                        <div className="grid grid-cols-2 gap-1 h-full">
                            {thumbnails.map((image, index) => (
                                <div key={index + 1} className="h-full">
                                    <Image
                                        src={image}
                                        alt={`Property ${index + 2}`}
                                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                                        style={{
                                            height: '158px',
                                            objectFit: 'cover'
                                        }}
                                        preview={{
                                            mask: <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                                <span className="text-white text-sm">🔍</span>
                                            </div>
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Show more overlay on last thumbnail if there are more images */}
                            {images.length > 5 && thumbnails.length === 4 && (
                                <div className="relative h-full">
                                    <Image
                                        src={images[4]}
                                        alt="More images"
                                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                                        style={{
                                            height: '158px',
                                            objectFit: 'cover'
                                        }}
                                        preview={{
                                            mask: <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                                <span className="text-white font-medium">
                                                    +{images.length - 4} ảnh
                                                </span>
                                            </div>
                                        }}
                                    />
                                </div>
                            )}

                            {/* Add remaining images hidden for preview group */}
                            {images.length > 5 && images.slice(5).map((image, index) => (
                                <Image
                                    key={`hidden-${index}`}
                                    src={image}
                                    style={{ display: 'none' }}
                                    alt={`Hidden image ${index + 6}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Image.PreviewGroup>
        </div>
    );
};

export default ImageGallery;
