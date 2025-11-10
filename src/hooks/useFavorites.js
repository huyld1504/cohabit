import { useState, useCallback } from 'react';
import { message } from 'antd';
import { profileApi } from '../api/profile.api';

export const useFavorites = () => {
  const [favoritesMap, setFavoritesMap] = useState(new Map());
  const [loading, setLoading] = useState(false);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (postId, currentStatus = null) => {
    try {
      setLoading(true);

      // If currentStatus is null, get from our map
      const isCurrentlyFavorited = currentStatus !== null ? currentStatus : favoritesMap.get(postId) || false;

      if (isCurrentlyFavorited) {
        // Remove from favorites
        await profileApi.removeFavoritePost(postId);
        setFavoritesMap(prev => {
          const newMap = new Map(prev);
          newMap.set(postId, false);
          return newMap;
        });
        message.success('Đã xóa khỏi danh sách yêu thích');
      } else {
        // Add to favorites
        await profileApi.addFavoritePost(postId);
        setFavoritesMap(prev => {
          const newMap = new Map(prev);
          newMap.set(postId, true);
          return newMap;
        });
        message.success('Đã thêm vào danh sách yêu thích');
      }

      return !isCurrentlyFavorited; // Return new status
    } catch (error) {
      message.error(error?.data);
      return null; // Indicate failure
    } finally {
      setLoading(false);
    }
  }, [favoritesMap]);

  // Check if a post is favorited
  const isFavorited = useCallback((postId) => {
    return favoritesMap.get(postId) || false;
  }, [favoritesMap]);

  // Set multiple favorites at once (useful when loading from API)
  const setFavorites = useCallback((favorites) => {
    const newMap = new Map();
    favorites.forEach(postId => {
      newMap.set(postId, true);
    });
    setFavoritesMap(newMap);
  }, []);

  // Set single favorite status
  const setFavoriteStatus = useCallback((postId, isFavorited) => {
    setFavoritesMap(prev => {
      const newMap = new Map(prev);
      newMap.set(postId, isFavorited);
      return newMap;
    });
  }, []);

  return {
    toggleFavorite,
    isFavorited,
    setFavorites,
    setFavoriteStatus,
    loading,
    favoritesMap
  };
};