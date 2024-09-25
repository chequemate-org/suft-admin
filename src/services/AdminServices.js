import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/register", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/admin/login`, body);
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
    return requests.post(`/admin/users/${id}`, body);
  },

  updateStaff: async (id, body) => {
    return requests.put(`/admin/users/${id}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin/update-status/${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`/admin/users/delete/${id}`);
  },
};

export default AdminServices;
