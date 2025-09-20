import React from 'react';
import { Tabs, Alert } from 'antd';
import AmenitiesSection from './AmenitiesSection';
import ReviewsSection from '../detail/ReviewsSection';
import RentalTerms from '../detail/RentalTerms';
import SafeHTMLRenderer from '../../common/SafeHTMLRenderer';

const PropertyTabs = ({ property }) => {
  // Destructure content từ property object
  const {
    amenitiesContent,
    rentalTermsContent,
    policiesContent
  } = property;

  const items = [];

  // Tổng quan tab - luôn hiển thị nếu có description hoặc address
  if (property.description || property.address) {
    items.push({
      key: 'overview',
      label: 'Tổng quan',
      children: (
        <div className="space-y-6">
          {/* Description */}
          {property.description && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Giới thiệu</h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* Location Info */}
          {property.address && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Vị trí</h3>
              <p className="text-gray-700">
                <strong>Địa chỉ:</strong> {property.address}
              </p>
            </div>
          )}
        </div>
      ),
    });
  }

  // Tiện ích tab - chỉ hiển thị nếu có amenitiesContent hoặc amenities
  if (amenitiesContent || (property.amenities && property.amenities.length > 0)) {
    items.push({
      key: 'amenities',
      label: 'Tiện ích',
      children: (
        <AmenitiesSection
          amenities={property.amenities}
          amenitiesContent={amenitiesContent}
        />
      ),
    });
  }

  // Reviews tab - chỉ hiển thị nếu có reviews
  if (property.reviews && property.reviews.length > 0) {
    items.push({
      key: 'reviews',
      label: 'Đánh giá người thuê',
      children: (
        <ReviewsSection
          reviews={property.reviews}
          rating={property.rating}
          reviewCount={property.reviewCount}
        />
      ),
    });
  }

  // Terms tab - chỉ hiển thị nếu có rentalTermsContent hoặc terms
  if (rentalTermsContent || property.rentalTerms) {
    items.push({
      key: 'terms',
      label: 'Điều khoản thuê trọ',
      children: (
        <RentalTerms
          terms={property.rentalTerms}
          rentalTermsContent={rentalTermsContent}
        />
      ),
    });
  }

  // Policies tab - chỉ hiển thị nếu có policiesContent
  if (policiesContent) {
    items.push({
      key: 'policies',
      label: 'Chính sách cọc & hủy thuê',
      children: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Chính sách cọc & hủy thuê</h3>
          <SafeHTMLRenderer
            htmlContent={policiesContent}
            className="policies-content"
          />
        </div>
      ),
    });
  }

  // Không hiển thị gì nếu không có tabs nào
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Tabs
        defaultActiveKey={items[0]?.key}
        items={items}
        className="w-full [&_.ant-tabs-nav]:mb-6 [&_.ant-tabs-nav]:overflow-x-auto [&_.ant-tabs-nav]:overflow-y-hidden [&_.ant-tabs-nav]:whitespace-nowrap [&_.ant-tabs-nav]:border-b [&_.ant-tabs-nav]:border-gray-200 [&_.ant-tabs-tab]:px-3 [&_.ant-tabs-tab]:py-2 [&_.ant-tabs-tab]:font-medium [&_.ant-tabs-tab]:text-sm [&_.ant-tabs-tab]:flex-shrink-0 [&_.ant-tabs-tab-active]:text-blue-500 [&_.ant-tabs-content-holder]:overflow-visible sm:[&_.ant-tabs-tab]:px-4 sm:[&_.ant-tabs-tab]:py-3"
        size="large"
        tabPosition="top"
        type="line"
        tabBarGutter={16}
        animated={{ inkBar: true, tabPane: false }}
      />
    </div>
  );
};

export default PropertyTabs;
