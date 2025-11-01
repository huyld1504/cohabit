import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import { profileApi } from '../../api/profile.api';
import FavoriteCard from '../../components/properties/FavoriteCard';
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
        console.log(response);

        if (response.length > 0) {
          // Map API response to PropertyCard format
          const mappedFavorites = response.map(post => ({
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

  const handleRemoveFavorite = async (propertyId) => {
    try {
      // Call API to remove from favorites
      await profileApi.removeFavoritePost(propertyId);

      // Remove from local state
      setFavorites(prev => prev.filter(property => property.id !== propertyId));

      message.success('Đã xóa khỏi danh sách yêu thích');
    } catch (error) {
      console.error('Error removing favorite:', error);
      message.error('Không thể xóa khỏi danh sách yêu thích. Vui lòng thử lại!');
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Yêu thích
          </h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-3 w-1/2"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-300 rounded-lg w-24"></div>
                        <div className="h-8 bg-gray-300 rounded-lg w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Chưa có phòng trọ yêu thích
            </h3>
            <p className="text-gray-500">
              Hãy thêm các phòng trọ bạn quan tâm vào danh sách yêu thích
            </p>
          </div>
        ) : (
          /* Favorites List */
          <div className="grid grid-cols-1 gap-4">
            {favorites.map((property) => (
              <FavoriteCard
                key={property.id}
                id={property.id}
                title={property.title}
                description={property.description}
                location={property.location}
                image={property.image}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default FavoritePage;