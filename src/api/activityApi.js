import axiosClient from "./axiosClient";

const activityApi = {
  getAll: () => {
    const url = `/api/view-activity`;
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/edit-activity/${id}`;
    return axiosClient.get(url);
  },
  addActivity: (data) => {
    const url = `/api/store-activity`;
    return axiosClient.post(url, data);
  },
  Update: (id, data) => {
    const url = `/api/update-activity/${id}`;
    return axiosClient.post(url, data);
  },
  Delete: (id) => {
    const url = `/api/delete-activity/${id}`;
    return axiosClient.delete(url);
  },
};

export default activityApi;
