import { useEffect, useState, useRef } from "react";
import { Chart } from "./chart";
import useScreenSize from "@/hooks/useScreenSize";
import { ApexOptions } from "apexcharts";

const useChartOptions = (labels: string[], colors: string[]): ApexOptions => {
  return {
    chart: {
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: colors,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#FFFFFF"],
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        color: "#000000",
        opacity: 0.5,
      },
      formatter: function (val: number) {
        return `${val.toFixed(1)}%`;
      },
    },
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
      labels: {
        colors: ["#FFFFFF"],
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "100%",
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      marker: {
        show: true,
        fillColors: ["#FFFFFF"],
      },
      y: {
        formatter: function (val: number) {
          return `${val.toFixed(1)}%`;
        },
      },
    },
    fill: {
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.7,
        gradientToColors: colors,
        opacityFrom: 0.8,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    yaxis: {
      show: false,
    },
  };
};

export const TokenAllocation = (props: any) => {
  const { allocations } = props;
  const labels = allocations.map(
    (allocation: any) => allocation.attributes.Title
  );
  const chartSeries = allocations.map(
    (allocation: any) => allocation.attributes.Percentage
  );
  const colors = allocations.map(
    (allocation: any) => allocation.attributes.Color
  );
  const chartOptions = useChartOptions(labels, colors);

  return (
    <div className="">
      <Chart
        height="500" // Grafik yüksekliği
        options={chartOptions}
        series={chartSeries} // Grafik serisi
        type="pie" // Polar alan grafiği türü
        width="500" // Grafik genişliği
      />
    </div>
  );
};
