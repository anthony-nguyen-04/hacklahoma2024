import React, { useState } from "react";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";
import Menu from "./Menu";

const PlayContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const Play = () => {
  return (
    <PlayContainer id="home">
     
    </PlayContainer> 
  );
}

export default Play;