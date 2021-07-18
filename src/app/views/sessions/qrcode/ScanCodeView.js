import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Card, Typography, Container, Button } from "@material-ui/core";
import { BLUE_SHADE, GRAY, APP_BG_COLOR, MENU_GRAY, WHITE, TEXT_TITLE } from "./webColors";
import QRCode from "react-qr-code";
import { webConstants } from "./webConstants";
import { storeLocalData, getLocalData, getSocket } from "./webHelperFunctions";
import "./StopWatch.css";
import { APPNAME } from "../../../Constants";

var socket = getSocket();

var username = getLocalData(webConstants.WEB_TIMER_UUID);
if (username === null) {
  username = "WEB-" + uuid();
  storeLocalData(webConstants.WEB_TIMER_UUID, username);
}

const ScanCodeView = ({ params }) => {
  const [isPaired, setIsPaired] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [patientName, setPatientName] = useState("");

  const classes = useStyles();

  useEffect(() => {
    socket.emit(webConstants.REGISTER_TIMER, { username });

    socket.on(webConstants.REGISTER_TIMER_RESP, (msg) => {
      console.log(msg);
    });
    socket.on(webConstants.SCAN_QR_CODE_CONFIRM, (msg) => {
      if (msg) {
        socket.removeListener(webConstants.SCAN_QR_CODE_CONFIRM);
        setIsPaired(true);
      }
    });

    socket.on(webConstants.START_WEB_TIMER, (msg) => {
      setPatientName(msg.patientName);
      handleStart();
    });

    socket.on(webConstants.STOP_WEB_TIMER, (msg) => {
      handleReset();
    });

    socket.on(webConstants.DISCONNECT_TIMER, (msg) => {
      username = "WEB-" + uuid();
      storeLocalData(webConstants.WEB_TIMER_UUID, username);
      socket.emit(webConstants.REGISTER_TIMER, { username });
      setIsPaired(false);
    });

    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else if (interval !== null) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      socket.removeListener(webConstants.SCAN_QR_CODE);
    };
  }, [isActive, isPaused]);

  const handleStart = (startMe) => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setTimeout(() => {
      setIsPaused(true);
    }, 5000);
  };

  if (time > 10000) {
    handleReset();
  }

  return (
    <Container component="main" maxWidth="false">
      <div className={classes.body}>
        <div
          style={{
            backgroundColor: BLUE_SHADE,
            height: 200,
            paddingLeft: "10%"
          }}
        >
          <Button style={{ marginTop: "2%", color: WHITE }}>
            <Typography component={"tbody"} style={{ fontSize: 24 }}>
              {APPNAME} Web Timer
            </Typography>
          </Button>
        </div>
        <Card className={classes.cardStyle}>
          {!isPaired && (
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: "5%"
                }}
              >
                <div className={classes.textStyle}>
                  <Typography variant={"h4"} component={"h4"} style={{ marginBottom: "5%" }}>
                    To use {APPNAME} Web Timer on your computer :
                  </Typography>
                  <Typography variant={"h5"} className={classes.textPointsStyle}>
                    1. Open {APPNAME} app on your phone
                  </Typography>
                  <br />
                  <Typography variant={"h5"} className={classes.textPointsStyle}>
                    2. Tap Menu and select {APPNAME} Web
                  </Typography>
                  <br />
                  <Typography variant={"h5"} className={classes.textPointsStyle}>
                    3. Click on "Link a Device"
                  </Typography>
                  <br />
                  <Typography variant={"h5"} className={classes.textPointsStyle}>
                    4. Point your phone to this screen to capture the code
                  </Typography>
                </div>
                <div className={classes.codeDivStyle}>
                  <QRCode size={300} value={username} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                    className={classes.textStyle}
                  ></div>
                </div>
              </div>
            </CardContent>
          )}
          {isPaired && (
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: "5%"
                }}
              >
                {!isPaused && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      marginRight: "5%"
                    }}
                  >
                    <div className="patientName">
                      <span className="name">Name: {patientName}</span>
                    </div>
                    <div className="timer">
                      <span className="digits">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                      <span className="digits mili-sec">{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </div>
                  </div>
                )}
                {isPaused && (
                  <div className="timer">
                    <span className="ready">Next Patient...</span>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </Container>
  );
};

const useStyles = makeStyles({
  cardStyle: {
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "-5%",
    width: "80%"
  },
  textStyle: {
    color: MENU_GRAY,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    width: "70%"
  },
  textPointsStyle: {
    color: TEXT_TITLE,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginTop: "2%"
  },
  codeDivStyle: {
    color: GRAY,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginTop: "5%",
    marginBottom: "5%",
    width: "30%"
  },
  codeStyle: {
    marginRight: "5%",
    marginTop: "5%"
  },
  body: {
    backgroundColor: APP_BG_COLOR,
    height: window.innerHeight,
    margin: -8,
    padding: 0
  },
  checkStyle: {
    marginLeft: 90,
    marginTop: "5%"
  }
});

export default ScanCodeView;
