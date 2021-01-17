import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField
} from '@material-ui/core';
import { SocketContext } from '../context/SocketContext';

export const AnimeList = ({ animes }) => {
  const [rows, setRows] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setRows(animes);
  }, [ animes ]);

  const handleChangeName = ({ target }, animeId) => {
    setRows(rows => rows.map(row => {
      if (row.id === animeId) {
        row.name = target.value;
      }
      return row;
    }));
  }

  const handleIncreaseVotes = (animeId) => {
    socket.emit('increase-vote', animeId);
  }

  const handleDeleteAnime = (animeId) => {
    socket.emit('delete-anime', animeId);
  }

  const handleOnBlurChangeName = (animeId, name) => {
    socket.emit('change-name', { id: animeId, name });
  }

  return (
    <Container className='anime-list-container'>
      <Grid container>
        <Grid item xs={ 12 }>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Increase</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Votes</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              rows?.map(row => (
                <TableRow key={ row.id }>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      color='primary'
                      onClick={ () => handleIncreaseVotes(row.id) }>+1</Button>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="add-anime"
                      label="Anime"
                      variant="outlined"
                      name='anime'
                      value={ row?.name }
                      onChange={ e => handleChangeName(e, row.id) }
                      onBlur={ () => handleOnBlurChangeName(row.id, row.name) }
                      />
                  </TableCell>
                  <TableCell align="center">
                    <span className='votes-label'>{row.votes}</span>
                  </TableCell>
                  <TableCell align="right">
                  <Button
                    variant="contained"
                    color='secondary'
                    onClick={ () => handleDeleteAnime(row.id) }
                    >Delete</Button>
                  </TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
