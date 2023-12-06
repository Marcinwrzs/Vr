import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  ul {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      margin: 0 5px;
      font-size: 18px;
      text-decoration: none;
      color: black;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 18px;
    }
  }
`;

export const Link = styled(NavLink)`
  text-decoration: none;

  &:hover {
    color: red;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
