import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/create-admin", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/admin/admin-login`, body);
  },

  forgetPassword: async (body) => {
    return requests.put("/admin/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/admin/reset-password", body);
  },

  signUpWithProvider: async (body) => {
    return requests.post("/admin/signup", body);
  },

  addStaff: async (body) => {
    return requests.post("/admin/create-user", body);
  },
  getAllStaff: async (body) => {
    return requests.get("/admin/users", body);
  },
  getStaffById: async (id, body) => {
    return requests.post(`/admin${id}`, body);
  },

  updateStaff: async (id, body) => {
    return requests.put(`/admin${id}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`/admin${id}`);
  },
};

export default AdminServices;
