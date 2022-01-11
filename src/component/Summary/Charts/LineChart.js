import React, { useEffect, useState } from "react";
import highcharts from "highcharts";

import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";

const generateOptions = (data,reportType) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));
  return {
    chart: {
      height: 500,
    },
    title: {
     
      text: `Tổng số ca nhiễm ${reportType === 'all' ? 'từ trước tới nay' : `${reportType} ngày`}`,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng Ca Nhiễm",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

 function LineChart({ data }) {
  const [reportType, setReportType] = useState("all");
  const [options, setOptions] = useState({});
  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "all":
        customData = data;
        break;
      case "30":
        customData = data.slice(data.length - 30);
        break;
      case "7":
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;
    }
    setOptions(generateOptions(customData,reportType));
  }, [data,reportType]);
  return (
    <div>
      <ButtonGroup 
        size="small"
        style={{ display: "flex", justifyContent: "center" , marginBottom: 4}}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => {
            setReportType("all");
          }}
        >
          Tất Cả
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => {
            setReportType("30");
          }}
        >
          30 Ngày{" "}
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => {
            setReportType("7");
          }}
        >
          7 Ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={highcharts} options={options} />
    </div>
  );
}
export default React.memo(LineChart)