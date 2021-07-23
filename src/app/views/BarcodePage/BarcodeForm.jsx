import React, { Component } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Button, Icon, Snackbar } from "@material-ui/core";
import "date-fns";
import { getBarCodesList, uploadBarcodes } from "../../redux/actions/BarCodeActions.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import Dropzone from "./Dropzone";
import MuiAlert from "@material-ui/lab/Alert";
import ReactApexChart from "react-apexcharts";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class BarcodeForm extends Component {
  state = {
    btnVisible: false,
    files: null,
    message: null,
    severity: null,
    openSnackBar: false,
    barcodeRes: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.barCode.message != null && nextProps.barCode.severity != null) {
      this.setState({
        ...this.state,
        openSnackBar: true,
        message: nextProps.barCode.message,
        severity: nextProps.barCode.severity,
        barcodeRes: nextProps.barCode.barcodeRes
      });
    }
  }

  handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", this.state.files);
    this.props.uploadBarcodes(formData);
    this.setState({
      btnVisible: false
    });
  };

  handleSubmitBtnVisibla = (btnVisible, files) => {
    this.setState({ btnVisible, files });
  };

  handleCloseBtn = () => {
    this.setState({ barcodeRes: {} });
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
    const { barcodeRes } = this.state;
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
          {barcodeRes.totalUploaded ? (
            <div>
              <ReactApexChart
                options={{
                  toolbar: {
                    show: false
                  },
                  chart: {
                    type: "bar",
                    height: 150
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "25%", //50%  25%for more small
                      endingShape: "rounded"
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 10, //2
                    colors: ["transparent"]
                  },
                  xaxis: {
                    categories: ["File Upload Summary"]
                  },
                  yaxis: {
                    title: {
                      text: "No. of Records"
                    }
                  },
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return val + " records";
                      }
                    }
                  }
                }}
                series={[
                  {
                    name: "Uploaded",
                    data: [Number(barcodeRes.totalUploaded) || 0]
                  },
                  {
                    name: "Processed",
                    data: [Number(barcodeRes.totalValid) || 0]
                  },
                  {
                    name: "Duplicates",
                    data: [Number(barcodeRes.totalDuplicates) || 0]
                  },
                  {
                    name: "Invalid",
                    data: [Number(barcodeRes.totalInvalid) || 0]
                  }
                ]}
                type="bar"
                height={200}
              />
            </div>
          ) : null}

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
  getBarCodesList: PropTypes.func.isRequired,
  uploadBarcodes: PropTypes.func.isRequired,
  barCode: state.barCode
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { getBarCodesList, uploadBarcodes })(BarcodeForm));
