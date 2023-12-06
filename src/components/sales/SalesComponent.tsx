import React, { useEffect, useState } from "react";
import * as Styled from "./SalesComponent.styled";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { Chart, registerables } from "chart.js";

import { getSalesData } from "../../api/handlers";

Chart.register(...registerables);

interface SalesData {
  id: number;
  paymentMethod: string;
  price: number;
  productName: string;
  saleTimestamp: string;
}

const SalesComponent: React.FC = () => {
  const [data, setData] = useState<SalesData[] | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await getSalesData();
        setData(sales);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchData();
  }, []);

  const generateChartData = (): ChartData<"bar", SalesData, unknown> => {
    const labels = data
      ? data.map((item: SalesData) => item.saleTimestamp)
      : [];
    const priceData = data ? data.map((item: SalesData) => item.price) : [];

    return {
      labels,
      datasets: [
        {
          label: "Sales Data",
          data: priceData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Bar Graph of Sales Data</h1>
      {data && <Bar data={generateChartData()} />}
    </div>
  );
};

export default SalesComponent;
