import React, { Component } from "react";
import { APPNAME_PREFIX, APPNAME_SUFFIX } from "../../Constants";
import "../../KaushanScript.css";
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
  Tooltip,
  Snackbar,
  Card
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    open: false,
    message: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.login.error !== prevProps.login.error) {
      this.setState({
        ...this.state,
        message: this.props.login.error
      });
    }
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

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleFormSubmit = (event) => {
    this.props.loginWithEmailAndPassword({ ...this.state });
    this.setState({
      open: true
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
      message: null
    });
  };

  render() {
    let { email, password, showPassword, open, message } = this.state;
    let { classes } = this.props;
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

          <Typography style={{ textAlign: "center" }} component="h2" variant="h6">
            Sign in
          </Typography>
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
            <FormControl className="mb-16" variant="outlined" fullWidth>
              <InputLabel>Email</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type="email" name="email" value={email} onChange={this.handleChange} labelWidth={40} />
            </FormControl>
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
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  <span
                    style={{
                      color: "#112855",
                      float: "right",
                      marginTop: "10px"
                    }}
                  >
                    {" "}
                    Forgot password?
                  </span>
                </Link>
              </Grid>
            </Grid>
            <Tooltip title="Login to Healthx Customer Portal">
              <Button type="submit" variant="contained" style={{ backgroundColor: "#112855", color: "#ffff" }} className={classes.submit} fullWidth>
                Sign In
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
                  {APPNAME_PREFIX == "Tracie" && (
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
            open={open}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn)));
