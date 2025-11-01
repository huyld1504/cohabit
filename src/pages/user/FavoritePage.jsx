import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { profileApi } from '../../api/profile.api';
import PropertyGrid from '../../components/properties/PropertyGrid';
import { interiorBedroom } from '../../assets';

const { Content } = Layout;

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load favorite posts on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const response = await profileApi.getFavoritePosts();

        if (response.success && response.data) {
          // Map API response to PropertyCard format
          const mappedFavorites = response.data.map(post => ({
            id: post.postId,
            title: post.title,
            description: post.description,
            price: post.price,
            location: post.address,
            image: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : interiorBedroom,
            rating: post.averageRating || 0,
            reviewCount: 0,
            isLiked: true // All favorites are liked by definition
          }));

          setFavorites(mappedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorite posts:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleLike = (propertyId) => {
    // Toggle like status locally
    setFavorites(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, isLiked: !property.isLiked }
          : property
      )
    );
    // TODO: Call API to remove from favorites
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-1">
            Danh sách yêu thích
          </h2>
          <p className="text-gray-600">
            {loading ? 'Đang tải...' : `Bạn có ${favorites.length} phòng trọ yêu thích`}
          </p>
        </div>

        {/* Favorites Grid */}
        <PropertyGrid
          properties={favorites}
          loading={loading}
          onLike={handleLike}
        />
      </Content>
    </Layout>
  );
};

export default FavoritePage;