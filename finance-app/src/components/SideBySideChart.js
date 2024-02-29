"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { labels } from "@/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Income VS Expense Bar Chart",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

function SideBySideChart({ dataIncome, dataExpense }) {
  const dataSet = {
    labels,
    datasets: [
      {
        label: "Income",
        data: dataIncome,
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Expense",
        data: dataExpense,
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
    ],
  };
  return <Bar options={options} data={dataSet} />;
}

export default SideBySideChart;
