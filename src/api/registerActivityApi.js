import axiosClient from "./axiosClient";

const registerActivityApi = {
  getAll: () => {
    const url = `/api/view-register-activity`;
    return axiosClient.get(url);
  },
  getAllActivity: () => {
    const url = `/api/view-all-register-activity`;
    return axiosClient.get(url);
  },
  getActivityUser: () => {
    const url = `/api/view-user-activity`;
    return axiosClient.get(url);
  },

  getSatus: () => {
    const url = `/api/all-category`;
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/get-register-activity/${id}`;
    return axiosClient.get(url);
  },

  addActivity: (id) => {
    const url = `/api/add-register-activity/${id}`;
    return axiosClient.post(url);
  },

  updateStatus: (data) => {
    const url = `/api/update-register-activity`;
    return axiosClient.post(url, data);
  },
  addCategory: (data) => {
    const url = `/api/store-category`;
    return axiosClient.post(url, data);
  },
  Update: (id, data) => {
    const url = `/api/update-category/${id}`;
    return axiosClient.post(url, data);
  },
  Delete: (data) => {
    const url = `/api/delete-register-activity`;
    return axiosClient.post(url, data);
  },
};

export default registerActivityApi;
