import React, { Component } from "react";

import {
  Button,
  FormControl,
  Typography,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Snackbar,
  Card,
  CircularProgress
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import withRouter from "app/WithRouter";
import { changePassword } from "../../redux/actions/LoginActions";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import history from "history.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
  },
  buttonProgress: {
    color: green[500],
    margin: theme.spacing(3, 0, 2)
  }
});

class Changepasswordpage extends Component {
  state = {
    confirmPassword: "",
    password: "",
    oldPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    showOldPassword: false,
    open: false,
    message: null,
    success: null,
    btnDisable: false
  };

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

  handleClickShowOldPassword = (event) => {
    event.persist();
    this.setState({
      showOldPassword: !this.state.showOldPassword
    });
  };

  handleMouseDownShowOldPassword = (event) => {
    event.preventDefault();
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (nextProp.login.changepwdSuccess != null) {
      if (nextProp.login.changepwdSuccess === true && this.state.password === this.state.confirmPassword) {
        setTimeout(() => {
          this.props.handleClose();
          history.push("/login");
        }, 2000);
        this.setState({ success: nextProp.login.changepwdSuccess, openSnackBar: true, message: nextProp.login.message });
      } else {
        this.setState({
          openSnackBar: true,
          message: nextProp.login.message,
          success: nextProp.login.changepwdSuccess
        });
      }
    }
  }

  handleFormSubmit = (event) => {
    this.props.changePassword({
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });
    this.props.handlePasswordSubmit();
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
    let { showPassword, showConfirmPassword, showOldPassword, openSnackBar, success, message } = this.state;
    let { classes, loading } = this.props;
    let severity = success ? "success" : "error";

    return (
      <>
        <div className={classes.paper}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 2.94px 0.06px rgba(4,26,55,0.16)",
              width: 450
            }}
          >
            <Typography style={{ textAlign: "center" }} component="h2" variant="h6">
              Change Password
            </Typography>
            <div
              style={{
                textAlign: "center",
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
                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="oldPassword"
                  label="Old Password"
                  type={showOldPassword ? "text" : "password"}
                  onChange={this.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowOldPassword}
                        onMouseDown={this.handleMouseDownShowOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <br />
              <br />
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
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

              <div className="d-flex justify-content-center align-content-center">
                {!loading ? (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#112855", color: "#ffff" }}
                    className={classes.submit}
                    fullWidth
                  >
                    Continue
                  </Button>
                ) : (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
            </ValidatorForm>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  changePassword: PropTypes.func.isRequired,
  login: state.login,
  loading: state.login.loading,
  open: state.open
});
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { changePassword })(Changepasswordpage)));
