import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Artist from './containers/Artist/Artist.tsx';

const App = () => (
    <>
      <header>

      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artist />} />
          </Routes>
        </Container>
      </main>
    </>
);

export default App
