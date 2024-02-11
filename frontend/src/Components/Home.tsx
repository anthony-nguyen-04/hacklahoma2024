import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";

const HomeContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const HomeTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100%;
  width: 100%;
  overflow-wrap: anywhere;
`;

const fontTheme = createTheme(
  {
    typography: {
      fontFamily: [
        'Audiowide',
        'sans-serif',
      ].join(','),
    },
  }
);

const Home = () => {
  return (
    <HomeContainer>
     
      <HomeTextContainer>
        <Fade
          in={true}
          timeout={2000}
        >
          <div>
            <ThemeProvider theme={fontTheme}>
              <div>
                <Typography
                  color="#eee"
                  textAlign="center"
                  fontWeight={600}
                  variant={"h1"}
                >
                  RUN IT BACK
                </Typography>
                <Typography
                  color="#eee"
                  textAlign="center"
                  fontWeight={400}
                  variant={"h4"}
                >
                  Can You Survive?
                </Typography>
              </div>
            </ThemeProvider>
          </div>
        </Fade>
      </HomeTextContainer>
    </HomeContainer> 
  );
}

export default Home;