import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Artist from './containers/Artist/Artist.tsx';
import Album from './containers/Album/Album.tsx';
import NoFound from './components/NoFound/NoFound.tsx';
import Track from './containers/Track/Track.tsx';
import Header from './components/Header/Header.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import TrackHistory from './containers/trackHistory/TrackHistory.tsx';
import TrackForm from './containers/Track/components/TrackForm.tsx';
import ArtistForm from './containers/Artist/components/ArtistForm.tsx';
import AlbumForm from './containers/Album/components/AlbumForm.tsx';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="app-main">
        <Container maxWidth="xl" sx={{marginTop: '50px'}}>
          <Routes>
            <Route path="/" element={<Artist/>}/>
            <Route path="/albums/:id" element={<Album/>}/>
            <Route path="/tracks/:id" element={<Track/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/track_history" element={<TrackHistory />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NoFound/>}/>
            <Route path="/newArtist" element={<ArtistForm />} />
            <Route path="/newAlbum" element={<AlbumForm />} />
            <Route path="/newTrack" element={<TrackForm />} />
          </Routes>
        </Container>
      </main>
    </>
    );
};

export default App
