import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTrack, selectTrackLoading } from '../../app/trackSlice.ts';
import TrackItem from './TrackItem.tsx';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../../app/trackThunk.ts';
import { useEffect } from 'react';
import { selectUser } from '../../app/usersSlice.ts';

const Track = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTrack);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectTrackLoading);

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {tracks && !loading ?
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item sx={{width: '100%'}}>
            <Typography sx={{margin: '0 auto', fontWeight: 'bold', fontSize: '50px'}}
                        variant="h4">{tracks[0]?.album.name}</Typography>
            <Typography sx={{margin: '0 auto 50px', fontWeight: 'bold', fontSize: '50px'}}
                        variant="h4">{tracks[0]?.album.artist.name}</Typography>
            <Typography sx={{margin: '0 auto', fontWeight: 'bold'}} variant="h4">Tracks</Typography>
          </Grid>
        </Grid>
        <Grid item sx={{display: 'flex', flexDirection: 'column'}} container spacing={2}>
          {tracks.map((track) => (
            (user?.role !== 'admin' ? track.isPublished : track)  && <TrackItem
              key={track._id}
              name={track.name}
              duration={track.duration}
              number={track.number}
              isPublished={track.isPublished}
              id={track._id}
            />
          ))}
        </Grid>
      </Grid> : <CircularProgress/>}
    </>
  );
};

export default Track;