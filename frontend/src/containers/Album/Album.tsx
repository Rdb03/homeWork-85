import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAlbum } from '../../app/albumThunk.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { selectAlbum } from '../../app/albumSlice.ts';
import { useParams } from 'react-router-dom';
import AlbumItem from './AlbumItem.tsx';

const Album = () => {
  const dispatch = useAppDispatch();
  const album = useAppSelector(selectAlbum);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch]);

  console.log(album);

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item sx={{width: "100%"}}>
            <Typography sx={{margin: '0 auto', fontWeight: 'bold'}} variant="h4">Albums</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          {album ? album.map(album => (
            <AlbumItem
              name={album.name}
              image={album.image}
              date={album.date}
              key={album._id}
              id={album._id}
            />
          )) : <CircularProgress/>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Album;