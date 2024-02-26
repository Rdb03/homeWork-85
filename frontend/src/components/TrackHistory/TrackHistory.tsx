import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ITrackHistory } from '../../../type';
import { selectTrackHistories, selectTrackHistoryLoading } from '../../app/trackHistorySlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';
import { fetchHistory } from '../../app/trackHistoryThunk.ts';

interface Props {
  tracks: ITrackHistory[];
}

const TrackHistory: React.FC<Props> = ({ tracks }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectTrackHistories);
  const loading = useAppSelector(selectTrackHistoryLoading);

  console.log(history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch, user]);

  return (
    <Grid sx={{ borderRight: '1px solid black', width: '20%' }}>
      <Typography sx={{ fontSize: '40px', marginTop: '50px', alignSelf: 'center' }}>Track history</Typography>
      {tracks.map((track, index) => (
        <Grid sx={{
          display: 'flex',
          justifyContent: 'center',
          border: '3px solid black',
          margin: '20px',
          borderRadius: '7px'
        }} item key={index}>
          <Typography>{track.trackItem.artist}</Typography>
          <Typography>{track.trackItem.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrackHistory;
