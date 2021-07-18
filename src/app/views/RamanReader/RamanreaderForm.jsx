import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Button, Icon, Snackbar } from "@material-ui/core";
import "date-fns";
import { getRamanreaderCodesList, uploadRamanreadercodes } from "../../redux/actions/RamanReaderActions.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import Dropzone from "./Dropzone";
import MuiAlert from "@material-ui/lab/Alert";
import history from "history.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class RamanreaderForm extends Component {
  state = {
    btnVisible: false,
    files: null,
    message: null,
    severity: null,
    openSnackBar: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ramanReader.message !== null && nextProps.ramanReader.severity !== null) {
      this.setState({
        ...this.state,
        openSnackBar: true,
        message: nextProps.ramanReader.message,
        severity: nextProps.ramanReader.severity
      });
      if (nextProps.ramanReader.severity === "success") {
        setTimeout(() => {
          this.props.handleClose();
          history.push({
            pathname: "/raman-reader"
          });
        }, 3000);
      }
    }
  }

  handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", this.state.files);
    this.props.uploadRamanreadercodes(formData);
    // this.props.setBtnVisible(false);
    // setTimeout(() => {
    // this.props.onFileUploadComplete();
    // }, 300);
  };

  handleSubmitBtnVisibla = (btnVisible, files) => {
    this.setState({ btnVisible, files });
  };

  handleCloseBtn = () => {
    this.props.handleClose();
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSnackBar: false,
      message: null,
      severity: null
    });
  };

  render() {
    return (
      <div className="m-sm-30" style={{ marginTop: "10px" }}>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={(errors) => null}>
          <div>
            <div className="content">
              <Dropzone
                setBtnVisible={(value, files) => {
                  this.handleSubmitBtnVisibla(value, files);
                }}
                ref="child"
              />
            </div>
          </div>

          <div className="mt-3 mb-2 d-flex justify-content-center">
            <Button
              style={{ backgroundColor: "#112855", color: "#ffff" }}
              variant="contained"
              type="button" // added fix from submit button to normal button
              onClick={this.handleCloseBtn}
              endIcon={<Icon>close</Icon>}
            >
              <span className="pl-8 capitalize">Close</span>
            </Button>
            &nbsp;&nbsp;&nbsp;
            {this.state.btnVisible && (
              <Button endIcon={<Icon>send</Icon>} style={{ backgroundColor: "#112855", color: "#ffff" }} variant="contained" type="submit">
                <span className="pl-8 capitalize">Submit</span>
              </Button>
            )}
          </div>
          {this.state.message && (
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.openSnackBar}
              autoHideDuration={5000}
              onClose={this.handleSnackBarClose}
            >
              <Alert onClose={this.handleSnackBarClose} severity={this.state.severity}>
                {this.state.message}
              </Alert>
            </Snackbar>
          )}
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getRamanreaderCodesList: PropTypes.func.isRequired,
  uploadRamanreadercodes: PropTypes.func.isRequired,
  ramanReader: state.ramanReader
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { getRamanreaderCodesList, uploadRamanreadercodes })(RamanreaderForm));
