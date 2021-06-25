import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import axios from "axios";
import { url } from "../../Constants";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const RESETNEW_PASSWORD = "RESETNEW_PASSWORD";
export const RESETNEW_PASSWORD_ERROR = "RESETNEW_PASSWORD_ERROR";
export const OTPVERIFY_EMAIL = "OTPVERIFY_EMAIL";
export const OTPVERIFY_EMAIL_ERROR = "OTPVERIFY_EMAIL_ERROR";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

export function loginWithEmailAndPassword({ email, password }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        if (["Admin", "SubAdmin", "Customer"].includes(user.role)) {
          history.push({
            pathname: "/"
          });
          return dispatch({
            type: LOGIN_SUCCESS,
            loginRole: localStorage.getItem("loginRole")
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Unauthorized Access"
          });
        }
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error.message
        });
      });
  };
}

export function forgotPassword(body) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    axios
      .post(url + "/accounts/forgot-password", body)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function resetPassword(body) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    axios
      .post(url + "/accounts/reset-password", body)
      .then((res) => {
        dispatch({
          type: RESETNEW_PASSWORD,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: RESETNEW_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function changePassword(body) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    axios
      .post(url + "/accounts/change-password", body)
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function otpVerification(body) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    axios
      .post(url + "/accounts/validate-reset-token", body)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: OTPVERIFY_EMAIL,
            payload: res.data
          });
        } else {
          dispatch({
            type: OTPVERIFY_EMAIL_ERROR,
            payload: res.data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: OTPVERIFY_EMAIL_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function firebaseLoginEmailPassword({ email, password }) {
  return (dispatch) => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Yuvaraj K",
              email: "yuvarajsomavamshi@gmail.com",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user
            })
          );

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
