import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // const data = [
  //   {
  //     date: "A",
  //     temp: 4000,
  //     //pv: 2400,
  //   },
  //   {
  //     date: "B",
  //     temp: 3000,
  //     //pv: 1398,
  //   },
  //   {
  //     date: "C",
  //     temp: 2000,
  //     //pv: 9800,
  //   },
  //   {
  //     date: "D",
  //     temp: 2780,
  //     //pv: 3908,
  //   },
  //   {
  //     date: "E",
  //     temp: 1890,
  //     //pv: 4800,
  //   },
  //   {
  //     date: "F",
  //     temp: 2390,
  //     //pv: 3800,
  //   },
  //   {
  //     date: "G",
  //     temp: 3490,
  //     // pv: 4300,
  //   },
  // ];
  return (
    <ResponsiveContainer width="70%" height={270}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 16 }} />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
        <Bar dataKey="temp" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
