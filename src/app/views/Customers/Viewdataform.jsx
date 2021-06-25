import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid, InputAdornment, IconButton, SvgIcon } from "@material-ui/core";

import "date-fns";

import { getCustomerList, addCustomerLocation } from "../../redux/actions/CustomerActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import SearchField from "react-search-field";
import Visibility from "@material-ui/icons/Visibility";
import { Search as SearchIcon } from "react-feather";

class Viewdataform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      searchField: false
    };
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleLocationModal = (location) => {
    this.props.handleOpen(location);
  };

  handleViewdataModalclose = (event) => {
    this.props.handleClose();
  };

  render() {
    const { filter, data } = this.state;
    const { locations } = this.props;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = locations.filter((item) => {
      return Object.keys(item).some((key) => item[key].toLowerCase().includes(lowercasedFilter));
    });

    return (
      <div className="m-sm-30">
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={(errors) => null}>
          {this.props.locations.length > 0 ? (
            <div>
              <div style={{ textAlign: "center" }}>
                <TextValidator
                  label="Filter"
                  style={{ width: "500px" }}
                  onChange={this.handleChange}
                  name="search"
                  type="text"
                  value={filter}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div class="viewdatastyle">
                {filteredData.map((loc) => (
                  <div
                    style={{
                      margin: "5px",
                      textDecoration: "underline",
                      fontSize: "18px"
                    }}
                  >
                    <a
                      onClick={() => {
                        this.handleLocationModal(loc.location);
                      }}
                    >
                      {loc.location}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No Locations Found</p>
          )}

          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                float: "right",
                marginBottom: "5%",
                backgroundColor: "#112855",
                color: "#ffff"
              }}
              variant="contained"
              type="submit"
              className="mt-20 ml-20"
              onClick={this.props.handleClose}
            >
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

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { addCustomerLocation, getCustomerList })(Viewdataform));
