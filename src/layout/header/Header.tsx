import React from "react";
import { Paths } from "../pages/Pages";
import * as Styled from "./Header.styled";

const Header: React.FC = () => {
  return (
    <Styled.Wrapper>
      <ul>
        <li>
          <Styled.Link to={Paths.Home}>Home</Styled.Link>
        </li>
        <li>
          <Styled.Link to={Paths.Temperature}>Temperature</Styled.Link>
        </li>
        <li>
          <Styled.Link to={Paths.Sales}>Sales</Styled.Link>
        </li>
        <li>
          <Styled.Link to={Paths.SalesSummary}>Sales summary</Styled.Link>
        </li>
      </ul>
    </Styled.Wrapper>
  );
};

export default Header;
