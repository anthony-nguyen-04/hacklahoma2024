import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import jwt from "jwt-encode";

import styled from "@emotion/styled";
import LogoutButton from "./Auth0/Logout";
import LoginButton from "./Auth0/Login";

import config from "../config.json";

const AuthenticatorContainer = styled.section`
  display: flex;
  gap: 10px;
`;

const Authenticator = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userID, setUserID] = useState();

  useEffect(() => {
    if (isAuthenticated)
    {
      if (user)
      {
        const packet : { [key: string]: string } = {
          email: (user.email ?? "default@gmail.com")
        };
  
        var token = jwt(packet, config["JWT_SECRET"]);
  
        localStorage['jwt'] = token;
        localStorage["name"] = user.name;
        localStorage["image"] = user.picture;

        axios.get(`https://runitback-api.sambird.dev/userId?jwt=${token}`)
        .then((response)=>{
          setUserID(response.data)
          console.log(response)
        })
        .catch((err: any) => console.error(err))

        axios.get(`https://runitback-api.sambird.dev/login?email=${user.email}&jwt=${token}`)
          .catch((err: any) => console.error(err))

        localStorage["userID"] = userID;
      }
    }

  }, [isAuthenticated]);

  return (
    isAuthenticated ? 
    (
      <AuthenticatorContainer>
         <Box
            component="img"
            sx={{ height: 48 }}
            alt={user!.name}
            src={user!.picture}
          />
          <LogoutButton />
      </AuthenticatorContainer>
    )
    :
    (
      <AuthenticatorContainer>
        <LoginButton />
      </AuthenticatorContainer>
    )
  );

}

export default Authenticator;

