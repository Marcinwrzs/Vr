import { Route, Routes } from "react-router-dom";
import SalesComponent from "../../components/sales/SalesComponent";
import TemperatureComponent from "../../components/temperature/TemperatureComponent";
import SalesSummaryComponent from "../../components/salesSummary/SalesSummaryComponent";
import Home from "../../components/home/Home";
import * as Styled from "./Pages.styled";
import RegistrationComponent from "../../components/registration/RegistrationComponent";
import EditUserComponent from "../../components/editUser/EditUserComponent";

export enum Paths {
  Home = "/",
  Sales = "/sales",
  Temperature = "/temperature",
  SalesSummary = "/salesSummary",
  Registration = "/registration",
  /* EditUser = "/editUser", */
  EditUser = "/editUser",
}

const Pages: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Routes>
        <Route path={Paths.Home} element={<Home />} />
        <Route path={Paths.Sales} element={<SalesComponent />} />
        <Route path={Paths.Temperature} element={<TemperatureComponent />} />
        <Route path={Paths.SalesSummary} element={<SalesSummaryComponent />} />
        <Route path={Paths.Registration} element={<RegistrationComponent />} />
        <Route
          path={`${Paths.EditUser}/:userId`}
          element={<EditUserComponent />}
        />
      </Routes>
    </Styled.Wrapper>
  );
};

export default Pages;
