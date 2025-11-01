import React from 'react';
import { Card, Button, Tooltip } from 'antd';
import { EnvironmentOutlined, EyeOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const FavoriteCard = ({
  id,
  title,
  description,
  location,
  image,
  onRemove
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/properties/${id}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove && onRemove(id);
  };

  return (
    <Card
      className="favorite-card bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex gap-4">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            alt={title}
            src={image || 'https://via.placeholder.com/120x120?text=Room'}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 mb-2 truncate">
            {title}
          </h3>

          <div className="flex items-start text-gray-500 text-sm mb-3">
            <EnvironmentOutlined className="mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{location}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Tooltip title="Xem chi tiết" placement="top">
              <Button
                type="text"
                shape="circle"
                icon={<EyeOutlined className="text-xl !text-blue-500" />}
                onClick={handleViewDetails}
                className="hover:bg-blue-50 transition-all duration-200 hover:scale-105 flex items-center justify-center w-10 h-10 min-w-0 p-0 border border-blue-200"
              />
            </Tooltip>

            <Tooltip title="Xóa khỏi yêu thích" placement="top">
              <Button
                type="text"
                shape="circle"
                icon={<HeartFilled className="text-xl !text-red-500" />}
                onClick={handleRemove}
                className="hover:bg-red-50 transition-all duration-200 hover:scale-105 flex items-center justify-center w-10 h-10 min-w-0 p-0 border border-red-200"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FavoriteCard;
