import requests from "./httpService";

const CustomerServices = {
  getAllCustomers: async ({body}) => {
    return requests.get("/admin/users", body);
  },

  addAllCustomers: async (body) => {
    return requests.post("/customer/add/all", body);
  },
  // user create
  createCustomer: async (body) => {
    return requests.post(`/customer/create`, body);
  },

  filterCustomer: async (email) => {
    return requests.post(`/customer/filter/${email}`);
  },

  getCustomerById: async (id) => {
    return requests.get(`/admin/users/${id}`);
  },

  updateCustomer: async (id, body) => {
    return requests.put(`/admin/users-update/${id}`, body);
  },

  deleteCustomer: async (uuid) => {
    return requests.delete(`admin/users/delete/${uuid}`);
  },
};

export default CustomerServices;
