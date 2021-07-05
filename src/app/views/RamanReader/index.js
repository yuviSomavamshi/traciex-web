import React, { Component } from "react";
import { Container, Box, Dialog, DialogTitle, Snackbar, Typography, DialogContent, Link } from "@material-ui/core";
import Results from "./Results";

import Toolbar from "../Toolbar/Toolbar";
import RamanreaderForm from "./RamanreaderForm";
import { getRamanreaderCodesList, deleteRamanreadercode } from "../../redux/actions/RamanReaderActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import history from "history.js";
import { DialogActions } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class RamanReader extends Component {
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
    this.props.getRamanreaderCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ramanReader.message != this.props.ramanReader.message) {
      this.setState({
        ...this.state,
        openSnackBar: true,
        message: nextProps.ramanReader.message,
        severity: nextProps.ramanReader.severity
      });
      if (nextProps.ramanReader.severity == "success") {
        setTimeout(() => {
          this.props.getRamanreaderCodesList("", 0, this.state.limit, this.state.order, this.state.sortBy);
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
    this.props.getRamanreaderCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleTokenClear = () => {
    this.setState({
      token: ""
    });
    this.props.getRamanreaderCodesList("", this.state.page, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleLimitChange = (event) => {
    this.setState({
      limit: event.target.value,
      page: 0
    });
    this.props.getRamanreaderCodesList(this.state.token, 0, event.target.value, this.state.order, this.state.sortBy);
  };

  handlePageChange = (event, newPage) => {
    this.setState({
      page: newPage
    });
    this.props.getRamanreaderCodesList(this.state.token, newPage, this.state.limit, this.state.order, this.state.sortBy);
  };

  handleOrderChange = (order) => {
    this.setState({
      order: order
    });
    this.props.getRamanreaderCodesList(this.state.token, this.state.page, this.state.limit, order, this.state.sortBy);
  };

  handleSortByChange = (sortBy) => {
    this.setState({
      sortBy: sortBy
    });
    this.props.getRamanreaderCodesList(this.state.token, this.state.page, this.state.limit, this.state.order, sortBy);
  };

  handleDeleteRamanreader = (ramanreader) => {
    this.props.deleteRamanreadercode(ramanreader.filename);
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
        pathname: "/raman-reader"
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
    this.props.getRamanreaderCodesList(this.state.token, this.state.page, this.state.limit, this.state.order);
  };

  render() {
    let { open, openLoc, limit, page, openSnackBar, severity, message } = this.state;
    let { ramanReader } = this.props;
    return (
      <div>
        <Container maxWidth={false}>
          <Toolbar
            handleClickOpen={this.handleClickOpen}
            handleTokenChange={this.handleTokenChange}
            handleTokenSearch={this.handleTokenSearch}
            handleTokenClear={this.handleTokenClear}
            isRamanReaderScreen={true}
            placeholder={"Search Raman File"}
          />
          <Box mt={3}>
            <Results
              ramanReader={ramanReader}
              limit={limit}
              page={page}
              handleLimitChange={this.handleLimitChange}
              handlePageChange={this.handlePageChange}
              handleDeleteRamanreader={this.handleDeleteRamanreader}
              handleOrderChange={this.handleOrderChange}
              handleSortByChange={this.handleSortByChange}
            />
          </Box>
        </Container>

        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ borderRadius: "10px" }}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center", color: "#112855" }}>
            Upload Data Model
          </DialogTitle>
          <DialogContent style={{ display: "flex", justifyContent: "center" }}>
            <RamanreaderForm handleClose={this.handleClose} onFileUploadComplete={this.onFileUploaded} />
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
  getRamanreaderCodesList: PropTypes.func.isRequired,
  deleteRamanreadercode: PropTypes.func.isRequired,
  ramanReader: state.ramanReader
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { getRamanreaderCodesList, deleteRamanreadercode })(RamanReader));
