import React, { Component, Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { navigations, silverFactoryNavigations } from "../../navigations";
import { MatxVerticalNav } from "matx";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import axios from "axios";
import { url } from "../../Constants";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response && error.response.status === 401 && originalRequest.url === url + "/accounts/refresh-token") {
      alert("Your Session Has Expired, Please Login again");
      console.log("Refresh token not available.");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        const refreshToken = localStorage.getItem("refreshToken");
        const csrfToken = localStorage.getItem("csrfToken");
        return axios
          .post(
            url + "/accounts/refresh-token",
            {
              refreshToken
            },
            {
              withCredentials: true,
              headers: {
                "X-CSRF-Token": csrfToken
              }
            }
          )
          .then((response) => {
            localStorage.setItem("jwt_token", response.data.jwtToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("csrfToken", response.data.csrfToken);
            originalRequest.headers["Authorization"] = "Bearer " + response.data.jwtToken;
            originalRequest.headers["Cookie"] = "refreshToken=" + response.data.refreshToken;
            originalRequest.headers["X-CSRF-Token"] = response.data.csrfToken;
            return axios(originalRequest);
          });
      } else {
        const token = localStorage.getItem("jwt_token");
        if (token != null) {
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("refreshToken");
        }
        alert("Your Session Has Expired, Please Login again");
        console.log("Refresh token not available.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

class Sidenav extends Component {
  state = {};

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  renderOverlay = () => <div onClick={() => this.updateSidebarMode({ mode: "close" })} className="sidenav__overlay" />;
  render() {
    let mainNav = [];
    let role = localStorage.getItem("loginRole");
    switch (role) {
      case "Admin":
        mainNav = navigations;
        break;
      case "SubAdmin":
        mainNav = silverFactoryNavigations;
        break;
      default:
        window.location.href = "/login";
        return;
    }
    return (
      <Fragment>
        <Scrollbar option={{ suppressScrollX: true }} className="scrollable position-relative">
          {this.props.children}
          <MatxVerticalNav navigation={mainNav} />
        </Scrollbar>
        {this.renderOverlay()}
      </Fragment>
    );
  }
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
  loginRole: state.login.loginRole
});
export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings
  })(Sidenav)
);
