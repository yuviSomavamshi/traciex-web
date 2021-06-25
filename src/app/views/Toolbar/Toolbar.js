import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CardContent, TextField, InputAdornment, Icon, IconButton } from "@material-ui/core";
import { Search as SearchIcon, X as XIcon } from "react-feather";
import { url } from "../../Constants";
import axios from "axios";

const exportBarcodes = () => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("jwt_token")
  };
  axios
    .get(url + "/barcode/export", {
      responseType: "blob",
      headers: headers
    })
    .then((response) => {
      const type = response.headers["content-type"];
      const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "barcodes.xlsx";
      link.click();
    })
    .catch((error) => {
      console.error(error);
    });
};
const Toolbar = ({ className, handleClickOpen, handleTokenSearch, handleTokenClear, handleTokenChange, ...rest }) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="mt-10">
      {/* <Card> */}
      <CardContent>
        <Grid container spacing={10}>
          <Grid item xs={9} style={{ paddingLeft: "25px" }}>
            <TextField
              fullWidth
              style={{ backgroundColor: "white", borderRadius: "10px" }}
              value={searchKey}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTokenSearch}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSearchKey("");
                        handleTokenClear();
                      }}
                    >
                      <XIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              placeholder={rest.placeholder || "Search"}
              variant="outlined"
              onChange={(event) => {
                setSearchKey(event.target.value);
                handleTokenChange(event);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") handleTokenSearch();
              }}
            />
          </Grid>
          {rest.isCustomerScreen && (
            <Grid item style={{ paddingBottom: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                style={{
                  position: "right",
                  width: "200px",
                  padding: "15px 13px 15px 13px",
                  marginLeft: "-50px",
                  backgroundColor: "#222945"
                }}
              >
                <Icon
                  style={{
                    backgroundColor: "white",
                    color: "#222945",
                    borderRadius: "15%",
                    marginRight: "10px"
                  }}
                >
                  add
                </Icon>
                &nbsp;
                <span>
                  <b>Add Customer</b>
                </span>
              </Button>
            </Grid>
          )}
           {rest.isRamanReaderScreen && (
            <Grid item style={{ paddingBottom: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                style={{
                  position: "right",
                  width: "200px",
                  padding: "15px 13px 15px 13px",
                  marginLeft: "-50px",
                  backgroundColor: "#222945"
                }}
              >
                <Icon
                  style={{
                    backgroundColor: "white",
                    color: "#222945",
                    borderRadius: "15%",
                    marginRight: "10px"
                  }}
                >
                  upload
                </Icon>
                &nbsp;
                <span>
                  <b>Upload Data Model</b>
                </span>
              </Button>
            </Grid>
          )}
          {rest.isBarcodeScreen && (
            <Grid item style={{ paddingBottom: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                style={{
                  position: "right",
                  width: "200px",
                  padding: "15px 13px 15px 13px",
                  marginLeft: "-50px",
                  backgroundColor: "#222945"
                }}
              >
                <Icon
                  style={{
                    backgroundColor: "white",
                    color: "#222945",
                    borderRadius: "15%",
                    marginRight: "10px"
                  }}
                >
                  upload
                </Icon>
                &nbsp;
                <span>
                  <b>Upload Barcodes</b>
                </span>
              </Button>
            </Grid>
          )}
          {rest.isBarcodeScreen && false && (
            <Grid item style={{ paddingBottom: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={exportBarcodes}
                style={{
                  position: "right",
                  width: "200px",
                  padding: "15px 13px 15px 13px",
                  marginLeft: "-50px",
                  backgroundColor: "#222945"
                }}
              >
                <Icon
                  style={{
                    backgroundColor: "white",
                    color: "#222945",
                    borderRadius: "15%",
                    marginRight: "10px"
                  }}
                >
                  download
                </Icon>
                &nbsp;
                <span>
                  <b>Export Barcodes</b>
                </span>
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
      {/* </Card> */}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
