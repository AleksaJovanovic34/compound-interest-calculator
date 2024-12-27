import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

interface ChartProps {
  savings: number[];
  interest: number[];
}

const ChartData: React.FC<ChartProps> = ({ savings, interest }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Investment Results",
    },
    xAxis: {
      categories: savings.map((_, index) => index + 1),
      title: {
        text: "Years",
      },
    },
    yAxis: {
      min: 0,
      labels: {
        format: "${value}",
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>${point.y:.2f}</b><br/>',
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Savings",
        data: savings.map((value) => parseFloat(value.toFixed(2))), // Ensure proper formatting
        color: "#1f77b4",
      },
      {
        name: "Interest",
        data: interest.map((value) => parseFloat(value.toFixed(2))),
        color: "#ff7f0e",
      },
    ],
  };

  console.log(interest);
  console.log(savings);
  

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartData;
