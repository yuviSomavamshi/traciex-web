import React from "react";
import ReactEcharts from "echarts-for-react";
import { merge } from "lodash";

import echarts from "echarts";

const defaultOption = {
  color: ["#37A2FF", "#FF033E"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["Total COVID-19 Tests", "COVID-19 Positive"]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["05 Mar 21", "06 Mar 21", "07 Mar 21", "08 Mar 21", "09 Mar 21", "10 Mar 2021"]
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "Total COVID-19 Tests",
      type: "line",
      stack: "总量",
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#FF033E"
          },
          {
            offset: 1,
            color: "#FF3161"
          }
        ])
      },
      emphasis: {
        focus: "series"
      }
    },
    {
      name: "COVID-19 Positive",
      type: "line",
      stack: "总量",
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(0, 221, 255)"
          },
          {
            offset: 1,
            color: "rgba(77, 119, 255)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      }
    }
  ]
};

const ModifiedAreaChart = ({ height, option }) => {
  return <ReactEcharts style={{ height: height }} option={merge({}, defaultOption, option)} />;
};

export default ModifiedAreaChart;
