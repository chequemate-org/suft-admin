import requests from './httpService';
import axios from 'axios';

const CouponServices = {
  getAllCoupons: async () => {
    const response = await axios.get('https://suft-90bec7a20f24.herokuapp.com/coupon/admin-all-coupons');
    return response.data;
  },
  // searchCoupons: (categoryCoupon) => {
  //   return axios.post(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupon?search=${searchTerm}`, categoryCoupon);
  // },
    // searchCoupons: async (searchQuery) => {
    //   try {
    //     const response = await axios.post(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupon?search=${searchTerm}`, {
    //       params: { q: searchQuery },
    //     });
    //     return response.data;
    //   } catch (error) {
    //     console.error("Error fetching coupons", error);
    //     throw error;
    //   }
    // },
    searchCategory: async (searchTerm) => {
      try {
          console.log(`Searching for coupons with term: ${searchTerm}`);
          const response = await axios.post(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupon?search=${searchTerm}`);
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
  
  // searchCoupons: async (searchTerm) => {
  //   const response = await axios.post(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-filter/coupon?search=${searchTerm}`);
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
    // return requests.get(`/coupon/${id}`);
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
