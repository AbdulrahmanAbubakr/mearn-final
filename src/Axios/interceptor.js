import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.data.data.token);
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
