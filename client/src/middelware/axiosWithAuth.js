// axiosWithAuth.js

import axios from "axios";

const axiosWithAuth = () => {
  // Get the access token from cookie
  const accessToken = getCookieValue("_auth");

  // Create an instance of axios
  const instance = axios.create({
    baseURL: "http://localhost:5000", // Set your baseURL here
    // You can add other default configurations here
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      if (error.response.status === 401) {
        // Handle unauthorized errors, for example, redirect to login page
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosWithAuth;

function getCookieValue(name) {
  const nameString = name + "=";
  const value = document.cookie
    .split(";")
    .find((item) => item.trim().startsWith(nameString));

  if (!value) return null;

  return value.split("=")[1];
}
