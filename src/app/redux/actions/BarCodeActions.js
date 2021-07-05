import axios from "axios";
import { url } from "../../Constants";
export const GET_BAR_CODES = "GET_BAR_CODES";
export const DELETE_BAR_CODE = "DELETE_BAR_CODE";
export const BAR_CODE_LOADING = "BAR_CODE_LOADING";
export const UPLOAD_BARCODE = "UPLOAD_BARCODE";

export const getBarCodesList =
  (searchToken = "", page = 1, size = 10, order = "desc", sortBy = "createdAt") =>
  (dispatch) => {
    dispatch({
      type: BAR_CODE_LOADING
    });
    const token = localStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    axios
      .get(url + "/barcode?token=" + searchToken + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&order=" + order, {
        headers: headers
      })
      .then((res) => {
        dispatch({
          type: GET_BAR_CODES,
          payload: res.data
        });
      });
  };
export const deleteBarcode = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BAR_CODE,
      message: null,
      severity: null
    });
    const token = localStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    axios
      .delete(url + "/barcode/" + id, {
        headers: headers
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: DELETE_BAR_CODE,
            message: res.data.message,
            severity: "success"
          });
        } else {
          dispatch({
            type: DELETE_BAR_CODE,
            message: res.data.message,
            severity: "error"
          });
        }
      });
  };
};

export const uploadBarcodes = (formData) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + token
    };
    axios
      .post(url + "/barcode/upload", formData, {
        headers: headers
      })
      .then((res) => {
        dispatch({
          type: UPLOAD_BARCODE,
          message: res.data.message,
          barcodeRes: res.data,
          severity: res.status == 200 ? "success" : "error"
        });
      })
      .catch((err) => {
        dispatch({
          type: UPLOAD_BARCODE,
          message: err.response.data.message,
          barcodeRes: err.response.data,
          severity: "error"
        });
      });
  };
};
