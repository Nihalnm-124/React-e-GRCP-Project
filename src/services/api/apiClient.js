import axios from "axios";

const apiClient = axios.create({

  baseURL:
    "https://jsonplaceholder.typicode.com",

  timeout: 10000,

  headers: {

    "Content-Type":
      "application/json",

    Accept:
      "application/json",

  },

});

apiClient.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

apiClient.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    if (
      error.response
    ) {

      switch (
        error.response.status
      ) {

        case 401:

          console.error(
            "Unauthorized"
          );

          break;

        case 403:

          console.error(
            "Forbidden"
          );

          break;

        case 404:

          console.error(
            "Not Found"
          );

          break;

        case 500:

          console.error(
            "Internal Server Error"
          );

          break;

        default:

          console.error(
            error.response.data
          );

      }

    } else if (
      error.request
    ) {

      console.error(
        "Network Error"
      );

    } else {

      console.error(
        error.message
      );

    }

    return Promise.reject(
      error
    );

  }

);

export default apiClient;