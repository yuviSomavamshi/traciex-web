import {
  GET_DASHBOARD_LC,
  GET_DASHBOARD_CC,
  GET_DASHBOARD_TC,
  CHANGE_COLOR,
  GET_DASHBOARD_STATS,
  GET_DASHBOARD_AVG
} from "../actions/DashboardActions";
import { APPNAME } from "../../Constants";

const initialState = {
  lc: { location: 0 },
  cc: {
    totalCustomers: 0,
    todayCount: 0
  },
  stats: [],
  tc: {
    patients: 0,
    results: {
      totalHits: 0,
      invalid: 0,
      positive: 0,
      negative: 0
    }
  },
  graphData: {
    series: [
      {
        name: "aa",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "bb",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }
    ],

    options: {
      chart: {
        type: "bar",

        toolbar: {
          show: false
        }
      },
      title: {
        text: APPNAME + " Test Trend",
        align: "left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#284CEB"
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        title: {
          text: "Customers",
          style: {
            color: "#284CEB",
            fontSize: "13px"
          }
        },
        categories: [
          "Changi Term 1",
          "Changi Term 2",
          "Changi Term 3",
          "Changi Term 4",
          "Changi Term 5",
          "Changi Term 6",
          "Changi Term 7",
          "Changi Term 8",
          "Changi Term 9"
        ]
      },

      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#519FF0"
          },
          labels: {
            style: {
              colors: "#519FF0"
            }
          },
          title: {
            text: "Total Covid Test",
            style: {
              color: "#519FF0",
              fontSize: "13px"
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
            color: "#FF8B51"
          },
          labels: {
            style: {
              colors: "#FF8B51"
            }
          },
          title: {
            text: "Average time (secs)",
            style: {
              color: "#FF8B51",
              fontSize: "13px"
            }
          }
        }
      ],
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      },
      colors: ["#519FF0", "#FF8B51"]
    }
  }
};

const DashboardReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LC: {
      return {
        ...state,
        lc: action.payload
      };
    }
    case GET_DASHBOARD_CC: {
      return {
        ...state,
        cc: action.payload
      };
    }
    case GET_DASHBOARD_TC: {
      return {
        ...state,
        tc: action.payload
      };
    }
    case GET_DASHBOARD_AVG: {
      return {
        ...state,
        usage: action.payload
      };
    }
    case GET_DASHBOARD_STATS: {
      return {
        ...state,
        stats: [...action.payload]
      };
    }
    case CHANGE_COLOR: {
      return {
        ...state,
        color: action.color
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default DashboardReducer;
