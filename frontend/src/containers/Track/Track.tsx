import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import React, { useEffect } from 'react';
import { selectTrack } from '../../app/trackSlice.ts';
import TrackItem from './TrackItem.tsx';
import { fetchTrack } from '../../app/trackThunk.ts';
import { useParams } from 'react-router-dom';
import { fetchAlbumById } from '../../app/albumThunk.ts';
import { selectAlbum } from '../../app/albumSlice.ts';
import { ITrack } from '../../../type';

interface Props {
  addToHistory: (track: ITrack) => void;
}

const Track: React.FC<Props> = ({addToHistory}) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTrack);
  const album = useAppSelector(selectAlbum);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTrack(id));
    dispatch(fetchAlbumById(id));
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item sx={{width: "100%"}}>
          <Typography sx={{margin: '0 auto', fontWeight: 'bold', fontSize: '50px'}} variant="h4">{album ? album.artist.name : ''}</Typography>
          <Typography sx={{margin: '0 auto 50px', fontWeight: 'bold', fontSize: '50px'}} variant="h4">{album ? album.name : 'Not found'}</Typography>
          <Typography sx={{margin: '0 auto', fontWeight: 'bold'}} variant="h4">Tracks</Typography>
        </Grid>
      </Grid>
      <Grid item sx={{display: 'flex', flexDirection: 'column'}} container spacing={2}>
        {tracks ? tracks.map(track => (
          <TrackItem
            key={track._id}
            track={track}
            onClick={addToHistory}
          />
        )) : <CircularProgress/>}
      </Grid>
    </Grid>
  );
};

export default Track;