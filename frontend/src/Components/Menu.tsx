import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

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

const Menu = () => {
  return (
    <ThemeProvider theme={fontTheme}>
      <Box
        component="div"
      >
        {pagesValues.map((page) => (
          <Button key={page} href={`#${page.toLowerCase()}`}>
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
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default Menu;