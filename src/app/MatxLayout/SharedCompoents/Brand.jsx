import React, { Component } from "react";
import { APPNAME_PREFIX, APPNAME_SUFFIX } from "../../Constants";
import "../../KaushanScript.css";
class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <span className="brandnamePrefix">{APPNAME_PREFIX}</span>
          <span className="brandnameSuffix">{APPNAME_SUFFIX}</span>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Brand;
