import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ITrackHistory } from '../../../type';

interface Props {
  tracks: ITrackHistory[];
}

const TrackHistory: React.FC<Props> = ({ tracks }) => {

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
          <Typography>{track.trackItem.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrackHistory;
