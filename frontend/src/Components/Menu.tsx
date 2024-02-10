import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import { Link } from "react-router-dom";

import { pagesValues } from "./HeaderPages";

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

const colorHeaderTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#DD7D6C" //"#E35239AA" 
      },
    },
  }
);

const Menu = () => {
  return (
    <ThemeProvider theme={colorHeaderTheme}>
       <AppBar
            position="fixed"
            color={"transparent"}
            elevation={0}
          >
            
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <ThemeProvider theme={fontTheme}>
                <Box
                  component="div"
                >
                  {pagesValues.map((page) => (
                    <Link to={`/${page.toLowerCase()}`}>
                      <Button key={page}>
                        <Typography
                          color="#eee"
                          textAlign="center"
                          marginLeft="1rem"
                          marginRight="1rem"
                          fontWeight={400}
                        >
                          {page}
                        </Typography>
                      </Button>
                    </Link>
                  ))}
                </Box>
              </ThemeProvider>
              </Toolbar>
            
        </AppBar>
      </ThemeProvider>
  );
}

export default Menu;