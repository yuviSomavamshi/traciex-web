import React, { Component } from "react";
import OtpInput from "react-otp-input";
import { Button, FormControl, Link, Grid, Typography, Snackbar, Card } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import withRouter from "app/WithRouter";
import { otpVerification, forgotPassword } from "../../redux/actions/LoginActions";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
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
class Otppage extends Component {
  state = {
    token: "",
    openSnackBar: false,
    message: null,
    success: false,
    email: null
  };

  componentDidMount() {
    this.setState({
      email: localStorage.getItem("reset-password-email")
    });
  }

  onResend = () => {
    this.props.forgotPassword({
      email: this.state.email
    });
    this.setState({
      openSnackBar: true,
      token: "",
      message: "OTP has been sent to " + this.state.email + " address",
      success: true
    });
  };

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.login.otpSuccess != null) {
      if (nextProp.login.otpSuccess === true) {
        localStorage.setItem("reset-password-token", this.state.token);
        history.push({
          pathname: "/reset-password"
        });
      } else {
        this.setState({
          openSnackBar: true,
          message: nextProp.login.message,
          success: nextProp.login.otpSuccess
        });
      }
    }
  }

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

  handleChange = (token) => {
    this.setState({ token });
  };

  handleFormSubmit = (event) => {
    this.props.otpVerification({
      email: this.state.email,
      token: this.state.token
    });
  };

  render() {
    let { message, success, openSnackBar } = this.state;
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
            OTP Verification
          </Typography>
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "1px"
            }}
          >
            <p>Please enter the 4 digit verification code sent to {this.state.email}</p>
          </div>

          <ValidatorForm
            ref="form"
            style={{
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "1px"
            }}
            className={classes.form}
            onSubmit={this.handleFormSubmit}
          >
            <FormControl variant="outlined" fullWidth>
              <div
                style={{
                  textAlign: "center",
                  paddingLeft: "40px",
                  paddingTop: "1px",
                  paddingBottom: "20px"
                }}
              >
                <OtpInput
                  onChange={this.handleChange}
                  className="otpinput"
                  numInputs={4}
                  value={this.state.token}
                  style={{ textAlign: "center" }}
                  shouldAutoFocus={true}
                  isInputNum={true}
                />
              </div>
            </FormControl>
            <Button type="submit" variant="contained" style={{ backgroundColor: "#112855", color: "#ffff" }} className={classes.submit} fullWidth>
              Continue
            </Button>
          </ValidatorForm>
          <Grid container>
            <Grid item xs style={{ textAlign: "center" }}>
              <a style={{ color: "#005ce6" }} onClick={this.onResend}>
                Resend OTP Code
              </a>
              <br />
              <br />
              Go back to SignIn page? &nbsp;
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
            </Grid>
          </Grid>
          <br />
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
  otpVerification: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  login: state.login,
  open: state.open
});
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { otpVerification, forgotPassword })(Otppage)));
