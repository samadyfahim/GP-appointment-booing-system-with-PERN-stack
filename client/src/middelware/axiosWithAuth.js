// axiosWithAuth.js

import axios from "axios";

const axiosWithAuth = () => {
  const accessToken = getCookieValue("_auth");
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        //i need to redirect to sign out the user
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
