import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTrack, selectTrackLoading } from '../../app/trackSlice.ts';
import TrackItem from './TrackItem.tsx';
import { useParams } from 'react-router-dom';
import { fetchAlbumById } from '../../app/albumThunk.ts';
import { selectAlbums } from '../../app/albumSlice.ts';
import { fetchTracks } from '../../app/trackThunk.ts';
import { useEffect } from 'react';

const Track = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTrack);
  const loading = useAppSelector(selectTrackLoading);
  const album = useAppSelector(selectAlbums);

  const { id } = useParams();

  console.log(tracks);

  useEffect(() => {
    if (id != null) {
      dispatch(fetchTracks(id));
    }
    dispatch(fetchAlbumById(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item sx={{width: "100%"}}>
          <Typography sx={{margin: '0 auto', fontWeight: 'bold', fontSize: '50px'}} variant="h4">{album.length ? album[0].artist.name : ''}</Typography>
          <Typography sx={{margin: '0 auto 50px', fontWeight: 'bold', fontSize: '50px'}} variant="h4">{album.length ? album[0].name : 'Not found'}</Typography>
          <Typography sx={{margin: '0 auto', fontWeight: 'bold'}} variant="h4">Tracks</Typography>
        </Grid>
      </Grid>
      <Grid item sx={{display: 'flex', flexDirection: 'column'}} container spacing={2}>
        {tracks && !loading ? tracks.map((track ) => (
          <TrackItem
            key={track._id}
            name={track.name}
            duration={track.duration}
            number={track.number}
            id={track._id}
          />
        )) : <CircularProgress/>}
      </Grid>
    </Grid>
  );
};

export default Track;