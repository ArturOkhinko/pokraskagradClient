import axios from "axios";
import { store } from "../store/store";
import { token } from "../store/reducers/accauntReducer";
import { API_URL } from "../values/value";

axios.defaults.withCredentials = true;
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    store.getState().accLog.user.accessToken
  }`;
  return config;
});

$api.interceptors.response.use(
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
        const response = await axios.get<RefreshResponce>(
          `${API_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        store.dispatch(token({ accessToken: response.data.accessToken }));
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default $api;
