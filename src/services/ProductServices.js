import requests from "./httpService";

const ProductServices = {
  getAllProducts: async (params) => {
    try {
      // Debugging - log the request params
      console.log("Fetching products with params:", params);

      const response = await requests.get("/products", { params });

      // Debugging - log the API response
      console.log("Products API response:", response.data);

      return response.data;
    } catch (error) {
      // Debugging - log the error if any
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      console.log("Fetching product with ID:", id);
      const response = await requests.get(`/product/single/${id}`);
      console.log("Single Product API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching single product by ID:", error);
      throw error;
    }
  },
  addProduct: async (body) => {
    return requests.post("/products/add", body);
  },
  addAllProducts: async (body) => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (id, body) => {
    return requests.patch(`/products/${id}`, body);
  },
  updateManyProducts: async (body) => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct: async (id) => {
    return requests.delete(`/product/admin/delete/${id}`);
  },
  deleteManyProducts: async (body) => {
    return requests.patch("/products/delete/many", body);
  },
};

export default ProductServices;
