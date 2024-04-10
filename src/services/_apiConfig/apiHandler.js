import axios from "axios";
import AppConfig from "./apiConfig";
import { methodType } from "./apiEndPoints";

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const {
      response: { data },
      response,
    } = error;
    if (data) {
      return data;
    } else {
      return Promise.reject(error);
    }
  }
);

export const performRequest = async (method, url, data = {}, token = false, formData = false) => {
  url = url.replaceAll("#", "%23");
  const config = {
    method,
    url,
    baseURL: AppConfig.baseURL,
  };

  if (method === methodType.PUT || method === methodType.PATCH || method === methodType.POST || method === methodType.DELETE) {
    config.data = data;
  }

  if (method === methodType.GET) {
    config.params = data;
  }

  if (formData) {
    config.headers = {
      "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
    };
  } else {
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }

  config.headers["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return axios(config);
};
