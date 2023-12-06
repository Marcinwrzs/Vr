import { Route, Routes } from "react-router-dom";
import SalesComponent from "../../components/sales/SalesComponent";
import TemperatureComponent from "../../components/temperature/TemperatureComponent";
import SalesSummaryComponent from "../../components/salesSummary/SalesSummaryComponent";
import Home from "../../components/home/Home";
import * as Styled from "./Pages.styled";

export enum Paths {
  Home = "/",
  Sales = "/sales",
  Temperature = "/temperature",
  SalesSummary = "/salesSummary",
}

const Pages: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Routes>
        <Route path={Paths.Home} element={<Home />} />
        <Route path={Paths.Sales} element={<SalesComponent />} />
        <Route path={Paths.Temperature} element={<TemperatureComponent />} />
        <Route path={Paths.SalesSummary} element={<SalesSummaryComponent />} />
      </Routes>
    </Styled.Wrapper>
  );
};

export default Pages;
