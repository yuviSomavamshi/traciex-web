import localStorageService from "./localStorageService";
import { url } from "../Constants";
import axios from "axios";

class JwtAuthService {
  // Dummy user object just for the demo
  user = {
    userId: "1",
    role: "ADMIN",
    displayName: "Jason Alexander",
    email: "jasonalexander@gmail.com",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  };

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          url + "/accounts/authenticate",
          {
            email,
            password
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }
        )
        .then((res) => {
          if (res.status === 200) {
            resolve({
              ...res.data,
              userId: res.data.id,
              role: res.data.role,
              displayName: res.data.name,
              token: res.data.jwtToken,
              refreshToken: res.data.refreshToken,
              csrfToken: res.data.csrfToken
            });
          } else {
            reject(res.data);
          }
        })
        .catch((error) => {
          reject((error.response && error.response.data) || error);
        });
    }).then((data) => {
      // Login successful
      // Save token
      this.setSession(data.token, data.refreshToken, data.csrfToken);
      // Set user
      this.setUser(data);
      return data;
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then((data) => {
      // Token is valid
      //this.setSession(data.token);
      //this.setUser(data);
      return data;
    });
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token, refreshToken, csrfToken) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("csrfToken", csrfToken);
      axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("jwt_token");
          config.headers["Authorization"] = "Bearer " + token;
          const csrfToken = localStorage.getItem("csrfToken");
          config.headers["X-CSRF-Token"] =  csrfToken;
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
    } else {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("csrfToken")
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["X-CSRF-Token"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    this.user.token = user.token;
    localStorageService.setItem("auth_user", user);
    localStorage.setItem("loginRole", user.role);
  };
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("loginRole");
    localStorage.removeItem("auth_user");
  };
}

export default new JwtAuthService();
