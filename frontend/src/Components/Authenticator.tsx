import React from "react";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";

import styled from "@emotion/styled";
import LogoutButton from "./Auth0/Logout";
import LoginButton from "./Auth0/Login";

const AuthenticatorContainer = styled.section`
  display: flex;
  gap: 10px;
`;

const Authenticator = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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

