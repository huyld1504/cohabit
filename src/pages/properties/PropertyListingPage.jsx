import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Pagination, Select, Button, Row, Col } from 'antd';
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import HeroBanner from '../../components/common/HeroBanner';
import FilterSidebar from '../../components/properties/FilterSidebar';
import FilterDrawer from '../../components/properties/FilterDrawer';
import PropertyGrid from '../../components/properties/PropertyGrid';
import { bannerExe } from '../../assets';
import { interiorBedroom } from '../../assets';
import { postApi } from '../../api/post.api';

const { Content } = Layout;
const { Option } = Select;

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({});
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  // Load posts on mount and when filters change
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        currentPage: currentPage,
        pageSize: pageSize,
        ...filters
      };

      const response = await postApi.getPosts(params);
      console.log(response);

      if (response.success && response.data) {
        const { items, totalCount, currentPage: responseCurrentPage } = response.data;
        const mappedProperties = items.map(post => ({
          id: post.postId,
          title: post.title,
          description: post.description, // Keep HTML content as is
          price: post.price,
          location: post.address,
          image: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : interiorBedroom,
          rating: post.averageRating || 0,
          reviewCount: 0, // TODO: Add review count if available
          isLiked: false // TODO: Add like status from user preferences
        }));

        setProperties(mappedProperties);
        setTotalCount(totalCount);

        // Sync currentPage with response from BE
        if (responseCurrentPage && responseCurrentPage !== currentPage) {
          setCurrentPage(responseCurrentPage);
        }
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to empty array if API fails
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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

  return (
    <Layout className="min-h-screen bg-gray-50 overflow-x-hidden">
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
                    Tìm thấy {totalCount} kết quả
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
                  <div className="flex gap-2">
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
              properties={properties}
              loading={loading}
              onLike={handleLike}
              onViewDetails={handleViewDetails}
            />

            {/* Pagination */}
            {properties.length > 0 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={totalCount}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper={true}
                  showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} phòng trọ`}
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
