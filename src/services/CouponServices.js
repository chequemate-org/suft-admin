import requests from './httpService';
import axios from 'axios';

const CouponServices = {
  getAllCoupons: async () => {
    const response = await axios.get('https://suft-90bec7a20f24.herokuapp.com/coupon/admin-all-coupons');
    return response.data;
  },
  submitCoupon: (categoryCoupon) => {
    return axios.post("https://suft-90bec7a20f24.herokuapp.com/category/admin-search", categoryCoupon);
  },
    // searchCoupons: async (searchQuery) => {
    //   try {
    //     const response = await axios.post("https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupon?search=sale", {
    //       params: { q: searchQuery },
    //     });
    //     return response.data;
    //   } catch (error) {
    //     console.error("Error fetching coupons", error);
    //     throw error;
    //   }
    // },
  // searchCoupons: async (searchTerm) => {
  //   const response = await axios.post(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupons?search=sale${searchTerm}`);
  //   return response.data;
  // },
  addCoupon: async (body) => {
    return requests.post('/coupon/admin-create', body);
  },
  addAllCoupon: async (body) => {
    return requests.post('/coupon/add/all', body);
  },
  getAllCoupons: async () => {
    return requests.get('/coupon/');
  },
  getCouponById: async (id) => {
    return requests.get(`/coupon/${id}`);
  },
  updateCoupon: async (id, body) => {
    return requests.put(`/coupon/${id}`, body);
  },
  updateManyCoupons: async (body) => {
    return requests.patch('/coupon/update/many', body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/coupon/status/${id}`, body);
  },
  deleteCoupon: async (id) => {
    return requests.delete(`/coupon/admin-delete/coupon/${id}`);
  },
  deleteManyCoupons: async (body) => {
    return requests.patch(`/coupon/delete/many`, body);
  },
};

export default CouponServices;
