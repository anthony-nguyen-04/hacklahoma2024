import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import axios from "axios";

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  isThreadOpen: boolean,
  setIsThreadOpen: React.Dispatch<React.SetStateAction<boolean>>,
  threadID: string
}

const ThreadModal = ({
  isThreadOpen, setIsThreadOpen, threadID
}: Props) => {
  const handleThreadClose = () => setIsThreadOpen(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");  
  const [author, setAuthor] = useState("");  
  const [createdAt, setCreatedAt] = useState("");  

  useEffect(() => {
    const getThreadData = async () => {
      let thread;
      try {
        const response = await axios.get(`https://runitback-api.sambird.dev/forum/${threadID}?jwt=${localStorage['jwt']}`)
        thread = response.data

        setTitle(thread.title);
        setContent(thread.content);
        setAuthor(thread.author.email);
        setCreatedAt(thread.createdAt);

      } catch (err) {
        console.error(err)
      }
    }

    getThreadData();
  }, [isThreadOpen])

  return(
    <Modal
      open={isThreadOpen}
      onClose={handleThreadClose}
    >
      <Box sx={style}>
        <Typography variant="h2">
          {title}
        </Typography>
        <Typography variant="caption">
          Posted by "{author}" at {createdAt}
        </Typography>
        <Typography variant="h4">
          {content}
        </Typography>
      </Box>
    </Modal>
  );
}

export default ThreadModal;