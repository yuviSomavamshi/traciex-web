import React, { Component } from "react";
import SampleSheet from "./sample.xlsx";
import { Container, Box, Dialog, DialogTitle, Snackbar, Typography, DialogContent, Link } from "@material-ui/core";
import Results from "./Results";

import Toolbar from "../Toolbar/Toolbar";
import BarcodeForm from "./BarcodeForm";
import { getBarCodesList, deleteBarcode } from "../../redux/actions/BarCodeActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import history from "history.js";
import { DialogActions } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class BarcodePage extends Component {
  state = {
    open: false,
    openLoc: false,
    openSnackBar: false,
    limit: 10,
    page: 0,
    token: "",
    sortBy: "createdAt",
    order: "desc",
    message: null,
    severity: "error"
  };

  componentDidMount() {
    this.props.getBarCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.barCode.message !== this.props.barCode.message) {
      this.setState({
        ...this.state,
        openSnackBar: true,
        message: nextProps.barCode.message,
        severity: nextProps.barCode.severity
      });
      if (nextProps.barCode.severity === "success") {
        setTimeout(() => {
          this.props.getBarCodesList("", 0, this.state.limit, this.state.order, this.state.sortBy);
        }, 3000);
      }
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTokenChange = (event) => {
    this.setState({
      token: event.target.value,
      page: 0
    });
  };

  handleTokenSearch = () => {
    this.props.getBarCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleTokenClear = () => {
    this.setState({
      token: ""
    });
    this.props.getBarCodesList("", this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleLimitChange = (event) => {
    this.setState({
      limit: event.target.value,
      page: 0
    });
    this.props.getBarCodesList(this.state.token, 0, event.target.value, this.state.order, this.state.sortBy);
  };

  handlePageChange = (event, newPage) => {
    this.setState({
      page: newPage
    });
    this.props.getBarCodesList(this.state.token, newPage, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleOrderChange = (order) => {
    this.setState({
      order: order
    });
    this.props.getBarCodesList(this.state.token, this.state.page, this.state.limit, order, this.state.sortBy);
  };

  handleSortByChange = (sortBy) => {
    this.setState({
      sortBy: sortBy
    });
    this.props.getBarCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, sortBy);
  };

  handleDeleteBarcode = (barcode) => {
    this.props.deleteBarcode(barcode.originalFileName);
  };

  handleClickOpen = (event) => {
    event.persist();
    this.setState({
      open: true
    });
  };

  handleClickOpenLoc = (event) => {
    event.persist();
    this.setState({
      openLoc: true
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
      openLoc: false
    });
    setTimeout(() => {
      history.push({
        pathname: "/barcode"
      });
    }, 300);
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

  onFileUploaded = () => {
    this.props.getBarCodesList(this.state.token, this.state.page, this.state.limit, this.state.order);
  };

  render() {
    let { open, openLoc, limit, page, openSnackBar, severity, message } = this.state;
    let { barCode, barcodeRes } = this.props;
    return (
      <div>
        <Container maxWidth={false}>
          <Toolbar
            handleClickOpen={this.handleClickOpen}
            handleTokenChange={this.handleTokenChange}
            handleTokenSearch={this.handleTokenSearch}
            handleTokenClear={this.handleTokenClear}
            isBarcodeScreen={true}
            placeholder={"Search barcode"}
          />
          <Box mt={3}>
            <Results
              barCode={barCode}
              limit={limit}
              page={page}
              handleLimitChange={this.handleLimitChange}
              handlePageChange={this.handlePageChange}
              handleDeleteBarcode={this.handleDeleteBarcode}
              handleOrderChange={this.handleOrderChange}
              handleSortByChange={this.handleSortByChange}
            />
          </Box>
        </Container>

        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ borderRadius: "10px" }}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center", color: "#112855" }}>
            Upload Barcodes List
          </DialogTitle>
          <Typography variant="body2" align="justify" style={{ margin: "2px 10px", textAlign: "center" }}>
            Note: Please note first row of the excel sheet will be treated as header. To see sample data please click here to
            <Link color="error" href={SampleSheet} download="sample.xlsx">
              {" "}
              download
            </Link>
            .
          </Typography>

          <DialogContent style={{ display: "flex", justifyContent: "center" }}>
            <BarcodeForm handleClose={this.handleClose} onFileUploadComplete={this.onFileUploaded} barcodeRes={barcodeRes} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        <Dialog open={openLoc} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Customer</DialogTitle>
        </Dialog>
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
  getBarCodesList: PropTypes.func.isRequired,
  deleteBarcode: PropTypes.func.isRequired,
  barCode: state.barCode,
  barcodeRes: state.barCode.barcodeRes
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { getBarCodesList, deleteBarcode })(BarcodePage));
