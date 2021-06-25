import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Icon, IconButton, MuiThemeProvider, Grid, MenuItem, Button, Link, Dialog, DialogTitle, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import { isMdScreen } from "utils";
import { MatxMenu } from "matx";
import { APPNAME_PREFIX } from "../../Constants";
import NotificationBar from "../SharedCompoents/NotificationBar";
import Layout1 from "./Layout1";
import { useState } from "react";
import Changepasswordpage from "./Changepasswordpage";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  topGrid: {
    flexGrow: 1
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185
  }
});

class Layout1Topbar extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handlePasswordSubmit = (e) => {
    e.preventDefault();
    this.setState({
      open: false
    });
  };

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    let authUser = JSON.parse(localStorage.getItem("auth_user"));

    let email = (authUser && authUser.email) || "";

    let { classes, theme, settings, className, style } = this.props;
    let { open } = this.state;
    const topbarTheme = settings.themes[settings.layout1Settings.topbar.theme] || theme;
    return (
      <>
          <div className="topbar">
            <div className={`topbar-hold ${className}`} style={Object.assign({}, { backgroundColor: topbarTheme.palette.primary.main }, style)}>
              <div className="flex flex-space-between flex-middle h-100">
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container spacing={0} style={{ justifyContent: "space-around" }}>
                      <Grid key="certis" item>
                        <img alt="Logo" src="/assets/images/certis-logo.png" height="30" />
                      </Grid>
                      <Grid key="healthx" item>
                        <img alt="Logo" src="/assets/images/HealthXLogo1x.png" height="35" />
                      </Grid>
                      <Grid key="silverfactory" item>
                        {APPNAME_PREFIX == "Tracie" && <img alt="Logo" src="/assets/images/silverfactory.jpeg" height="35" />}
                      </Grid>

                      <Grid key="menu" item>
                        <MatxMenu
                          menuButton={
                            <div className="d-flex flex-row  justify-content-between align-items-end ">
                              <span>
                                <strong>{email}</strong>
                              </span>
                              <div className="MuiAvatar-root-107 MuiAvatar-circle-109 cursor-pointer MuiAvatar-colorDefault-108">
                                <img
                                  className="mx-2 align-middle circular-image-small cursor-pointer"
                                  src="/assets/images/faces/sampleimg.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                          }
                        >
                          <MenuItem onClick={this.handleClickOpen}>
                            <Icon> lock </Icon>
                            <span className="pl-4"> Change Password </span>
                          </MenuItem>

                          <MenuItem onClick={this.handleSignOut} className={classes.menuItem}>
                            <Icon> power_settings_new </Icon>
                            <span className="pl-4"> Logout </span>
                          </MenuItem>
                        </MatxMenu>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div>
            <Dialog onClose={this.handleClose} open={open}>
              <div>
                <Changepasswordpage handleClose={this.handleClose} handlePasswordSubmit={this.handlePasswordSubmit} />
              </div>
            </Dialog>
          </div>
      </>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)));
