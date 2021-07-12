import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import { url } from "../../Constants";
import {
  Icon,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  IconButton
} from "@material-ui/core";
import { Modal } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ramanReader, ...rest }) => {
  const classes = useStyles();

  const [openReports, setOpenReports] = useState(false);
  const [ramanreader, setRamanreader] = useState(null);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSetSortBy] = useState("createdAt");

  const createSortHandler = (property) => (event) => {
    setOrder(order == "desc" ? "asc" : "desc");
    setSetSortBy(property);
    rest.handleOrderChange(order);
    rest.handleSortByChange(sortBy);
  };

  const handleReportsClose = (event) => {
    setOpenReports(!openReports);
  };
  const handleDeleteRamanreaderView = (data) => {
    setRamanreader(data);
    setOpenReports(!openReports);
  };

  const handleDownload = (data) => {
    axios
      .post(
        url + "/raman/download",
        { filename: data.filename },
        {
          responseType: "blob",
          headers: {
            "x-api-key": "23423432423"
          }
        }
      )
      .then((response) => {
        const type = response.headers["content-type"];
        const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "download.csv";
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRamanreader = (data) => {
    rest.handleDeleteRamanreader(data);
    setOpenReports(!openReports);
  };

  return (
    <div>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table id="printTable">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      paddingLeft: "20px",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    <TableSortLabel active={sortBy === "filename"} direction={order} onClick={createSortHandler("filename")}>
                      Filename
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Customer
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    <TableSortLabel active={sortBy === "createdAt"} direction={order} onClick={createSortHandler("createdAt")}>
                      Created Time
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      paddingLeft: "20px",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ramanReader.ramanreaderCodeList.slice(0, rest.limit).map((ramanReader, index) => {
                  return (
                    <TableRow hover key={ramanReader.filename}>
                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          paddingLeft: "20px",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        <Box alignItems="center" display="flex">
                          <Typography
                            color="textPrimary"
                            variant="body1"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              fontSize: "14px"
                            }}
                          >
                            {ramanReader.filename}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        {ramanReader.account.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                          style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontSize: "14px"
                          }}
                        >
                          {moment(ramanReader.createdAt).format("DD-MMM-YYYY HH:mm:ss")}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        {ramanReader.location}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ align: "center" }}>
                          <IconButton style={{ color: "#cc0000" }} component="span" onClick={handleDeleteRamanreaderView.bind(null, ramanReader)}>
                            <Icon>delete</Icon>
                          </IconButton>
                          <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleDownload.bind(null, ramanReader)}>
                            <Icon>download</Icon>
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={ramanReader.totalItems}
          onChangePage={rest.handlePageChange}
          onChangeRowsPerPage={rest.handleLimitChange}
          page={rest.page}
          rowsPerPage={rest.limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Card>

      <Modal
        title={
          <div className="d-flex flex-row  align-items-center justify-content-center">
            <span style={{ fontSize: "20px", fontWeight: "600" }}>Confirmation</span>
          </div>
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
        visible={openReports}
        closable={false}
        footer={null}
      >
        <p>Are you sure you want to delete this file?</p>
        <br />
        <h4>{ramanreader && ramanreader.filename}</h4>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button style={{ backgroundColor: "#112855", color: "#ffff" }} variant="contained" onClick={handleReportsClose} className="mt-20 ml-20">
            <Icon>close</Icon>
            <span className="pl-8 capitalize">Close</span>
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            style={{ color: "white", backgroundColor: "#cc0000" }}
            variant="contained"
            onClick={handleDeleteRamanreader.bind(null, ramanreader)}
            type="primary"
            className="mt-20"
          >
            <Icon>delete</Icon>
            <span className="pl-8 capitalize">Delete</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  ramanreaderCodeList: PropTypes.array.isRequired
};

export default Results;
