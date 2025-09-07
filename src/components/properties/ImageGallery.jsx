import React from 'react';
import { Image } from 'antd';

const ImageGallery = ({ images = [] }) => {
    const mainImage = images[0] || '';
    const thumbnails = images.slice(1, 5) || [];

    return (
        <div className="w-full mb-6">
            <Image.PreviewGroup
                preview={{
                    toolbarRender: () => null, // Remove toolbar if not needed
                }}
            >
                {/* Desktop Layout */}
                <div className="hidden md:flex h-80">
                    {/* Main Image */}
                    <div className="flex-1 mr-2">
                        <Image
                            src={mainImage}
                            alt="Main property"
                            className="w-full h-80 object-cover rounded-lg cursor-pointer"
                            preview={{
                                mask: <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                    <span className="text-white text-lg">🔍 Xem ảnh</span>
                                </div>
                            }}
                        />
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="w-72">
                        <div className="grid grid-cols-2 gap-2 h-full">
                            {thumbnails.map((image, index) => (
                                <div key={index + 1} className="h-full">
                                    <Image
                                        src={image}
                                        alt={`Property ${index + 2}`}
                                        className="w-full h-36 lg:h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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
                                        className="w-full h-36 lg:h-40 object-cover rounded-lg cursor-pointer"
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
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="block md:hidden">
                    {/* Main Image */}
                    <div className="mb-3">
                        <Image
                            src={mainImage}
                            alt="Main property"
                            className="w-full h-64 object-cover rounded-lg cursor-pointer"
                            preview={{
                                mask: <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                    <span className="text-white text-lg">🔍 Xem ảnh</span>
                                </div>
                            }}
                        />
                    </div>

                    {/* Mobile Thumbnails - Horizontal Scroll */}
                    {thumbnails.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {thumbnails.map((image, index) => (
                                <div key={index + 1} className="flex-shrink-0">
                                    <Image
                                        src={image}
                                        alt={`Property ${index + 2}`}
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                        preview={{
                                            mask: <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                                <span className="text-white text-xs">🔍</span>
                                            </div>
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Show more indicator for mobile */}
                            {images.length > 5 && (
                                <div className="flex-shrink-0 relative">
                                    <Image
                                        src={images[4] || images[thumbnails.length]}
                                        alt="More images"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                        preview={{
                                            mask: <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                                <span className="text-white text-xs font-medium">
                                                    +{images.length - 4}
                                                </span>
                                            </div>
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Add remaining images hidden for preview group */}
                {images.length > 5 && images.slice(5).map((image, index) => (
                    <Image
                        key={`hidden-${index}`}
                        src={image}
                        className="hidden"
                        alt={`Hidden image ${index + 6}`}
                    />
                ))}
            </Image.PreviewGroup>
        </div>
    );
};

export default ImageGallery;
