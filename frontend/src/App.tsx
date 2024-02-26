import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Artist from './containers/Artist/Artist.tsx';
import Album from './containers/Album/Album.tsx';
import NoFound from './components/NoFound/NoFound.tsx';
import Track from './containers/Track/Track.tsx';
import Header from './components/Header/Header.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import TrackHistory from './components/TrackHistory/TrackHistory.tsx';
import { useState } from 'react';
import { ITrack, ITrackHistory } from '../type';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { trackHistoryThunk } from './app/trackHistoryThunk.ts';
import { selectUser } from './app/usersSlice.ts';

const App = () => {
  const dispatch = useAppDispatch();
  const [trackHistory, setTrackHistory] = useState<ITrackHistory[]>([]);
  const user = useAppSelector(selectUser);

  console.log(trackHistory);
  console.log(user?.token);


  const addTrackToHistory = async (trackItem: ITrack) => {
    if (user) {
      const token = user.token;
      const trackID = trackItem._id;

      if (token) {
        try {
          await dispatch(trackHistoryThunk([token, trackID]));

          setTrackHistory((prevState) => {
            return [{ trackItem }, ...prevState];
          });
        } catch (error) {
          console.error('Error dispatching trackHistoryThunk:', error);
        }
      } else {
        console.error('Token is undefined');
      }
    } else {
      alert('You are not logged in!');
    }
  };


  const trackHistoryItem = () => {
    if(user) {
      return <TrackHistory tracks={trackHistory}/>
    } else {
      return null
    }
  }

  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="app-main">
        {trackHistoryItem()}
        <Container maxWidth="xl" sx={{marginTop: '50px'}}>
          <Routes>
            <Route path="/" element={<Artist/>}/>
            <Route path="/albums/:id" element={<Album/>}/>
            <Route path="/tracks/:id" element={<Track addToHistory={addTrackToHistory}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NoFound/>}/>
          </Routes>
        </Container>
      </main>
    </>
    );
};

export default App
