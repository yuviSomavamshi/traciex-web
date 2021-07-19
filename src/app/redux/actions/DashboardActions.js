import axios from "axios";
import { url } from "../../Constants";

export const GET_DASHBOARD_LC = "GET_DASHBOARD_LC";
export const GET_DASHBOARD_CC = "GET_DASHBOARD_CC";
export const GET_DASHBOARD_TC = "GET_DASHBOARD_TC";
export const GET_DASHBOARD_AVG = "GET_DASHBOARD_AVG";
export const GET_DASHBOARD_STATS = "GET_DASHBOARD_STATS";
export const CHANGE_COLOR = "CHANGE_COLOR";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("jwt_token")
};
export const getLocationCount = () => (dispatch) => {
  axios
    .get(url + "/bc/dashboard/locations/count", {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_LC,
        payload: res.data
      });
    });
};

export const getCustomerCount = () => (dispatch) => {
  axios
    .get(url + "/bc/dashboard/customers/count", {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_CC,
        payload: res.data
      });
    });
};

export const getTestCount = (startDate, endDate) => (dispatch) => {
  axios
    .get(url + "/bc/dashboard/breathalyzer-test-stats?startDate=" + startDate.format("YYYY-MM-DD") + "&endDate=" + endDate.format("YYYY-MM-DD"), {
      headers: headers
    })
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_TC,
        payload: res.data
      });
    });
};

export const getUsageStats =
  (startDate, endDate, type = "customerId") =>
  (dispatch) => {
    if (startDate && endDate)
      axios
        .get(
          url +
            "/bc/dashboard/breathalyzer-usage-stats?startDate=" +
            startDate.format("YYYY-MM-DD") +
            "&endDate=" +
            endDate.format("YYYY-MM-DD") +
            "&type=" +
            type,
          {
            headers: headers
          }
        )
        .then((res) => {
          dispatch({
            type: GET_DASHBOARD_AVG,
            payload: res.data
          });
        });
  };

export function changeColor(checked) {
  let color = "";
  if (checked) {
    color = "#F45858";
  } else {
    color = "#336B87";
  }
  return (dispatch) => {
    dispatch({
      type: CHANGE_COLOR,
      color
    });
  };
}
