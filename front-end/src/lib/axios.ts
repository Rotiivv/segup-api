import axios from "axios";

const serverApi = process.env.API ?? "http://localhost:8080";

export const api = axios.create({
  baseURL: serverApi,
});

export { serverApi };
