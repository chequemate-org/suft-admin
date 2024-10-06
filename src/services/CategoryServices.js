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

  deleteCategory: async (id, body) => {
    return requests.delete(`/category/admin-delete/${id}`, body);
  },

  updateManyCategory: async (body) => {
    return requests.patch("/category/update/many", body);
  },
  submitCategory: (categoryData) => {
    return axios.get(`https://suft-90bec7a20f24.herokuapp.com/category/admin-search?name=${couponRef}`, categoryData);
  },

  deleteManyCategory: async (body) => {
    return requests.patch("/category/delete/many", body);
  },
};

export default CategoryServices;
