import config from "./_apiConfig/apiConfig";
import { performRequest, apiEndPoints, methodType } from "./_apiConfig";

export const getProductsList = (data = {}) => {
  return performRequest(
    methodType.GET,
    config.baseURL + apiEndPoints.getProducts,
    data,
    false,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getProductData = (id) => {
  return performRequest(
    methodType.GET,
    config.baseURL + apiEndPoints.getProducts + id,
    {},
    false,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};