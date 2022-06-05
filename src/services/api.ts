import axios from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

privateApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("cmsToken");
  config.headers["authorization"] = `Bearer ${token}`;

  return config;
});
