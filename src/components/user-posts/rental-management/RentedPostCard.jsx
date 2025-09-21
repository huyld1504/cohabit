import React from 'react';
import { Card, Avatar, Button, Tag, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RentedPostCard = ({ post }) => {
  const navigate = useNavigate();

  const {
    id,
    title,
    price,
    address,
    renter,
    rentStartDate,
    image
  } = post;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ/tháng';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <Card
      className="shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
      bodyStyle={{ padding: '24px' }}
    >
      <div className="flex gap-4">
        {/* Property Image */}
        <div className="flex-shrink-0">
          <div
            className="w-28 h-24 bg-gray-100 rounded-lg bg-cover bg-center border"
            style={{ backgroundImage: image ? `url(${image})` : 'none' }}
          >
            {!image && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Property Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-gray-800 font-semibold text-lg truncate">
                  🏠 {title}
                </h3>
                <Tag
                  color="success"
                  className="flex-shrink-0"
                  style={{
                    backgroundColor: '#f6ffed',
                    color: '#52c41a',
                    border: '1px solid #b7eb8f',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  Đã thuê
                </Tag>
              </div>
              <p className="text-blue-600 font-semibold text-base mb-1">
                Giá: {formatPrice(price)}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                📍 {address}
              </p>
            </div>
          </div>

          <Divider className="my-3" />

          {/* Renter Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="text-gray-800 font-medium text-sm mb-3 flex items-center gap-2">
              <UserOutlined className="text-blue-500" />
              Thông tin người thuê:
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  className="bg-blue-500 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-sm">
                    {renter.name}
                  </p>
                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                    <PhoneOutlined className="text-xs" />
                    {renter.phone}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  💬 "{renter.message}"
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CalendarOutlined />
                <span>Ngày thuê: {formatDate(rentStartDate)}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              type="link"
              onClick={() => navigate(`/user/posts/rented/${id}`)}
              className="text-blue-500 hover:text-blue-600 p-0 h-auto font-medium text-sm flex items-center gap-2"
              icon={<ArrowRightOutlined className="text-xs" />}
              iconPosition="end"
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

RentedPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string,
    renter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    rentStartDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default RentedPostCard;