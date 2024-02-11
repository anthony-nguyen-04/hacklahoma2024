import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";
import axios from "axios";
import { Button } from "@mui/material";
import CreateThreadModal from "./CreateThreadModal";
import ThreadModal from "./ThreadModal";

const ForumContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  gap: 10px;
  overflow-y: scroll;
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

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Player = {
  email: string
}

type Reply = {
  author: Player,
  content: string
}

const Forum = () => {
  const [results, setResults] = useState<any[]>([]);
  const [clickedThreadID, setClickedThreadID] = useState<string>("");

  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const handleCreateThreadOpen = () => setIsCreatingThread(true);
  
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const handleThreadOpen = () => setIsThreadOpen(true);

  useEffect(() => {
    const getThreads = async () => {

      let threads;
      try {
        const response = await axios.get(`https://runitback-api.sambird.dev/forum?jwt=${localStorage['jwt']}`)
        threads = response.data
      } catch (err) {
        console.error(err)
      }

      function createData(author: Player, createdAt: string, title: string, content: string, key: string) {
        return { author, createdAt, title, content, key };
      }

      const rows = []

      for (let thread of threads) {
        rows.push(createData(thread.author, thread.createdAt, thread.title, thread.content, thread._id))
      }

      setResults(rows);
    }

    getThreads();
  }, [results, isCreatingThread])

  useEffect(() => {
    if (clickedThreadID)
    {
      handleThreadOpen();
    }
  }, [clickedThreadID])

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
          {
            (results.map((row) => (
              <Card
                sx={style}
                key={row.key}
                onClick={() => {
                  setClickedThreadID(row.key);
                }}>
                <Typography variant="h4">
                  {row.title}
                </Typography>
              </Card>
            )))
          }
        </ForumContentContainer>
      </ForumContainer> 
      <CreateThreadModal 
        isCreatingThread={isCreatingThread}
        setIsCreatingThread={setIsCreatingThread}
      />
      <ThreadModal 
        isThreadOpen={isThreadOpen}
        setIsThreadOpen={setIsThreadOpen}
        threadID={clickedThreadID}
      />
    </>
  );
}

export default Forum;

