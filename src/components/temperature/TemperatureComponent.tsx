import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { Chart, registerables } from "chart.js";
import * as Styled from "./TemperatureComponent.styled";
import { getTemperatureData } from "../../api/handlers";

Chart.register(...registerables);

interface TemperatureData {
  id: number;
  temperature: number;
  timestamp: string;
}

const TemperatureComponent: React.FC = () => {
  const [salesData, setSalesData] = useState<TemperatureData[] | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTemperatureData();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchData();
  }, []);

  const generateChartData = (): ChartData<"line", TemperatureData, unknown> => {
    const labels = salesData
      ? salesData.map((item: TemperatureData) => item.timestamp)
      : [];
    const temperatureData = salesData
      ? salesData.map((item: TemperatureData) => item.temperature)
      : [];

    return {
      labels,
      datasets: [
        {
          label: "Temperature Data",
          data: temperatureData,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <Styled.Wrapper>
      <h1>Liniowy wykres temperatury</h1>
      {salesData && <Line data={generateChartData()} />}
    </Styled.Wrapper>
  );
};

export default TemperatureComponent;
