import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Artist from './containers/Artist/Artist.tsx';
import Album from './containers/Album/Album.tsx';
import NoFound from './components/NoFound/NoFound.tsx';
import Track from './containers/Track/Track.tsx';
import Header from './components/Header/Header.tsx';

const App = () => (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artist />} />
            <Route path="/albums/:id" element={<Album/>} />
            <Route path="/tracks/:id" element={<Track/>} />
            <Route path="*" element={<NoFound/>} />
          </Routes>
        </Container>
      </main>
    </>
);

export default App
