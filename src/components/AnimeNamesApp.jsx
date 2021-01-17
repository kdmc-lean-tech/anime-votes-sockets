import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { AddAnime } from './AddAnime';
import { AnimeList } from './AnimeList';
import { ElevationScroll } from '../utils/scrollUtils';
import { SocketContext } from '../context/SocketContext';
import { AnimeCharts } from './AnimeCharts';

export const AnimeNamesApp = (props) => {

  const { socket, online } = useContext(SocketContext);
  const [ animes, setAnimes ] = useState([]);

  useEffect(() => {
    socket.on('anime-list', ({ animes }) => {
      setAnimes(animes);
    });
    return () => socket.off('anime-list');
  }, [ socket ]);

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
              <Grid container>
                <Grid item>
                  <span>AnimeNames App (Sockets)</span>
                </Grid>
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <div className='status-container'>
        <span className='status-title'>Status:</span>
        {
          online ?
          <span className='status-online'>Online</span>
          :
          <span className='status-offline'>Offline</span>
        }
      </div>
      <Container>
        <Grid container>
          <Grid item xs={ 7 }>
            <AnimeCharts animes={ animes }/>
          </Grid>
          <Grid item xs={ 5 }>
            <AddAnime />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={ 12 }>
            <AnimeList animes={ animes }/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
