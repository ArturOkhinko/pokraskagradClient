import axios from "axios";
import { store } from "../store/store";
import { token } from "../store/reducers/accauntReducer";
import $api from ".";
import { API_URL, API_URL_VK } from "../values/value";

axios.defaults.withCredentials = true;
const $apiVK = axios.create({
  withCredentials: true,
  baseURL: API_URL_VK,
});
$apiVK.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    store.getState().accLog.user.accessToken
  }`;
  return config;
});

$apiVK.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const response = await $api.get<RefreshResponce>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        store.dispatch(token({ accessToken: response.data.accessToken }));
        return $apiVK.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default $apiVK;
