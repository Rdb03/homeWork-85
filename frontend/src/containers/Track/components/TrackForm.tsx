import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums } from '../../../app/albumSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../app/usersSlice.ts';
import React, { useEffect, useState } from 'react';
import { fetchAllAlbums } from '../../../app/albumThunk.ts';
import { createTrack } from '../../../app/trackThunk.ts';
import { Button, Grid, Typography } from '@mui/material';

const TrackForm = () => {
  const navigate = useNavigate();
  const albums = useAppSelector(selectAlbums);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  console.log(user?.token);

  const [state, setState] = useState({
    name: '',
    number: '',
    album: '',
    duration: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchAllAlbums());
  }, [dispatch, user, navigate]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTrack = {
        name: state.name,
        album: state.album,
        number: +state.number,
        duration: state.duration,
      };

      if (user) {
        const token = user.token
        await dispatch(createTrack({ trackMutation: newTrack, token })).unwrap();
      }
      navigate('/');
    } finally {
      setState((prevState) => ({
        ...prevState,
        name: '',
        number: '',
        album: '',
        duration: '',
      }));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Grid>
      <Typography sx={{fontSize: '50px'}}>Track addition</Typography>
      <form onSubmit={onFormSubmit}>
        <Grid item sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

        }}>
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
            id="duration"
            onChange={inputChangeHandler}
            type="text"
            value={state.duration}
            name="duration"
            placeholder="Enter duration"
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
            type="number"
            value={state.number}
            name="number"
            placeholder="Enter number"
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
            name="album"
            value={state.album}
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
              Enter album
            </option>
            {albums.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </Grid>
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{
            marginTop: '20px'
          }}
        >
          Send
        </Button>
      </form>
    </Grid>
  );
};

export default TrackForm;