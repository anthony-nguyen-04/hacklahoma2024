import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import styled from "@emotion/styled";

import Background from "../Assets/Images/background.png";
import axios from "axios";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const TimesContainer = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const TimesTableContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100%;
  width: 100%;
  overflow-wrap: anywhere;
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

const Times = () => {
  const [ results, setResult ]: [ string[], Function ] = useState([])

  React.useEffect(() => {
    const getTimes = async () => {

      let times;
      try {
        const response = await axios.get(`https://runitback-api.sambird.dev/times?jwt=${localStorage['jwt']}`)
        times = response.data
      } catch (err) {
        console.error(err)
      }

      function createData(player: Player, time: number, date: string, key: string) {
        return { player, time, date, key };
      }

      const rows = []

      for (let time of times) {
        rows.push(createData(time.player, time.time, time.date, time.key))
      }

      setResult([(
        <TimesTableContainer>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Player</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.player.email}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TimesTableContainer>
      )])
    }
    getTimes();
  }, [results]);

  return (
    <TimesContainer>
      {results.length ? results : 'Loading...'}
    </TimesContainer> 
  );
}

export default Times;