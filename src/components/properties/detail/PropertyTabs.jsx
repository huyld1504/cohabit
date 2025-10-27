import React from 'react';
import { Tabs } from 'antd';
import SafeHTMLRenderer from '../../common/SafeHTMLRenderer';

const PropertyTabs = ({ property }) => {
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
              <div className="text-gray-700 leading-relaxed">
                <SafeHTMLRenderer htmlContent={property.description} />
              </div>
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

  // Tình trạng & Nội thất tab - hiển thị condition và furnitures
  if (property.condition || (property.furnitures && property.furnitures.length > 0)) {
    items.push({
      key: 'condition',
      label: 'Tình trạng & Nội thất',
      children: (
        <div className="space-y-6">
          {/* Tình trạng phòng */}
          {property.condition && (
            <div>
              <h3 className="text-xl font-semibold mb-4">🏠 Tình trạng phòng</h3>
              <div className="text-gray-700 leading-relaxed">
                <SafeHTMLRenderer htmlContent={property.condition} />
              </div>
            </div>
          )}

          {/* Nội thất có sẵn */}
          {property.furnitures && property.furnitures.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">🛋️ Nội thất có sẵn</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.furnitures.map((furniture, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                      {furniture.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ),
    });
  }

  // Chính sách đặt cọc tab - hiển thị depositPolicy
  if (property.depositPolicy) {
    items.push({
      key: 'policies',
      label: 'Chính sách đặt cọc',
      children: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">💰 Chính sách đặt cọc</h3>
          <div className="text-gray-700 leading-relaxed">
            <SafeHTMLRenderer htmlContent={property.depositPolicy} />
          </div>
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
