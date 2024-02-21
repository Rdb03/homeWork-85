import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Artist from './containers/Artist/Artist.tsx';
import Album from './containers/Album/Album.tsx';

const App = () => (
    <>
      <header>

      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artist />} />
            <Route path="/albums/:id" element={<Album/>} />
          </Routes>
        </Container>
      </main>
    </>
);

export default App
