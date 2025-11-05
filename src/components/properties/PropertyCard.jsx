import React from 'react';
import { Card, Button, Rate, Tooltip } from 'antd';
import { EnvironmentOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SafeHTMLRenderer from '../common/SafeHTMLRenderer';

const PropertyCard = ({
  id,
  title,
  description,
  price,
  location,
  image,
  isLiked = false,
  rating = 4.5,
  reviewCount = 0,
  onLike
}) => {
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    onLike && onLike(id);
  };

  const handleCardClick = () => {
    navigate(`/properties/${id}`);
  };

  return (
    <Card
      className="property-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border-0 [&_.ant-card-body]:p-5"
      cover={
        <div className="relative">
          <img
            alt={title}
            src={image || 'https://via.placeholder.com/300x200?text=Room'}
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3">
            <Button
              type="text"
              icon={
                isLiked ? (
                  <HeartFilled className="!text-red-500 !text-xl" />
                ) : (
                  <HeartOutlined className="!text-white !text-xl" />
                )}
              className="bg-black bg-opacity-40 border-none hover:bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={handleLike}
            />
          </div>
        </div>
      }
      onClick={handleCardClick}
    >
      <div className="space-y-6">
        {/* Title */}
        <Tooltip title={title} placement="top">
          <h3 className="font-semibold text-base text-gray-900 leading-tight truncate cursor-pointer">
            {title}
          </h3>
        </Tooltip>

        {/* Description */}
        <div className="h-12 overflow-hidden">
          <SafeHTMLRenderer
            htmlContent={description}
            className="text-gray-600 text-sm leading-relaxed line-clamp-2 overflow-hidden"
          />
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm">
          <EnvironmentOutlined className="mr-1.5 text-gray-400" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center text-sm">
          <Rate
            disabled
            allowHalf
            value={rating}
            className="text-xs [&_.ant-rate-star]:text-sm [&_.ant-rate-star]:text-yellow-400"
          />
          <span className="ml-2 text-gray-600 font-medium">
            {rating.toFixed(1)}
          </span>
          {reviewCount > 0 && (
            <span className="ml-1 text-gray-400">
              ({reviewCount} đánh giá)
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex flex-col space-y-3 pt-2">
          <div className="text-left">
            <span className="text-red-600 font-bold text-lg">
              GIÁ CHỈ {price?.toLocaleString()} đ
            </span>
          </div>

          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-md py-2 text-sm font-medium w-full"
            size="middle"
          >
            THUÊ PHÒNG
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
