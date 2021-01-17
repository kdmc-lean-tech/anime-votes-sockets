import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import {
  TextField,
  Container,
  Grid,
  Box,
  Button
} from '@material-ui/core';
import { isRequired } from '../validators/formValidators';
import { SocketContext } from '../context/SocketContext';

const initialState = {
  name: null
}

export const AddAnime = () => {

  const {
    values,
    handleOnChange,
    handleOnSubmit,
    errors,
    isSubmitting } = useForm(initialState, submit);
  const { socket } = useContext(SocketContext);

  function submit() {
    socket.emit('add-anime', values.name);
  }

  return (
    <Container className='add-anime-container'>
      <Grid item xs={ 12 }>
      <h2 className='add-anime-title'>Add Anime</h2>

      <form noValidate autoComplete='off' onSubmit={ handleOnSubmit }>
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={ 9 }>
            <img src="https://pm1.narvii.com/7080/e20cfcab9df67c4e3d6d308673aa8cf6de478a7fr1-1080-912v2_uhq.jpg" alt=""/>
          </Grid>
        </Grid>
        <Box className='add-anime-input'>
          <TextField
            onChange={ e => handleOnChange(e, [isRequired]) }
            onBlur={ e => handleOnChange(e, [isRequired]) }
            id="add-anime"
            label="Add Anime"
            variant="outlined"
            name='name'
            value={ values.name ? values.name : '' }
            />
          { errors.name && <p className='validate-form-field'>Name is Required</p> }
        </Box>
        <Box className='add-anime-button'>
          <Button variant="contained" color="primary" type='submit' disabled={!isSubmitting}>
            Add
          </Button >
        </Box>
      </form>
      </Grid>
    </Container>
  );
}
