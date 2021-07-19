import axios from "axios";
import { url } from "../../Constants";

export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const ADD_CUSTOMER_LOC = "ADD_CUSTOMER_LOC";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";

export const getCustomerList = (searchToken = "", page = 1, size = 10) => (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt_token")
  };
  axios
    .get(url + "/accounts/role/Customer?token=" + searchToken + "&page=" + page + "&size=" + size, {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: GET_CUSTOMER_LIST,
        payload: res.data
      });
    });
};

export const addCustomer = (payload) => (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt_token")
  };
  axios
    .post(url + "/accounts", payload, {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: ADD_CUSTOMER,
        message: res.status === 200 ? "Customer account created successfully" : res.data.message,
        severity: res.status === 200 ? "success" : "error"
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_CUSTOMER,
        message: err.response.data.message,
        severity: "error"
      });
    });
};

export const addCustomerLocation = (payload) => (dispatch) => {
  axios.post(url + "/customer/location", payload).then((res) => {
    dispatch({
      type: ADD_CUSTOMER_LOC,
      payload: res.data
    });
  });
};
