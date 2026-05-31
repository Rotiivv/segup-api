import axios from "axios";

const serverApi = process.env.API;

export const api = axios.create({
  baseURL: serverApi,
});

export { serverApi };
