import React, { useState } from "react";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";

const ForumContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const Forum = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log({ thread });
      setThread("");
  };

  return (
    <ForumContainer>
      <form className='homeForm' onSubmit={handleSubmit}>
          <div className='home__container'>
              <label htmlFor='thread'>Title / Description</label>
              <input
                  type='text'
                  name='thread'
                  required
                  value={thread}
                  onChange={(e) => setThread(e.target.value)}
              />
          </div>
          <button className='homeBtn'>CREATE THREAD</button>
      </form>
    </ForumContainer> 
  );
}

export default Forum;

