import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Icon, Grid, InputAdornment, IconButton, SvgIcon } from "@material-ui/core";

import "date-fns";

import { getCustomerList, addCustomerLocation } from "../../redux/actions/CustomerActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Search as SearchIcon } from "react-feather";

class Viewdataform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      data: [
        { code: "AD", label: "Andorra", phone: "376" },
        { code: "AE", label: "UAE", phone: "971" },
        { code: "AF", label: "Afghanistan", phone: "93" },
        { code: "AG", label: "Barbuda", phone: "1-268" },
        { code: "AI", label: "Anguilla", phone: "1-264" },
        { code: "AL", label: "Albania", phone: "355" },
        { code: "AM", label: "Armenia", phone: "374" },
        { code: "AO", label: "Angola", phone: "244" },
        { code: "AQ", label: "Antarctica", phone: "672" },
        { code: "AR", label: "Argentina", phone: "54" },
        { code: "AS", label: "American Samoa", phone: "1-684" },
        { code: "AT", label: "Austria", phone: "43" },
        { code: "AU", label: "Australia", phone: "61" },
        { code: "AW", label: "Aruba", phone: "297" },
        { code: "AX", label: "Alland Islands", phone: "358" },
        { code: "AZ", label: "Azerbaijan", phone: "994" },
        { code: "BA", label: "Bosnia", phone: "387" },
        { code: "BB", label: "Barbados", phone: "1-246" },
        { code: "BD", label: "Bangladesh", phone: "880" },
        { code: "HK", label: "Hong Kong", phone: "852" },
        { code: "HM", label: "Heard Island", phone: "672" },
        { code: "HN", label: "Honduras", phone: "504" },
        { code: "HR", label: "Croatia", phone: "385" },
        { code: "HT", label: "Haiti", phone: "509" },
        { code: "HU", label: "Hungary", phone: "36" },
        { code: "ID", label: "Indonesia", phone: "62" },
        { code: "IE", label: "Ireland", phone: "353" },
        { code: "IL", label: "Israel", phone: "972" },
        { code: "IM", label: "Isle", phone: "44" },
        { code: "IN", label: "India", phone: "91" },
        { code: "AX", label: "Alland Islands", phone: "358" },
        { code: "AZ", label: "Azerbaijan", phone: "994" },
        { code: "BA", label: "Bosnia", phone: "387" },
        { code: "BB", label: "Barbados", phone: "1-246" },
        { code: "BD", label: "Bangladesh", phone: "880" },
        { code: "HK", label: "Hong Kong", phone: "852" },
        { code: "HM", label: "Heard Island", phone: "672" },
        { code: "HN", label: "Honduras", phone: "504" },
        { code: "HR", label: "Croatia", phone: "385" },
        { code: "HT", label: "Haiti", phone: "509" },
        { code: "HU", label: "Hungary", phone: "36" },
        { code: "ID", label: "Indonesia", phone: "62" },
        { code: "IE", label: "Ireland", phone: "353" },
        { code: "IL", label: "Israel", phone: "972" },
        { code: "IM", label: "Isle", phone: "44" },
        { code: "IN", label: "India", phone: "91" }
      ]
    };
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleLocationModal = (event) => {
    this.props.handleOpen(event);
  };

  handleViewdataModalclose = (event) => {
    this.props.handleClose();
  };

  render() {
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) => item[key].toLowerCase().includes(lowercasedFilter));
    });

    return (
      <div className="m-sm-30">
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={(errors) => null}>
          <div>
            <div style={{ textAlign: "center" }}>
              <TextValidator
                label="Search Location"
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
              {filteredData.map((item) => (
                <div
                  style={{
                    margin: "5px",
                    textDecoration: "underline",
                    fontSize: "18px"
                  }}
                >
                  <a onClick={this.handleLocationModal}>{item.label}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
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

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, { addCustomerLocation, getCustomerList })(Viewdataform));
