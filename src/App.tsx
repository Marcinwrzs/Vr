import React from "react";
import TemperatureComponent from "./components/temperature/TemperatureComponent";
import SalesComponent from "./components/sales/SalesComponent";
import * as Styled from "./App.styled";
import Pages from "./layout/pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Header from "./layout/header/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Styled.Wrapper>
        <Header />
        <Pages />
      </Styled.Wrapper>
    </BrowserRouter>
  );
};

export default App;
