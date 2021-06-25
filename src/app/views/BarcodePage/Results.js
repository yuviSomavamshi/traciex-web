import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Icon,
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Modal } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, barCode, ...rest }) => {
  const classes = useStyles();

  const [openReports, setOpenReports] = useState(false);
  const [barcode, setBarcode] = useState(null);
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
  const handleDeleteBarcodeView = (data) => {
    setBarcode(data);
    setOpenReports(!openReports);
  };

  const handleDeleteBarcode = (data) => {
    rest.handleDeleteBarcode(data);
    setOpenReports(!openReports);
  };

  const getStatusColor = (status) => {
    let result = "";
    if (status == 0) {
      result = "grey";
    } else if (status == 1) {
      result = "green";
    } else if (status == 2) {
      result = "red";
    } else {
      result = "black";
    }
    return result;
  };

  const getStatus = (status) => {
    let result = "";
    if (status == 0) {
      result = "Unassigned";
    } else if (status == 1) {
      result = "Assigned";
    } else if (status == 2) {
      result = "Scrapped";
    } else {
      result = "Unknown";
    }
    return result;
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
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      paddingLeft: "20px",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    <TableSortLabel active={sortBy === "code"} direction={order} onClick={createSortHandler("code")}>
                      Barcode
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
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
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Assigned/Scrapped Time
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    <TableSortLabel active={sortBy === "status"} direction={order} onClick={createSortHandler("status")}>
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
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
                {barCode.barCodeList.slice(0, rest.limit).map((barCode, index) => {
                  return (
                    <TableRow hover key={barCode.code}>
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
                              paddingBottom: "10px"
                            }}
                          >
                            {barCode.code}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        {moment(barCode.createdAt).format("DD-MMM-YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body1">
                          {barCode.status != 0 && moment(barCode.updatedAt).format("DD-MMM-YYYY HH:mm:ss")}
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        <Chip
                          key={barCode.code}
                          color="primary"
                          style={{ backgroundColor: getStatusColor(barCode.status) }}
                          label={getStatus(barCode.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {barCode.status == 0 ? (
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#cc0000"
                            }}
                            variant="contained"
                            onClick={handleDeleteBarcodeView.bind(null, barCode)}
                          >
                            <Icon>delete</Icon>
                            <span className="pl-8 capitalize">Delete</span>
                          </Button>
                        ) : null}
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
          count={barCode.totalItems}
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
        <p>Are you sure you want to delete this barcode?</p>
        <br />
        <h4>{barcode && barcode.code}</h4>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button style={{ backgroundColor: "#112855", color: "#ffff" }} variant="contained" onClick={handleReportsClose} className="mt-20 ml-20">
            <Icon>close</Icon>
            <span className="pl-8 capitalize">Close</span>
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            style={{ color: "white", backgroundColor: "#cc0000" }}
            variant="contained"
            onClick={handleDeleteBarcode.bind(null, barcode)}
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
  barCodeList: PropTypes.array.isRequired
};

export default Results;
