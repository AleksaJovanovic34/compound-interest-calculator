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
        width: 801,
        borderRadius: 6,
        // borderColor: 'black',
        // borderWidth: 0.5,
        style : {
          fontFamily: 'Roboto Mono',
        },
        spacing: [50, 50, 10, 50],
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
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
      title: {
        text: null,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>${point.y:.2f}</b><br/>',
    },
    plotOptions: {
      column: {
        stacking: "normal",
        pointWidth: 80, // Adjust the width of the columns
      },
    },
    legend: {
        align: "left", // Align the legend to the right
        verticalAlign: "bottom", // Place the legend at the bottom
        layout: "horizontal", // Layout the items horizontally
      },
    series: [
      {
        name: "Savings",
        data: savings.map((value) => parseFloat(value.toFixed(2))), // Ensure proper formatting
        color: "#664282",
      },
      {
        name: "Interest",
        data: interest.map((value) => parseFloat(value.toFixed(2))),
        color: "#99731a",
      },
    ],
  };

  console.log(interest);
  console.log(savings);
  

  return <div><HighchartsReact highcharts={Highcharts} options={options} /></div>;
};

//h-[494px] border-[0.5px] border-black p-10 pt-20 bg-[#FBF7F5] rounded-sm

export default ChartData;
