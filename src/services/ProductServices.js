import requests from "./httpService";

const ProductServices = {
  getAllProducts: async ({ page, limit, category, title, price }) => {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";

    return requests.get(
      `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
    );
  },
  
  getProductById: async (id) => {
    
    // try {
    //   console.log("Fetching product with ID:", id);
    //   const response = await requests.get(`/product/single/${id}`);
    //   console.log("Single Product API response:", response.data);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching single product by ID:", error);
    //   throw error;
    // }
  },
  addProduct: async (body) => {
    return requests.post(`/product/admin/create/`, body);
  },
  addAllProducts: async (body) => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (uuid, body) => {
    return requests.put(`/product/admin/update/${uuid}`, body);
  },
  updateManyProducts: async (body) => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/product/admin/update/${id}`, body);
  },

  deleteProduct: async (uuid) => {
    return requests.delete(`/product/admin/delete/${uuid}`);
  },
  deleteManyProducts: async (body) => {
    return requests.patch("/products/delete/many", body);
  },
};

export default ProductServices;
