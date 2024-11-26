import axios from "axios";

const backendUrl = import.meta.env.PROD
  ? "http://localhost:3000" // Produção (host local)
  : "http://backend:3000";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default api;
