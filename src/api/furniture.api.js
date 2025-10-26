import { callAPI } from "./axios.instance";

const FURNITURE_API_ROUTES = {
  GET_ALL_FURNITURE: '/Furniture',
  GET_FURNITURE_BY_ID: (id) => `/Furniture/${id}`,
  CREATE_FURNITURE: '/Furniture',
  UPDATE_FURNITURE: (id) => `/Furniture/${id}`,
  DELETE_FURNITURE: (id) => `/Furniture/${id}`
};

export const furnitureApi = {
  // Get all furniture items (includes both amenities and furniture from BE)
  getAllFurniture: async (params = {}) => {
    return callAPI('GET', FURNITURE_API_ROUTES.GET_ALL_FURNITURE, params);
  },

  // Alias for backward compatibility
  getFurniture: async (params = {}) => {
    return furnitureApi.getAllFurniture(params);
  },

  // Get furniture by ID
  getFurnitureById: async (id) => {
    return callAPI('GET', FURNITURE_API_ROUTES.GET_FURNITURE_BY_ID(id));
  },

  // Create new furniture item (for admin)
  createFurniture: async (furnitureData) => {
    return callAPI('POST', FURNITURE_API_ROUTES.CREATE_FURNITURE, furnitureData);
  },

  // Update furniture item (for admin)
  updateFurniture: async (id, furnitureData) => {
    return callAPI('PUT', FURNITURE_API_ROUTES.UPDATE_FURNITURE(id), furnitureData);
  },

  // Delete furniture item (for admin)
  deleteFurniture: async (id) => {
    return callAPI('DELETE', FURNITURE_API_ROUTES.DELETE_FURNITURE(id));
  }
};