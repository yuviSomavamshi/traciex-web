import React, { Component } from "react";
import barChart from "../../../styles/img/bar-chart.svg";
import hello from "../../../styles/img/hello.svg";
import { DatePicker, Form, Button } from "antd";
import { Grid, Typography } from "@material-ui/core";
import { getCustomerCount, getLocationCount, getTestCount, getUsageStats, changeColor } from "../../redux/actions/DashboardActions";
import DataTable from "./shared/DataTable";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import SwitchMI from "@material-ui/core/Switch";
import { Switch } from "antd";
import { APPNAME } from "../../Constants";

const PurpleSwitch = withStyles({
  switchBase: {
    color: blue[500],
    "&$checked": {
      color: blue[500]
    },
    "&$checked + $track": {
      backgroundColor: blue[500]
    },
    "& + $track": {
      backgroundColor: blue[500]
    }
  },
  checked: {},
  track: {}
})(SwitchMI);

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

class Dashboard1 extends Component {
  state = {
    lc: {},
    cc: {},
    tc: {},
    form: null,
    stats: [],
    usage: {},
    graphSwitch: true.valueOf,
    graphToggle: false,
    startDate: moment(),
    endDate: moment(),
    avg: 0,
    noData: {
      text: undefined,
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined
      }
    },
    series: [
      {
        name: "Total COVID-19 Tests",
        data: (this.props.usage && this.props.usage.count.slice(0, 10)) || []
      },
      {
        name: "Average Time Taken (in Secs)",
        data: (this.props.usage && this.props.usage.average.slice(0, 10)) || []
      }
    ],
    options: {
      type: "bar",
      chart: {
        height: 350,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#ff6e54", "#ffa600"],
      stroke: {
        width: [4, 4]
      },
      markers: {
        size: 6
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#ff6e54"
          },
          floating: false,
          decimalsInFloat: undefined,
          labels: {
            style: {
              colors: "#ff6e54"
            },
            formatter: function (value) {
              return value.toFixed(0);
            }
          },
          title: {
            text: "Total COVID-19 Tests",
            style: {
              color: "#ff6e54",
              fontSize: "15px"
            }
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#ffa600"
          },
          labels: {
            style: {
              colors: "#ffa600"
            },
            formatter: function (value) {
              return value.toFixed(0);
            }
          },
          title: {
            text: "Average Time Taken (in Secs)",
            style: {
              color: "#ffa600",
              fontSize: "15px"
            }
          }
        }
      ],
      legend: {
        show: false
      }
    }
  };

  componentDidMount() {
    const [form] = Form.useForm();

    form.setFieldsValue({
      Picker: [moment().startOf("month"), moment()]
    });

    this.setState({
      form
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.usage) {
      let stats = [];
      let cnt = 0;
      for (let i = 0; i < nextProps.usage.data.length; i++) {
        cnt += nextProps.usage.average[i];
        stats.push({
          id: i,
          name: nextProps.usage.data[i],
          count: nextProps.usage.count[i]
        });
      }
      let avg = 0;
      if (nextProps.usage.data.length > 0) {
        avg = Number(cnt / nextProps.usage.data.length).toFixed(0);
      }
      let avgInsec = [];
      if (nextProps.usage.average.length > 0) {
        nextProps.usage.average.forEach((val) => {
          avgInsec.push((val % 60000).toFixed(0));
        });
      }

      this.setState({
        avg: avg,
        stats: stats,
        series: [
          {
            name: "Total COVID-19 Tests",
            data: nextProps.usage.count.slice(0, 10)
          },
          {
            name: "Average Time Taken (in Secs)",
            data: avgInsec.slice(0, 10)
          }
        ],
        options: {
          ...this.state.options,
          xaxis: {
            categories: nextProps.usage.data.slice(0, 10),
            title: {
              text: this.state.graphSwitch ? "Top 10 Customers" : "Top 10 Locations"
            }
          }
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.lc.location !== prevProps.lc.location) {
      this.props.getLocationCount();
    }

    if (this.props.cc.totalCustomers !== prevProps.cc.totalCustomers) {
      this.props.getCustomerCount();
    }
  }
  componentDidMount() {
    this.props.getCustomerCount();
    this.props.getLocationCount();
    this.props.getUsageStats(this.state.startDate, this.state.endDate, this.state.graphSwitch ? "customerId" : "location");
    this.props.getTestCount(this.state.startDate, this.state.endDate);
  }
  onSwitchChange = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
      series: [
        {
          name: "Total COVID-19 Tests",
          data: []
        },
        {
          name: "Average Time Taken (in Secs)",
          data: []
        }
      ],
      options: {
        ...this.state.options,
        xaxis: {
          categories: []
        }
      }
    });
    this.props.getUsageStats(this.state.startDate, this.state.endDate, event.target.checked ? "customerId" : "location");
  };

  onDateChange = (newValue) => {
    this.setState({
      ...this.state,
      startDate: newValue && newValue.length > 0 && newValue[0],
      endDate: newValue && newValue.length > 1 && newValue[1]
    });
  };

  onFilter = () => {
    this.props.getUsageStats(this.state.startDate, this.state.endDate, this.state.graphSwitch ? "customerId" : "location");
    this.props.getTestCount(this.state.startDate, this.state.endDate);
  };

  getGreetingMessage = () => {
    let dt = new Date().getHours();
    if (dt >= 0 && dt <= 11) {
      return "Good Morning";
    } else if (dt >= 12 && dt <= 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  onGraphSwitch = (checked) => {
    console.log(checked ? "line" : "bar");
    this.setState({ graphToggle: checked, options: { ...this.state.options, type: checked ? "line" : "bar" } });
  };

  render() {
    let { lc, cc, tc } = this.props;
    let authUser = JSON.parse(localStorage.getItem("auth_user"));
    console.log(this.state.options, "--", this.state.graphToggle);
    return (
      <main>
        <div className="main__container">
          {/* <!-- MAIN TITLE STARTS HERE --> */}

          <div className="d-flex flex-row justify-content-between ">
            <div className="d-flex flex-row">
              <img width="100" src={hello} alt="hello" />
              <div className=" pl-2 d-flex justify-content-end  flex-column">
                <h4>{this.getGreetingMessage()}</h4>
              </div>
            </div>

            <div className="d-flex flex-row  justify-content-between align-items-end " style={{ width: "34rem" }}>
              <div className="d-flex flex-row">
                <Form layout="horizontal" name="Picker" form={this.state.form}>
                  <Form.Item name="range" rules={[{ required: true, message: "Please select the date range" }]}>
                    <DatePicker.RangePicker
                      startText="Start Date"
                      endText="End Date"
                      defaultValue={[this.state.startDate, this.state.endDate]}
                      disabledDate={(d) => d.isAfter(moment())}
                      onChange={this.onDateChange}
                    />
                  </Form.Item>
                </Form>
                <Button className="ant-input-button  border rounded-right" htmlType="submit" type="primary" onClick={this.onFilter}>
                  Filter
                </Button>
              </div>
              <div>
                <FormGroup>
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      {this.state.graphSwitch ? <Grid item>Top 10 Customers</Grid> : <Grid item>Top 10 Locations</Grid>}
                      <Grid item>
                        <PurpleSwitch checked={this.state.graphSwitch} onChange={this.onSwitchChange("graphSwitch")} name="graphSwitch" />
                      </Grid>
                    </Grid>
                  </Typography>
                </FormGroup>
              </div>
            </div>
          </div>

          {/* <!-- MAIN TITLE ENDS HERE --> */}

          {/* <!-- MAIN CARDS STARTS HERE --> */}
          <div className="main__cards">
            <div className=" p-2 bg-white border rounded">
              <div className="p-2">
                <i className="fa fa-tachometer fa-2x text-yellow " aria-hidden="true"></i>
              </div>
              <div className=" d-flex justify-content-between alignt-items-center">
                <p className="text-primary-p">Turnaround Time(in Secs.)</p>
                <h2 className="font-weight-bold ">{this.state.avg}</h2>
              </div>
            </div>

            <div className=" p-2 bg-white border rounded">
              <div className="p-2">
                <i className="fa fa-users fa-2x text-red" aria-hidden="true"></i>
              </div>
              <div className=" d-flex   justify-content-between alignt-items-center">
                <p className="text-primary-p">Customers</p>
                <h2 className="font-weight-bold">{cc.totalCustomers}</h2>
              </div>
            </div>

            <div className=" p-2 bg-white border rounded">
              <div className="p-2">
                <i className="fa fa-map-marker fa-2x text-lightblue" aria-hidden="true"></i>
              </div>
              <div className=" d-flex   justify-content-between alignt-items-center">
                <p className="text-primary-p ">Locations</p>
                <h2 className="font-weight-bold ">{lc.location}</h2>
              </div>
            </div>

            <div className=" p-2 bg-white border rounded">
              <div className="p-2">
                <i className="fa fa-wheelchair fa-2x text-green" aria-hidden="true"></i>
              </div>
              <div className=" d-flex   justify-content-between alignt-items-center">
                <p className="text-primary-p">Users</p>
                <h2 className="font-weight-bold ">{tc.patients}</h2>
              </div>
            </div>
          </div>
          {/* <!-- MAIN CARDS ENDS HERE --> */}

          {/* <!-- CHARTS STARTS HERE --> */}
          <div className="charts">
            <div className="charts__left">
              <div className="charts__left__title">
                <div className="d-flex ">
                  <h4>{APPNAME} Test Trend</h4>
                  <div className="ml-2">
                    <Switch
                      size="small"
                      style={{ backgroundColor: "#1DA57A" }}
                      checkedChildren="Line"
                      unCheckedChildren="Bar"
                      onChange={this.onGraphSwitch}
                    />
                  </div>
                </div>
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
              </div>
              {/* <Chart /> */}
              {this.props.usage && this.props.usage.count.length != 0 ? (
                <ReactApexChart
                  options={this.state.options}
                  height="300"
                  width="100%"
                  type={this.state.graphToggle ? "line" : "bar"}
                  series={this.state.series}
                />
              ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <div>
                    <img style={{ opacity: "0.5" }} src={barChart} width="100" />
                  </div>
                  <Typography variant="body2" color="secondary">
                    No data found!
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="charts__below">
            <div className="table__left">
              <div className="charts__right__title">
                <div>
                  <h4>{this.state.graphSwitch ? "Customer" : "Location"} Statistics </h4>
                </div>
                <i className="fa fa-list bg-danger" aria-hidden="true"></i>
              </div>
              <div>
                <DataTable data={this.state.stats} />
              </div>
            </div>
            <div className="charts__right">
              <div className="charts__right__title">
                <div>
                  <h4>Status Report</h4>
                </div>
                <i className="fa fa-file" aria-hidden="true"></i>
              </div>

              <div className="charts__right__cards">
                <div className="card1">
                  <h5>Total Tests</h5>
                  <h6>{tc.results && tc.results.totalHits}</h6>
                </div>

                <div className="card4">
                  <h5>Positive</h5>
                  <h6>{tc.results && tc.results.positive}</h6>
                </div>

                <div className="card2">
                  <h5>Negative</h5>
                  <h6>{tc.results && tc.results.negative}</h6>
                </div>

                <div className="cardinvalid">
                  <h5>Invalid</h5>
                  <h6>{tc.results && tc.results.invalid}</h6>
                </div>

                <div className="cardpending">
                  <h5>Pending</h5>
                  <h6>{tc.results && tc.results.pending}</h6>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- CHARTS ENDS HERE --> */}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  getCustomerCount: PropTypes.func.isRequired,
  getLocationCount: PropTypes.func.isRequired,
  getTestCount: PropTypes.func.isRequired,
  getUsageStats: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  lc: state.dashboard.lc,
  cc: state.dashboard.cc,
  tc: state.dashboard.tc,
  usage: state.dashboard.usage,
  stats: state.dashboard.stats,
  color: state.dashboard.color
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getCustomerCount,
    getLocationCount,
    getTestCount,
    getUsageStats,
    changeColor
  })(Dashboard1)
);
