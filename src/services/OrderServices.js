// OrderServices.js
import requests from "./httpService";

const OrderServices = {
  getAllOrders: async ({
    body,
    headers,
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    method,
    startDate,
    endDate,
  }) => {
    const searchName = customerName !== null ? customerName : "";
    const searchStatus = status !== null ? status : "";
    const searchDay = day !== null ? day : "";
    const searchMethod = method !== null ? method : "";
    const startD = startDate !== null ? startDate : "";
    const endD = endDate !== null ? endDate : "";

    return requests.get(`admin/get-orders`, body, headers);
  },

  getAllOrdersTwo: async ({ invoice, body, headers }) => {
    const searchInvoice = invoice !== null ? invoice : "";
    return requests.get(`/admin/get-orders`, body, headers);
  },

  getOrderCustomer: async (id, body) => {
    return requests.get(`/admin/get-order/${id}`, body);
  },

  getOrderById: async (id, body) => {
    return requests.get(`/admin/get-order/${id}`, body);
  },

  updateOrder: async (uuid, body, headers) => {
    return requests.put(
      `/admin/get-order/action/${uuid}`,
      { action: body.status },
      headers
    );
  },

  deleteOrder: async (id) => {
    return requests.delete(`/admin/order/${id}`);
  },

  getDashboardOrdersData: async ({
    page = 1,
    limit = 8,
    endDate = "23:59",
  }) => {
    return requests.get(`/admin/order-total-status`);
  },

  getDashboardAmount: async () => {
    return requests.get("/admin/order-amount");
  },

  getDashboardCount: async () => {
    return requests.get("/admin/order-total-status");
  },

  getDashboardRecentOrder: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/admin/get-orders`);
  },

  getBestSellerProductChart: async () => {
    return requests.get("/admin/get-orders");
  },
};

export default OrderServices;
