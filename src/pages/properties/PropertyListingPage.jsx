import React, { useState, useEffect } from 'react';
import { Layout, Pagination, Select, Button, Row, Col } from 'antd';
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import HeroBanner from '../../components/common/HeroBanner';
import FilterSidebar from '../../components/properties/FilterSidebar';
import FilterDrawer from '../../components/properties/FilterDrawer';
import PropertyGrid from '../../components/properties/PropertyGrid';
import { bannerExe } from '../../assets';
import { interiorBedroom } from '../../assets';

const { Content } = Layout;
const { Option } = Select;

// Mock data cho properties
const mockProperties = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: 1200000,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: null,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: true
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: 1200000,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: null,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: 1200000,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 6,
    title: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    description: 'Lorem ipsum dolor sit amet consectetur. Quis tristique ultrices nunc pharetra.',
    price: 1000000,
    originalPrice: null,
    location: 'Lorem ipsum dolor sit amet',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 7,
    title: 'Phòng trọ cao cấp gần trung tâm thành phố',
    description: 'Phòng trọ được thiết kế hiện đại, đầy đủ tiện nghi.',
    price: 1500000,
    originalPrice: 1800000,
    location: 'Quận 1, TP.HCM',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 8,
    title: 'Homestay ấm cúng cho sinh viên',
    description: 'Không gian sống thân thiện, an toàn cho sinh viên.',
    price: 800000,
    originalPrice: null,
    location: 'Quận Thủ Đức, TP.HCM',
    image: interiorBedroom,
    isLiked: true
  },
  {
    id: 9,
    title: 'Phòng trọ mini tiện nghi đầy đủ',
    description: 'Phòng nhỏ gọn nhưng đầy đủ tiện nghi cần thiết.',
    price: 1200000,
    originalPrice: 1400000,
    location: 'Quận 3, TP.HCM',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 10,
    title: 'Chung cư mini cao cấp',
    description: 'Chung cư mini với đầy đủ tiện ích hiện đại.',
    price: 2000000,
    originalPrice: null,
    location: 'Quận 7, TP.HCM',
    image: interiorBedroom,
    isLiked: false
  },
  {
    id: 11,
    title: 'Phòng trọ giá rẻ gần trường đại học',
    description: 'Vị trí thuận tiện, gần các trường đại học lớn.',
    price: 700000,
    originalPrice: 900000,
    location: 'Quận Bình Thạnh, TP.HCM',
    image: interiorBedroom,
    isLiked: true
  },
  {
    id: 12,
    title: 'Studio apartment hiện đại',
    description: 'Studio được thiết kế thông minh, tối ưu không gian.',
    price: 1800000,
    originalPrice: null,
    location: 'Quận 2, TP.HCM',
    image: interiorBedroom,
    isLiked: false
  }
];

const PropertyListingPage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({});
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleLike = (propertyId) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, isLiked: !property.isLiked }
          : property
      )
    );
  };

  const handleViewDetails = (propertyId) => {
    console.log('View details for property:', propertyId);
    // Navigate to property details page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProperties = properties.slice(startIndex, endIndex);

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner backgroundImage={bannerExe} />

      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row gutter={[24, 24]}>
          {/* Filter Sidebar - Desktop Only */}
          <Col xs={0} lg={6}>
            <div className="hidden lg:block">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18}>
            {/* Header với sorting và view options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-1">
                    Danh mục nhà trọ
                  </h2>
                  <p className="text-gray-600">
                    Tìm thấy {properties.length} kết quả
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Filter Button - Only visible on mobile/tablet (hidden on lg and above) */}
                  <div className="block lg:hidden">
                    <Button
                      icon={<FilterOutlined />}
                      onClick={() => setFilterDrawerVisible(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                    >
                      Bộ lọc
                    </Button>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                    <Select
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-32"
                      size="small"
                    >
                      <Option value="newest">Mới nhất</Option>
                      <Option value="price-low">Giá thấp</Option>
                      <Option value="price-high">Giá cao</Option>
                      <Option value="popular">Phổ biến</Option>
                    </Select>
                  </div>

                  {/* View Mode */}
                  <div className="flex">
                    <Button
                      type={viewMode === 'grid' ? 'primary' : 'default'}
                      icon={<AppstoreOutlined />}
                      size="small"
                      onClick={() => setViewMode('grid')}
                    />
                    <Button
                      type={viewMode === 'list' ? 'primary' : 'default'}
                      icon={<BarsOutlined />}
                      size="small"
                      onClick={() => setViewMode('list')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <PropertyGrid
              properties={currentProperties}
              loading={loading}
              onLike={handleLike}
              onViewDetails={handleViewDetails}
            />

            {/* Pagination */}
            {properties.length > pageSize && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={properties.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper={false}
                  showTotal={false}
                  size="default"
                  className="simple-pagination"
                />
              </div>
            )}
          </Col>
        </Row>

        {/* Filter Drawer */}
        <FilterDrawer
          visible={filterDrawerVisible}
          onClose={() => setFilterDrawerVisible(false)}
          onFilterChange={handleFilterChange}
          placement="left"
          width={320}
        />
      </Content>
    </Layout>
  );
};

export default PropertyListingPage;
