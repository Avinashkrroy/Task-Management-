import axios from "axios";
import type { RootState } from "../store";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false
});

export function attachAuthInterceptor(getState: () => RootState) {
  api.interceptors.request.use(config => {
    const token = getState().auth.token || localStorage.getItem("token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
}

export default api;
