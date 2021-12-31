import axiosClient from "./axiosClient";

const authApi = {
  postLogin: (data) => {
    const url = "/api/login";
    return axiosClient.post(url, data);
  },

  postLogout: () => {
    const url = `/api/logout`;
    return axiosClient.post(url);
  },

  getUser: () => {
    const url = `/api/get-user`;
    return axiosClient.get(url);
  },

  addUser: (data) => {
    const url = `/api/store-user`;
    return axiosClient.post(url, data);
  },

  getAll: () => {
    const url = `/api/view-users`;
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/edit-user/${id}`;
    return axiosClient.get(url);
  },
  Update: (id, data) => {
    const url = `/api/update-user/${id}`;
    return axiosClient.post(url, data);
  },
  Delete: (id) => {
    const url = `/api/delete-user/${id}`;
    return axiosClient.delete(url);
  },
};

export default authApi;
