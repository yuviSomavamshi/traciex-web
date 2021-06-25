import React, { Component } from "react";
import { Button, Dialog } from "@material-ui/core";

export default class ConnectionError extends Component {
  render() {
    return (
      <div>
        <Dialog
          modal={true}
          open={this.props.openModal}
          actions={
            <Button
              className="test--connection-error-btn"
              label="LOGIN"
              secondary={true}
              fullWidth={true}
              style={{
                borderRadius: 3
              }}
              labelStyle={{
                color: "#FFFFFF",
                fontFamily: "OpenSansBold",
                fontSize: 13
              }}
              buttonStyle={{
                borderRadius: 3,
                backgroundColor: "#E51937"
              }}
              onClick={this.props.gotoLoginPage}
            />
          }
          actionsContainerStyle={{
            padding: "0px 44px 35px"
          }}
          style={{
            zIndex: 99999 * 99999
          }}
          bodyStyle={{
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
            borderRadius: 3,
            padding: "41px 44px 0px"
          }}
          contentStyle={{
            width: 427,
            transform: "translate(0px, 0px)"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img
              src={require("../../assets/images/connectionError.png")}
              style={{
                width: 100,
                height: 138,
                alignSelf: "center"
              }}
            />
            <span
              style={{
                color: "#000000",
                fontFamily: "OpenSansRegular",
                fontSize: 24,
                fontWeight: "600",
                margin: "15px 0 12px"
              }}
            >
              We are Sorry !
            </span>
            <span
              style={{
                textAlign: "center",
                color: "#757575",
                fontFamily: "OpenSansRegular",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: 30
              }}
            >
              For some reason we are not able to load your application, please login again to establish a secure connection.
            </span>
          </div>
        </Dialog>
        {/* ....... Dialog box of Connection error End ....... */}
      </div>
    );
  }
}
