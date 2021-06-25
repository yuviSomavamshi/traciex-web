import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const Footer = ({ theme, settings }) => {
  const footerTheme = settings.themes[settings.footer.theme] || theme;
  return (
    <MuiThemeProvider theme={footerTheme}>
      <Helmet>
        <style>
          {`
              .footer {
                background: #fff;
                color: #112855;
             
              }
            `}
        </style>
      </Helmet>
      <div className="footer flex flex-middle" style={{ marginTop: 10, backgroundColor: "grey" }}>
        <div className="flex flex-middle container px-sm-30 w-100" style={{ display: "flex", justifyContent: "center" }}>
          <p className="m-0" style={{ color: "white" }}>
            (c) Copyright Healthx Singapore, All rights reserved.
          </p>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

Footer.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(connect(mapStateToProps, {})(Footer));
