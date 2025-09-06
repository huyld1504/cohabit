import React from 'react';
import { Tabs } from 'antd';
import AmenitiesSection from './AmenitiesSection';
import ReviewsSection from '../detail/ReviewsSection';
import RentalTerms from '../detail/RentalTerms';

const PropertyTabs = ({ property }) => {
  const items = [
    {
      key: 'overview',
      label: 'Tổng quan',
      children: (
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Giới thiệu</h3>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Location Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Vị trí</h3>
            <p className="text-gray-700">
              <strong>Địa chỉ:</strong> {property.address}
            </p>
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Gần sân bay Tân Sơn Nhất, công viên Hoàng Văn Thụ.
                Thuận tiện di chuyển đến trung tâm thành phố.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'amenities',
      label: 'Tiện ích',
      children: <AmenitiesSection amenities={property.amenities} />,
    },
    {
      key: 'reviews',
      label: 'Đánh giá người thuê',
      children: (
        <ReviewsSection
          reviews={property.reviews}
          rating={property.rating}
          reviewCount={property.reviewCount}
        />
      ),
    },
    {
      key: 'terms',
      label: 'Điều khoản thuê trọ',
      children: <RentalTerms terms={property.rentalTerms} />,
    },
    {
      key: 'policies',
      label: 'Chính sách cọc & hủy thuê',
      children: (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Tiền cọc</h3>
            <p className="text-gray-700">
              Tiền cọc: 1 tháng tiền thuê (hoàn lại khi kết thúc hợp đồng nếu không có phá hỏng)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Thông báo trả phòng</h3>
            <p className="text-gray-700">
              Báo trước: 1 tháng (7 ngày)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Chính sách hủy</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Hoàn 100% nếu hủy trước khi duyện hài & không gây hư hỏng</li>
              <li>Chỉ 50% nếu hủy hợp đồng (dưới 7 ngày)</li>
              <li>Không hoàn nếu không báo trước</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Thanh toán trước cộng</h3>
            <p className="text-gray-700">
              Tiền điện/nước được tính vào ngày đầu tiên chỗ có thể tạo
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs
        defaultActiveKey="overview"
        items={items}
        className="property-tabs"
        size="large"
      />
    </div>
  );
};

export default PropertyTabs;
