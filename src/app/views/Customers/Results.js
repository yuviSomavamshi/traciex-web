import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import LocationForm from "./LocationForm";
import { DatePicker, Form, Space } from "antd";
import PerfectScrollbar from "react-perfect-scrollbar";
import { url } from "../../Constants";
import axios from "axios";

import {
  Icon,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle
} from "@material-ui/core";
import QRCode from "react-qr-code";
import Viewdataform from "./Viewdataform";
import { Modal } from "antd";

const { RangePicker } = DatePicker;

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoc, setOpenLoc] = useState(false);
  const [locations, setLocations] = useState([]);
  const [openView, setOpenLocView] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [openReports, setOpenReports] = useState(false);

  const handleReportsClose = (event) => {
    setOpenReports(!openReports);
  };

  const handleAddReports = (event) => {
    form.resetFields();
    setCustomer(event);
    setOpenReports(!openReports);
  };

  const [customerSelected, setCustomer] = useState(null);
  const [qrString, setQRString] = useState("");

  const onImageCownload = (event) => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const handleDialogToggle = (location) => {
    setOpen(!open);
    setOpenLocView(!openView);
    if (customerId != null && location != null) {
      setQRString(`/patient-registration.html?staffId=${customerId}&location=${location}`);
    }
  };

  const handleAddviewdataform = (data) => {
    setLocations(data.locations);
    setCustomerId(data.id);
    setOpenLocView(!openView);
  };

  const handleViewdataClose = (event) => {
    setOpenLocView(!openView);
  };

  const handleQRCodeClose = (event) => {
    setOpen(!open);
  };

  const handleLocationClose = (event) => {
    setOpenLoc(!openLoc);
  };
  const [form] = Form.useForm();

  const filterByDate = (values) => {
    let fromDate = values.range[0].format("YYYY-MM-DD");
    let toDate = values.range[1].format("YYYY-MM-DD");

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt_token")
    };
    axios
      .get(url + `/barcode/report?customerId=${customerSelected.id}&start=${fromDate}&end=${toDate}`, {
        responseType: "blob",
        headers: headers
      })
      .then((response) => {
        const type = response.headers["content-type"];
        const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "UsageReport.xlsx";
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      paddingLeft: "20px",
                      width: "14%",
                      color: "#112855"
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Registration date
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      width: "15%",
                      color: "#112855"
                    }}
                  >
                    Location
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
                {customers.customerList.slice(0, rest.limit).map((customer, index) => {
                  return (
                    <TableRow hover key={customer.id}>
                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          paddingLeft: "20px",
                          wordWrap: "break-word",
                          width: "14%"
                        }}
                      >
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {customer.name}
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
                        {customer.email}
                      </TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "15%"
                        }}
                      >
                        {moment(customer.created).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Button variant="link" style={{ color: "#2f6bb4", marginLeft: "-30px" }} onClick={handleAddviewdataform.bind(null, customer)}>
                          Click here to view
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button color="primary" variant="contained" onClick={handleAddReports.bind(null, customer)}>
                          <Icon>download</Icon>
                          <span className="pl-8 capitalize">Reports</span>
                        </Button>
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
          count={customers.totalItems}
          onChangePage={rest.handlePageChange}
          onChangeRowsPerPage={rest.handleLimitChange}
          page={rest.page}
          rowsPerPage={rest.limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Card>
      <Dialog open={open} onClose={handleDialogToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" class="modalhead">
          Location QR Code
        </DialogTitle>
        <div
          className={{
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div className="m-40 center">
            <QRCode id="QRCode" value={qrString} />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button className="m-16 " color="primary" variant="contained" onClick={onImageCownload}>
              <Icon>download</Icon>
              <span className="pl-8 capitalize">Download</span>
            </Button>
            <Button className="m-16 " color="primary" variant="contained" onClick={handleQRCodeClose}>
              <Icon>close</Icon>
              <span className="pl-8 capitalize">Close</span>
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={openLoc} onClose={handleLocationClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
        <div
          className={{
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <LocationForm handleClose={handleLocationClose} customer={customerSelected} />
        </div>
      </Dialog>

      <Modal
        title={
          <div className="d-flex flex-row  align-items-center justify-content-center">
            <span style={{ fontSize: "20px", fontWeight: "600", color: "#112855" }}>Usage Report</span>
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
        <Form layout="vertical" name="Picker" form={form} onFinish={filterByDate}>
          <Space style={{ float: "right" }}>
            <Form.Item name="range" rules={[{ required: true, message: "Please select the date range" }]}>
              <RangePicker
                startText="Start Date"
                endText="End Date"
                disabledDate={(date) => {
                  return date.isAfter(moment());
                }}
                className="ant-input-form"
              />
            </Form.Item>
          </Space>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button style={{ backgroundColor: "#112855", color: "#ffff" }} variant="contained" onClick={handleReportsClose} className="mt-20 ml-20">
              <Icon>close</Icon>
              <span className="pl-8 capitalize">Close</span>
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button style={{ backgroundColor: "#112855", color: "#ffff" }} variant="contained" htmlType="submit" type="primary" className="mt-20">
              <Icon>download</Icon>
              <span className="pl-8 capitalize">Download</span>
            </Button>
          </div>
        </Form>
      </Modal>

      <Dialog open={openView} onClose={handleViewdataClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" class="modalhead" style={{ color: "#112855" }}>
          {" "}
          Locations
        </DialogTitle>
        <div
          className={{
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Viewdataform handleClose={handleViewdataClose} customer={customerSelected} handleOpen={handleDialogToggle} locations={locations} />
        </div>
      </Dialog>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
