import React from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../pages/Pages";
import * as Styled from "./Header.styled";

const Header: React.FC = () => {
  return (
    <Styled.Wrapper>
      <ul>
        <li>
          <NavLink to={Paths.Home}>Home</NavLink>
        </li>
        <li>
          <NavLink to={Paths.Temperature}>Temperature</NavLink>
        </li>
        <li>
          <NavLink to={Paths.Sales}>Sales</NavLink>
        </li>
      </ul>
    </Styled.Wrapper>
  );
};

export default Header;
