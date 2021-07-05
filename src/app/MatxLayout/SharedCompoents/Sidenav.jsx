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
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const token = localStorage.getItem("jwt_token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (token) {
        const tokenParts = JSON.parse(atob(token.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp < now && tokenParts.exp + 900 > now) {
          return axios
            .post(url + "/accounts/refresh-token", {}, { headers: { Cookie: refreshToken } })
            .then((response) => {
              localStorage.setItem("jwt_token", response.data.jwtToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              originalRequest.headers["Authorization"] = "Bearer " + response.data.jwtToken;
              return axios(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const token = localStorage.getItem("jwt_token");
          if (token != null) {
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("refreshToken");
            alert("Your Session Has Expired, Please Login again");
            console.log("Refresh token is expired", tokenParts.exp, now);
          }
          window.location.href = "/login";
        }
      } else {
        const token = localStorage.getItem("jwt_token");
        if (token != null) {
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("refreshToken");
          alert("Your Session Has Expired, Please Login again");
        }
        console.log("Refresh token not available.");
        window.location.href = "/login";
      }
    }

    // specific error handling done elsewhere
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
    if (localStorage.getItem("loginRole") == null) {
      window.location.href = "/login";
    } else {
      if (localStorage.getItem("loginRole") == "SubAdmin") {
        mainNav = silverFactoryNavigations;
      } else {
        mainNav = navigations;
      }
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
