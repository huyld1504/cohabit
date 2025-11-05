import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Space } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ImageGallery from '../../components/properties/detail/ImageGallery';
import PropertyTabs from '../../components/properties/detail/PropertyTabs';
import BookingSection from '../../components/properties/detail/BookingSection';
import { interiorBedroom } from '../../assets';
import { postApi } from '../../api/post.api';
import { profileApi } from '../../api/profile.api';
import { useFavorites } from '../../hooks/useFavorites';

const { Content } = Layout;

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorited, setFavoriteStatus } = useFavorites();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPropertyDetail = async () => {
      try {
        setLoading(true);
        const response = await postApi.getPostDetail(id);

        if (response.success && response.data) {
          const apiData = response.data;

          // Map API response to component format
          const mappedProperty = {
            id: apiData.postId,
            title: apiData.title,
            address: apiData.address,
            price: apiData.price,
            rating: apiData.averageRating || 0,
            images: apiData.imageUrl && apiData.imageUrl.length > 0
              ? apiData.imageUrl.slice(0, 5) // Max 5 images
              : [interiorBedroom],

            // HTML content from API
            description: apiData.description,
            condition: apiData.condition,
            depositPolicy: apiData.depositPolicy,

            // User info
            user: apiData.user,

            // Furnitures array
            furnitures: apiData.furnitures || []
          };

          setProperty(mappedProperty);
        }
      } catch (error) {
        console.error('Error loading property detail:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadFavoriteStatus = async () => {
      try {
        const favoriteResponse = await profileApi.getFavoritePosts();
        if (favoriteResponse && favoriteResponse.length > 0) {
          const isFav = favoriteResponse.some(post => post.postId === id);
          setFavoriteStatus(id, isFav);
        }
      } catch (error) {
        console.error('❌ Error loading favorite status:', error);
      }
    };

    if (id) {
      loadPropertyDetail();
      loadFavoriteStatus();
    }
  }, [id, setFavoriteStatus]);

  const handleLikeToggle = async () => {
    const newStatus = await toggleFavorite(id);
    console.log('🔄 Favorite toggled for property:', id, 'New status:', newStatus);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Property not found</div>;
  }

  return (
    <Layout className="min-h-screen bg-white">
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {property.title}
              </h1>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">{property.address}</p>
              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <span className="text-yellow-500">★ {property.rating}/5</span>
              </div>
            </div>
            <Button
              type="text"
              icon={isFavorited(id) ? <HeartFilled className="!text-red-500" /> : <HeartOutlined className='!text-red-500' />}
              onClick={handleLikeToggle}
              className="text-lg self-start sm:self-auto hover:bg-red-50 rounded-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <Row gutter={[16, 24]} className="w-full">
          {/* Left Column - Images and Details */}
          <Col xs={24} lg={16} className="w-full">
            <Space direction="vertical" size="large" className="w-full">
              {/* Image Gallery */}
              <div className="w-full overflow-hidden">
                <ImageGallery images={property.images} />
              </div>

              {/* Property Information Tabs */}
              <div className="w-full">
                <PropertyTabs property={property} />
              </div>
            </Space>
          </Col>

          {/* Right Column - Booking Section */}
          <Col xs={24} lg={8} className="w-full">
            <div className="lg:sticky lg:top-6 mt-6 lg:mt-0">
              <BookingSection property={property} />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PropertyDetailPage;
