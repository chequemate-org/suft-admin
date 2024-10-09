import requests from "./httpService";
import axios from "axios";

const CategoryServices = {
  getAllCategory: async () => {
    return requests.get("/category");
  },

  // getAllCategories: async () => {
  //   return requests.get("/category/all");
  // },

  getCategoryById: async (id) => {
    return requests.get(`/category/${id}`);
  },

  addCategory: async (body) => {
    return requests.post("/category/admin-add", body);
  },

  addAllCategory: async (body) => {
    return requests.post("/category/add/all", body);
  },

  updateCategory: async (id, body) => {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory: async (uuid, body) => {
    return requests.delete(`/category/admin-delete/${uuid}`, body);
  },

  updateManyCategory: async (body) => {
    return requests.patch("/category/update/many", body);
  },
  searchCategory: async (searchTerm) => {
    try {
        console.log(`Searching for category with term: ${searchTerm}`);
        const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/category/admin-search?name=${searchTerm}`);
        return response.data;
      } catch (error) {
        console.error('Search API call failed:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        throw error;
    }
  },
  // submitCategory: (categoryData) => {
  //   return axios.get(`https://suft-90bec7a20f24.herokuapp.com/category/admin-search?name=${searchTerm}`, categoryData);
  // },

  deleteManyCategory: async (body) => {
    // return requests.patch("/category/delete/many", body);
  },
};

export default CategoryServices;
