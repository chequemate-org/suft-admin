import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/create-admin", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/admin/admin-login`, body);
  },

  forgetPassword: async ({email : verifyEmail}) => {
    return requests.post("/admin/admin-forgot-password", ({email : verifyEmail}));
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
    return requests.get("/admin/all-staff", body);
  },
  getStaffById: async (uuid, body) => {
    return requests.post(`/admin/staff/${uuid}`, body);
  },

  updateStaff: async (uuid, body) => {
    return requests.put(`/admin/staff-update/${uuid}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`admin/users/delete/${id}`);
  },
};

export default AdminServices;
