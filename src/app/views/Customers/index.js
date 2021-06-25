import React, { Component } from "react";
import { Container, Box, Dialog, DialogTitle } from "@material-ui/core";
import Results from "./Results";

import Toolbar from "../Toolbar/Toolbar";
import CustomerForm from "./CustomerForm";
import { getCustomerList } from "../../redux/actions/CustomerActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";

class Customers extends Component {
  state = {
    open: false,
    openLoc: false,
    limit: 10,
    page: 0,
    token: ""
  };

  componentDidMount() {
    this.props.getCustomerList(this.state.token, this.state.page, this.state.limit);
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
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
  };

  handleCustomerSubmit = () => {
    this.props.getCustomerList(this.state.token, this.state.page, this.state.limit);
  };

  handleTokenChange = (event) => {
    this.setState({
      token: event.target.value,
      page: 0
    });
  };

  handleTokenSearch = () => {
    this.props.getCustomerList(this.state.token, this.state.page, this.state.limit);
  };

  handleTokenClear = () => {
    this.setState({
      token: ""
    });
    this.props.getCustomerList("", this.state.page, this.state.limit);
  };

  handleLimitChange = (event) => {
    this.setState({
      limit: event.target.value,
      page: 0
    });
    this.props.getCustomerList(this.state.token, 0, event.target.value);
  };

  handlePageChange = (event, newPage) => {
    this.setState({
      page: newPage
    });
    this.props.getCustomerList(this.state.token, newPage, this.state.limit);
  };

  render() {
    let { open, openLoc, limit, page } = this.state;
    let { customers } = this.props;
    return (
      <div>
        <Container maxWidth={false}>
          <Toolbar
            handleClickOpen={this.handleClickOpen}
            handleTokenChange={this.handleTokenChange}
            handleTokenSearch={this.handleTokenSearch}
            handleTokenClear={this.handleTokenClear}
            isCustomerScreen={true}
            placeholder={"Search customer name or email"}
          />
          <Box mt={3}>
            <Results
              customers={customers}
              limit={limit}
              page={page}
              handleLimitChange={this.handleLimitChange}
              handlePageChange={this.handlePageChange}
              handleDeleteBarcode={this.handleDeleteBarcode}
            />
          </Box>
        </Container>

        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ borderRadius: "10px" }}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center", marginTop: "20px", color: "#112855" }}>
            Onboard Customer
          </DialogTitle>
          <CustomerForm handleClose={this.handleClose} handleCustomerSubmit={this.handleCustomerSubmit} />
        </Dialog>
        <Dialog open={openLoc} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Onboard Customer</DialogTitle>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getCustomerList: PropTypes.func.isRequired,
  customers: state.customers
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { getCustomerList })(Customers));
