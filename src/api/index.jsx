import axios from "axios";

export const api = axios.create({
  baseURL: "https://reports.api.klaston.com/",
});
// "http://localhost:3000/",
