import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../app/usersSlice.ts';
import { createArtist } from '../../../app/artistThunk.ts';
import { Button, Grid, Typography } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput.tsx';

const ArtistForm = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    name: '',
    info: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newArtist = {
        name: state.name,
        info: state.info,
        image: file ? file : null,
      };

      if (user) {
        const token = user.token
        await dispatch(createArtist({ artistMutation: newArtist, token })).unwrap();
      }
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Grid>
      <Typography sx={{fontSize: '50px'}}>Add artist</Typography>
      <form onSubmit={onFormSubmit}>
        <Grid>
          <input
            id="name"
            onChange={inputChangeHandler}
            type="text"
            value={state.name}
            name="name"
            placeholder="Enter name"
            style={{
              width: '300px',
              height: '40px',
              padding: '5px',
              boxSizing: 'border-box',
              margin: '10px'
            }}
          />
          <input
            id="info"
            onChange={inputChangeHandler}
            type="text"
            value={state.info}
            name="info"
            placeholder="Enter information"
            style={{
              width: '300px',
              height: '40px',
              padding: '5px',
              boxSizing: 'border-box',
              margin: '10px'
            }}
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={onChange}
          />
        </Grid>
        <Button sx={{marginTop: '30px'}} variant="contained" type="submit">
          Send
        </Button>
      </form>
    </Grid>
  );
};

export default ArtistForm;