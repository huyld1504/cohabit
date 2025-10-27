import React from 'react';
import { Row, Col } from 'antd';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({
  properties = [],
  loading = false,
  onLike,
  onViewDetails
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-48 w-full rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Không tìm thấy phòng trọ
        </h3>
        <p className="text-gray-500">
          Hãy thử điều chỉnh bộ lọc để tìm kiếm phòng trọ phù hợp
        </p>
      </div>
    );
  }

  return (
    <div className="property-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="property-grid-item">
          <PropertyCard
            {...property}
            onLike={onLike}
            onViewDetails={onViewDetails}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
