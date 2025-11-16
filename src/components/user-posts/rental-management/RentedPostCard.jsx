import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined, MessageOutlined, ArrowRightOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const RentedPostCard = ({ post }) => {
  const navigate = useNavigate();

  const {
    id,
    orderId,
    title,
    address,
    renter,
    rentStartDate,
    image,
    conversationId
  } = post;

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  const handleViewDetails = () => {
    navigate(`/properties/${id}`);
  };

  const handleContact = () => {
    if (conversationId) {
      navigate(`/chat?conversationId=${conversationId}`);
    }
  };

  return (
    <Card
      className="shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex flex-col">
        {/* Property Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <h3 className="text-gray-800 font-semibold text-base truncate">
                  {title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                📍 {address}
              </p>
            </div>
          </div>

          {/* Renter Info */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  className="bg-blue-500 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-800 font-medium text-sm">
                    {renter.name}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <CalendarOutlined />
                    <span>{formatDate(rentStartDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="text"
              size="small"
              onClick={handleViewDetails}
              className="text-blue-500 hover:bg-blue-50"
              icon={<EyeOutlined />}
            >
              Chi tiết
            </Button>

            {conversationId && (
              <Button
                type="text"
                size="small"
                onClick={handleContact}
                className="text-green-500 hover:bg-green-50"
                icon={<MessageOutlined />}
              >
                Liên hệ
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

RentedPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderId: PropTypes.string,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string,
    conversationId: PropTypes.string,
    renter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    rentStartDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default RentedPostCard;