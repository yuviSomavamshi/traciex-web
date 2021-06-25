import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid } from "@material-ui/core";

import "date-fns";

import { getCustomerList, addCustomerLocation } from "../../redux/actions/CustomerActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";

class LocationForm extends Component {
  state = {
    name: ""
  };

  handleSubmit = (event) => {
    this.props.addCustomerLocation({
      location: this.state.name,
      customerId: (this.props.customer && String(this.props.customer.id)) || -1
    });
    this.props.handleClose();
    this.props.getCustomerList();
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let { name } = this.state;
    return (
      <div className="m-sm-30">
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={(errors) => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-16 w-220"
                label="Name (Min length 4)"
                onChange={this.handleChange}
                type="text"
                name="name"
                value={name}
                validators={["required", "minStringLength: 4"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
          <div>
            <Button color="primary" variant="contained" type="submit" className="mt-20">
              <Icon>send</Icon>
              <span className="pl-8 capitalize">Submit</span>
            </Button>
            <Button color="primary" variant="contained" type="submit" className="mt-20 ml-20" onClick={this.props.handleClose}>
              <Icon>close</Icon>
              <span className="pl-8 capitalize">Close</span>
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addCustomerLocation: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { addCustomerLocation, getCustomerList })(LocationForm));
