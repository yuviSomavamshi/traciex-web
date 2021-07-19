import React, { Component } from "react";
import { Button, FormControl, Typography, OutlinedInput, InputLabel, Tooltip, Snackbar, Grid, Card } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { forgotPassword } from "../../redux/actions/LoginActions";
import history from "history.js";
import { APPNAME_PREFIX, APPNAME_SUFFIX } from "../../Constants";
import "../../KaushanScript.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" className="textSecondary" align="center" style={{ fontSize: "13px", paddingBottom: "50px" }}>
      {"Copyright © Healthx Singapore, All rights reserved "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class ForgotPassword extends Component {
  state = {
    email: "",
    message: null,
    openSnackBar: false,
    success: false
  };

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.login.success !== null) {
      if (nextProp.login.success === true) {
        localStorage.setItem("reset-password-email", this.state.email);
        history.push({
          pathname: "/OTP-verification"
        });
      } else {
        this.setState({
          openSnackBar: true,
          message: nextProp.login.message,
          success: nextProp.login.success
        });
      }
    }
  }

  handleFormSubmit = () => {
    this.props.forgotPassword({
      email: this.state.email
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
    let { message, success, openSnackBar, email } = this.state;
    let { classes, login } = this.props;
    let severity = success ? "success" : "error";

    if (login.message == null || login.message.trim().length <= 0) openSnackBar = false;
    return (
      <div className={classes.paper}>
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 1px 2.94px 0.06px rgba(4,26,55,0.16)",
            width: 450
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "40px",
              color: "#112855",
              fontSize: "27px"
            }}
            className="mb-16"
            component="h1"
            variant="h5"
          >
            <span className="brandnameDarkPrefix">{APPNAME_PREFIX}</span>
            <span className="brandnameSuffix">{APPNAME_SUFFIX}</span>
          </Typography>
          <Typography style={{ textAlign: "center" }} component="h2" variant="h6">
            Forgot Password
          </Typography>

          <div
            style={{
              textAlign: "center",
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <p>Enter the email associated with your account, we will send a link to reset your password.</p>
          </div>
          <ValidatorForm
            ref="form"
            style={{
              padding: "60px",
              paddingTop: "10px",
              paddingBottom: "20px"
            }}
            className={classes.form}
            onSubmit={this.handleFormSubmit}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type="email" name="email" value={email} onChange={this.handleChange} labelWidth={40} />
            </FormControl>

            <Tooltip title="Send email regarding password reset steps">
              <Button
                type="submit"
                style={{ backgroundColor: "#112855", color: "#ffff" }}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Link
              </Button>
            </Tooltip>
          </ValidatorForm>

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
  forgotPassword: PropTypes.func.isRequired,
  login: state.login,
  open: state.open
});
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { forgotPassword })(ForgotPassword)));
