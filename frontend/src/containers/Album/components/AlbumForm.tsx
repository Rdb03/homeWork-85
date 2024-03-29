import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtists } from '../../../app/artistSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../app/usersSlice.ts';
import { fetchArtist } from '../../../app/artistThunk.ts';
import { createAlbum } from '../../../app/albumThunk.ts';
import { Button, Grid, Typography } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput.tsx';

const AlbumForm = () => {
  const artists = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    name: '',
    date: '',
    artist: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchArtist());
  }, [dispatch, user, navigate]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newAlbum = {
        name: state.name,
        artist: state.artist,
        date: state.date,
        image: file ? file : null,
      };

      if(user) {
        const token = user.token
        await dispatch(createAlbum({albumMutation: newAlbum, token})).unwrap();
        navigate('/');
      }
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
      <Typography sx={{fontSize: '50px'}}>Album addition</Typography>
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
            id="date"
            onChange={inputChangeHandler}
            type="number"
            value={state.date}
            name="date"
            placeholder="Enter date"
            style={{
              width: '300px',
              height: '40px',
              padding: '5px',
              boxSizing: 'border-box',
              margin: '10px'
            }}
          />
          <select
            id="select"
            name="artist"
            value={state.artist}
            onChange={inputChangeHandler}
            style={{
              width: '300px',
              height: '40px',
              padding: '5px',
              boxSizing: 'border-box',
              margin: '10px'
            }}
          >
            <option value="" disabled>
              Select an artist
            </option>
            {artists.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <Grid item>
            <FileInput
              label="Image"
              name="image"
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button sx={{marginTop: '30px'}} variant="contained" type="submit">
          Send
        </Button>
      </form>
    </Grid>
  );
};

export default AlbumForm;