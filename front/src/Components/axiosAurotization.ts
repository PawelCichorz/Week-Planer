import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3031", // Adres twojego backendu
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
