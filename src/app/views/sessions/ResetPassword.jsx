import React, { Component } from "react";

import {
  Button,
  FormControl,
  Link,
  Grid,
  Typography,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Snackbar,
  Card
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { resetPassword } from "../../redux/actions/LoginActions";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import history from "history.js";
import { APPNAME_PREFIX, APPNAME_SUFFIX } from "../../Constants";
import "../../KaushanScript.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: "13px", paddingBottom: "50px" }}>
      {"Copyright © Healthx Singapore, All rights reserved "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    flexGrow: 1
  }
});

class ResetPassword extends Component {
  state = {
    confirmPassword: "",
    password: "",
    showPassword: false,
    showConfirmPassword: false,
    openSnackBar: false,
    message: null,
    success: false,
    token: null,
    email: null
  };

  componentDidMount() {
    this.setState({
      token: localStorage.getItem("reset-password-token"),
      email: localStorage.getItem("reset-password-email")
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClickShowPassword = (event) => {
    event.persist();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleClickShowConfirmPassword = (event) => {
    event.persist();
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.login.resetSuccess !== null) {
      if (nextProp.login.resetSuccess === true && this.state.password === this.state.confirmPassword) {
        localStorage.removeItem("reset-password-token");
        localStorage.removeItem("reset-password-email");
        history.push({
          pathname: "/login"
        });
      } else {
        this.setState({
          openSnackBar: true,
          message: nextProp.login.message,
          success: nextProp.login.resetSuccess
        });
      }
    }
  }

  handleFormSubmit = (event) => {
    this.props.resetPassword({
      email: this.state.email,
      token: this.state.token,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSnackBar: false,
      message: null,
      success: false
    });
  };

  render() {
    let { confirmPassword, password, showPassword, showConfirmPassword, success, openSnackBar, message } = this.state;
    let { classes } = this.props;
    let severity = success ? "success" : "error";
    return (
      <div className={classes.paper}>
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 1px 2.94px 0.06px rgba(4,26,55,0.16)",
            width: 450
          }}
        >
          <Typography style={{ textAlign: "center" }} component="h2" variant="h6">
            <span className="brandnameDarkPrefix">{APPNAME_PREFIX}</span>
            <span className="brandnameSuffix">{APPNAME_SUFFIX}</span>
          </Typography>
          <br />
          <Typography style={{ textAlign: "center" }} component="h2" variant="h6">
            Reset Password
          </Typography>
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "1px"
            }}
          >
            <p>Please enter Strong password</p>
          </div>
          <ValidatorForm
            ref="form"
            style={{
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
            className={classes.form}
            onSubmit={this.handleFormSubmit}
          >
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <br />
            <br />
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password"> Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowConfirmPassword}
                      onMouseDown={this.handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Button type="submit" variant="contained" style={{ backgroundColor: "#112855", color: "#ffff" }} className={classes.submit} fullWidth>
              Continue
            </Button>
          </ValidatorForm>
          <Grid container>
            <Grid item xs>
              <p
                style={{
                  color: "#112855",
                  textAlign: "center"
                }}
              >
                Go back to SignIn page?
                <Link href="/login" variant="body2">
                  <span
                    style={{
                      color: "#005ce6",
                      textAlign: "center",
                      marginTop: "3px"
                    }}
                  >
                    {" "}
                    Sign In?
                  </span>
                </Link>
              </p>
            </Grid>
          </Grid>
          <div className="mb-16">
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid key="certis" item>
                    <img alt="Logo" src="/assets/images/certis-logo.png" height="25" width="100" />
                  </Grid>
                  <Grid key="healthx" item>
                    <img alt="Logo" src="/assets/images/HealthXLogo1x.png" height="25" width="100" />
                  </Grid>
                  {APPNAME_PREFIX === "Tracie" && (
                    <Grid key="silverfactory" item>
                      <img alt="Logo" src="/assets/images/silverfactory.jpeg" height="30" width="140" />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>

          <Copyright />
        </Card>

        {message && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={this.handleSnackBarClose}
          >
            <Alert onClose={this.handleSnackBarClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
  open: state.open
});
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { resetPassword })(ResetPassword)));
