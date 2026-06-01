import axios from "axios";

const serverApi = "http://localhost:8080";

export const api = axios.create({
  baseURL: serverApi,
});

export { serverApi };
