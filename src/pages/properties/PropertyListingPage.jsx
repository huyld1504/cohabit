import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Pagination, Select, Button, Row, Col } from 'antd';
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../../components/common/HeroBanner';
import FilterSidebar from '../../components/properties/FilterSidebar';
import FilterDrawer from '../../components/properties/FilterDrawer';
import PropertyGrid from '../../components/properties/PropertyGrid';
import UpgradePrompt from '../../components/common/UpgradePrompt';
import { bannerExe } from '../../assets';
import { interiorBedroom } from '../../assets';
import { postApi } from '../../api/post.api';
import { profileApi } from '../../api/profile.api';
import { useRole } from '../../hooks/useRole';
import { useFavorites } from '../../hooks/useFavorites';
import { USER_ROLES } from '../../constants/roles.constant';

const { Content } = Layout;
const { Option } = Select;

const PropertyListingPage = () => {
  const { hasRole } = useRole();
  const { toggleFavorite, isFavorited, setFavorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize states from URL search params
  const getInitialFilters = () => {
    const filters = {};
    const address = searchParams.get('address');
    const maxPrice = searchParams.get('maxPrice');
    const averageRating = searchParams.get('averageRating');

    if (address) filters.address = address;
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    if (averageRating) filters.averageRating = parseInt(averageRating);

    return filters;
  };

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(getInitialFilters());
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Check if user has filters applied
  const hasActiveFilters = Object.keys(filters).length > 0;

  // Check if user can use search/filter feature
  const canUseSearch = hasRole([USER_ROLES.PRO_MEMBER, USER_ROLES.PLUS_MEMBER, USER_ROLES.ADMIN]);

  // Load posts on mount and when filters change
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);

      // If user has active filters but is not premium, show upgrade prompt
      if (hasActiveFilters && !canUseSearch) {
        setShowUpgradePrompt(true);
        setLoading(false);
        return;
      }

      // Hide upgrade prompt if shown before
      setShowUpgradePrompt(false);

      let response;

      // Use search API only if user has filters and is premium
      if (hasActiveFilters && canUseSearch) {
        const params = {
          currentPage: currentPage,
          pageSize: pageSize,
          ...filters
        };

        console.log('═══════════════════════════════════════');
        console.log('🚀 [PREMIUM] Loading Posts with Search API:');
        console.log('  • Current Page:', params.currentPage);
        console.log('  • Page Size:', params.pageSize);
        console.log('  • Filters:', filters);
        console.log('═══════════════════════════════════════');

        response = await postApi.searchPost(params);
      } else {
        // Use get all posts API for basic users or when no filters
        const params = {
          currentPage: currentPage,
          pageSize: pageSize
        };

        console.log('═══════════════════════════════════════');
        console.log('🚀 [BASIC] Loading All Posts:');
        console.log('  • Current Page:', params.currentPage);
        console.log('  • Page Size:', params.pageSize);
        console.log('  • Using GET all posts API (no filters)');
        console.log('═══════════════════════════════════════');

        response = await postApi.getPosts(params);
      }

      console.log('📦 API Response received:', response);
      console.log('═══════════════════════════════════════');

      if (response.success && response.data) {
        const { items, totalCount, currentPage: responseCurrentPage } = response.data;
        const mappedProperties = items.map(post => ({
          id: post.postId,
          title: post.title,
          description: post.description,
          price: post.price,
          location: post.address,
          image: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : interiorBedroom,
          rating: post.averageRating || 0,
          reviewCount: 0,
          isLiked: isFavorited(post.postId)
        }));

        setProperties(mappedProperties);
        setTotalCount(totalCount);

        if (responseCurrentPage && responseCurrentPage !== currentPage) {
          setCurrentPage(responseCurrentPage);
        }
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters, hasActiveFilters, canUseSearch, isFavorited]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Load user's favorite posts when component mounts
  useEffect(() => {
    const loadUserFavorites = async () => {
      try {
        const favoriteResponse = await profileApi.getFavoritePosts();
        if (favoriteResponse && favoriteResponse.length > 0) {
          const favoritePostIds = favoriteResponse.map(post => post.postId);
          setFavorites(favoritePostIds);
        }
      } catch (error) {
        console.error('❌ Error loading user favorites:', error);
        // Don't show error to user - favorites are not critical
      }
    };

    loadUserFavorites();
  }, [setFavorites]);

  const handleFilterChange = (newFilters) => {
    console.log('📥 PropertyListingPage received new filters:', newFilters);

    // Check if basic user is trying to use filters
    if (Object.keys(newFilters).length > 0 && !canUseSearch) {
      setShowUpgradePrompt(true);
      setFilterDrawerVisible(false); // Close filter drawer
      return;
    }

    setFilters(newFilters);
    setCurrentPage(1);
    setShowUpgradePrompt(false);

    // Update URL search params
    const params = new URLSearchParams();
    params.set('page', '1');
    if (sortBy) params.set('sort', sortBy);
    if (newFilters.address) params.set('address', newFilters.address);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.averageRating) params.set('averageRating', newFilters.averageRating.toString());

    setSearchParams(params);
    console.log('🔄 Page reset to 1, will reload posts with new filters');
    console.log('📝 URL params updated:', params.toString());
  };

  const handleLike = async (propertyId) => {
    console.log('🔄 Toggling favorite for property:', propertyId);
    const newStatus = await toggleFavorite(propertyId);

    if (newStatus !== null) {
      // Update the local properties state
      setProperties(prev => prev.map(property =>
        property.id === propertyId
          ? { ...property, isLiked: newStatus }
          : property
      ));
    }
  };

  const handleViewDetails = (propertyId) => {
    console.log('View details for property:', propertyId);
    // Navigate to property details page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Update URL search params with new page
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (sortBy) params.set('sort', sortBy);
    if (filters.address) params.set('address', filters.address);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.averageRating) params.set('averageRating', filters.averageRating.toString());

    setSearchParams(params);
  };

  return (
    <Layout className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Banner */}
      <HeroBanner backgroundImage={bannerExe} />

      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row gutter={[32, 24]} style={{ marginLeft: 0, marginRight: 0 }}>
          {/* Filter Sidebar - Desktop Only */}
          <Col
            xs={0}
            lg={6}
            className="flex-shrink-0"
            style={{
              minWidth: '280px',
              maxWidth: '280px',
              width: '280px',
              paddingRight: '16px'
            }}
          >
            <div className="hidden lg:block">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18} style={{ flex: 1 }}>
            {/* Show Upgrade Prompt if basic user tries to use filters */}
            {showUpgradePrompt ? (
              <div className="mb-6">
                <UpgradePrompt
                  requiredRole={USER_ROLES.PLUS_MEMBER}
                  feature="Tính năng tìm kiếm và lọc nâng cao"
                />
              </div>
            ) : null}

            {/* Header với sorting và view options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 ml-5">
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
            <div className="ml-5">
              <PropertyGrid
                properties={properties}
                loading={loading}
                onLike={handleLike}
                onViewDetails={handleViewDetails}
              />
            </div>

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
