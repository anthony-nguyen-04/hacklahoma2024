import React, { useState } from "react";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";

const TimesContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const Times = () => {
  return (
    <TimesContainer>
     
    </TimesContainer> 
  );
}

export default Times;