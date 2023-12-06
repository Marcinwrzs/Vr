import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*  width: 90%; */
  /* margin: 0 auto;
  max-width: 1400px; */

  @media (max-width: 600px) {
    h1 {
      font-size: 18px;
    }
  }
`;
