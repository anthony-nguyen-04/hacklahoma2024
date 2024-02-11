import React, { useEffect } from "react";
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

        axios.get(`http://runitback-api.sambird.dev/login?email=${user.email}&jwt=${token}`);
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

