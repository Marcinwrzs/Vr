import React, { useEffect, useState } from "react";
import * as Styled from "./SalesSummaryComponent.styled";

interface SalesData {
  id: number;
  paymentMethod: string;
  price: number;
  productName: string;
  saleTimestamp: string;
}

const SalesSummaryComponent: React.FC = () => {
  const [data, setData] = useState<SalesData[] | any>(null);
  const apiPath = `https://vr-test.vendorobotics.com/api`;

  const fetchSalesData = async () => {
    const response = await fetch(`${apiPath}/sales-data`);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await fetchSalesData();
        setData(sales);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Styled.Wrapper>
      <h1>Sales Summary</h1>
      {data && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Sale Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: SalesData) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.saleTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Styled.Wrapper>
  );
};

export default SalesSummaryComponent;
