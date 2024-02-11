import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import axios from "axios"
import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";

const PlayContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const PlayCenterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Play = () => {
  const [userId, setUserId] = useState("")

  useEffect(() => {

      const token = localStorage['jwt'];

      if (!token)
        return setUserId("not logged in!");
  
      axios.get(`https://runitback-api.sambird.dev/userId?jwt=${token}`)
        .then((response)=>{
          setUserId(response.data)
          console.log(response)
        })
        .catch((err: any) => console.error(err))
      
  }, [])

  return (
    <PlayContainer>
      <ThemeProvider theme={fontTheme}>
        <PlayCenterContainer>
          <Button
            variant="contained"
            style={{maxWidth: '1000px', maxHeight: '300px', minWidth: '1000px', minHeight: '300px'}}
            href="https://runitback-api.sambird.dev/download/game.exe"  
          >
            <Typography variant="h1">
              DOWNLOAD HERE
            </Typography>
          </Button>
          <Typography variant="h5" style={{color: "#eee"}}>
            Your UserID is "{userId}""
          </Typography>
        </PlayCenterContainer>
      </ThemeProvider>
    </PlayContainer> 
  );
}

export default Play;