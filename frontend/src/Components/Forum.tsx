import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";
import axios from "axios";
import { Button } from "@mui/material";
import CreateThreadModal from "./CreateThreadModal";

const ForumContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const CreateThreadContainer = styled.section`
  padding: 5%;
  min-height: 15%;
`;

const ForumContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: auto;
  overflow-wrap: anywhere;
  gap: 10px;
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

type Player = {
  email: string
}

type Reply = {
  author: Player,
  content: string
}

const Forum = () => {
  const [threads, setThreads] = useState([]);

  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const handleCreateThreadOpen = () => setIsCreatingThread(true);

  // useEffect(() => {
  //   const getThreads = async () => {

  //     let threads;
  //     try {
  //       const response = await axios.get(`https://runitback-api.sambird.dev/forum?jwt=${localStorage['jwt']}`)
  //       threads = response.data
  //     } catch (err) {
  //       console.error(err)
  //     }

  //     function createData(author: Player, title: string, content: string, key: string) {
  //       return { author, title, content, key };
  //     }

  //     const rows = []

  //     for (let thread of threads) {
  //       rows.push(createData(thread.author, thread.title, thread.content, thread.key))
  //     }

      
  //   getThreads();
  // }, [threads]);

  return (
    <>
      <ForumContainer>
        <CreateThreadContainer>
          <ThemeProvider theme={fontTheme}>
            <Button onClick={handleCreateThreadOpen} variant="contained">
                <Typography variant="h3">
                  CREATE THREAD
                </Typography>
            </Button>
            
          </ThemeProvider>
        </CreateThreadContainer>
        <ForumContentContainer>

        </ForumContentContainer>
      </ForumContainer> 
      <CreateThreadModal 
        isCreatingThread={isCreatingThread}
        setIsCreatingThread={setIsCreatingThread}
      />
    </>
  );
}

export default Forum;

