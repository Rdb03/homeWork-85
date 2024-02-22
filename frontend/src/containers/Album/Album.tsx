import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAlbum } from '../../app/albumThunk.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AlbumItem from './AlbumItem.tsx';
import { selectArtist } from '../../app/artistSlice.ts';
import { fetchArtistById } from '../../app/artistThunk.ts';
import { selectAlbums } from '../../app/albumSlice.ts';

const Album = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artist = useAppSelector(selectArtist);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAlbum(id));
    dispatch(fetchArtistById(id));
  }, [dispatch, id]);


  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item sx={{width: '100%'}}>
            <Typography sx={{fontSize: '35px'}}>{artist ? `${artist.name}'s Albums` : <CircularProgress/>}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          {albums ? albums.map(album => (
            <AlbumItem
              name={album.name}
              image={album.image}
              date={album.date}
              key={album._id}
              id={album._id}
            />
          )) : <h1 style={{margin: '100px auto'}}>Artist no Found</h1>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Album;