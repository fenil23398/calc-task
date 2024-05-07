import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.3,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Calc Results Line Chart",
    },
  },
};

export const chartData = {
  datasets: [
    {
      label: "Calc Results Representation",
      //   data: [10233, 55, 70, 9090909, 78, 89, 90],
      borderColor: "rgb(7, 90, 90)",
      backgroundColor: "rgb(7, 90, 90, 0.5)",
    },
  ],
};

interface LineChartProps {
  labels: Array<String>;
  data: Array<Number>;
}

const LineChart = ({ labels, data }: LineChartProps) => {
  return (
    <Box w={{ base: "100%", md: "520px" }} position="relative">
      <Line
        key={Math.random()}
        options={options}
        data={{
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data,
            },
          ],
        }}
      />
    </Box>
  );
};

export default LineChart;
