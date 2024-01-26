import axios from "axios";

axios.defaults.withCredentials = true;
const $api = axios.create({
  withCredentials: true,
  baseURL: "http://dushnila.gooddelo.com",
});

$api.interceptors.response.use((config) => {
  return config;
});

export default $api;
