import axios from "axios";

export const api = axios.create({
  baseURL: "https://daily-report-api-production.up.railway.app/",
});
