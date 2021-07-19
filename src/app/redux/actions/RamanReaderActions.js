import axios from "axios";
import { url } from "../../Constants";
export const GET_RAMANREADER_CODES = "GET_RAMANREADER_CODES";
export const DELETE_RAMANREADER_CODE = "DELETE_RAMANREADER_CODE";
export const RAMANREADER_CODE_LOADING = "RAMANREADER_CODE_LOADING";
export const UPLOAD_RAMANREADER = "UPLOAD_RAMANREADER";

export const getRamanreaderCodesList = (searchToken = "", page = 1, size = 10, order = "desc", sortBy = "createdAt") => (dispatch) => {
  dispatch({
    type: RAMANREADER_CODE_LOADING
  });
  const token = localStorage.getItem("jwt_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  };
  axios
    .get(url + "/raman?token=" + searchToken + "&page=" + page + "&size=" + size + "&sortBy=" + sortBy + "&order=" + order, {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: GET_RAMANREADER_CODES,
        payload: res.data
      });
    });
};
export const deleteRamanreadercode = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RAMANREADER_CODE,
      message: null,
      severity: null
    });
    const token = localStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    axios
      .delete(url + "/raman/" + id, {
        headers: headers
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_RAMANREADER_CODE,
            message: res.data.message,
            severity: "success"
          });
        } else {
          dispatch({
            type: DELETE_RAMANREADER_CODE,
            message: res.data.message,
            severity: "error"
          });
        }
      });
  };
};

export const uploadRamanreadercodes = (formData) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + token
    };
    axios
      .post(url + "/raman/upload", formData, {
        headers: headers
      })
      .then((res) => {
        dispatch({
          type: UPLOAD_RAMANREADER,
          message: res.data.message,
          severity: res.status === 200 ? "success" : "error"
        });
      })
      .catch((err) => {
        if (err.response)
          dispatch({
            type: UPLOAD_RAMANREADER,
            message: err.response.data.message,
            severity: "error"
          });
      });
  };
};
