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
  getAllStaff: async (param) => {
    return requests.get("/admin/all-staff", param);
  },
  getStaffById: async (uuid, body) => {
    // return requests.get(`/admin/staff/${uuid}`, body);
  },

  updateStaff: async (uuid, body) => {
    // return requests.put(`/admin/staff-update/${uuid}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/admin${id}`, body);
  },

  deleteStaff: async (uuid) => {
    return requests.delete(`admin/staff/delete/${uuid}`);
  },
};

export default AdminServices;
