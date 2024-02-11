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
  isCreatingThread: boolean,
  setIsCreatingThread: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateThreadModal = ({
  isCreatingThread, setIsCreatingThread
}: Props) => {
  const handleCreateThreadClose = () => setIsCreatingThread(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");  

  const createThread = () => {
    axios.post(`https://runitback-api.sambird.dev/forum/new`, {
      jwt: localStorage["jwt"],
      title,
      content
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }}
    )
    .then((response) => {
      console.log(response);
    });
  }

  return(
    <Modal
      open={isCreatingThread}
      onClose={handleCreateThreadClose}
    >
      <Box sx={style}>
        <Typography variant="h3">
          CREATE THREAD
        </Typography>
        <TextField
          name="TITLE"
          label="TITLE"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          name="CONTENT"
          multiline
          minRows={10}
          label="CONTENT"
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={(e) => {
            createThread();
            handleCreateThreadClose();
          }}
        >
          SUBMIT
        </Button>
      </Box>
    </Modal>
  );
}

export default CreateThreadModal;