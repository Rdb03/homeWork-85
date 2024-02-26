import React from 'react';
import { Card, Grid } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { ITrack } from '../../../type';


interface Props {
  track: ITrack;
  onClick: (track: ITrack) => void;
}

const TrackItem: React.FC<Props> = ({track, onClick}) => {

  return (
    <div>
      <Grid
        item sm md={6} lg={4}
        sx={{textDecoration: 'none', margin: '30px auto'}}
      >
        <Card sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 25px',
          alignItems: 'center'
        }}>
          <p style={{fontWeight: 'bold'}}>{track.number}</p>
          <p style={{fontSize: '25px', margin: '0 auto 0 80px'}}>{track.name}</p>
            <PlayCircleOutlineOutlinedIcon sx={{
              marginRight: '50px',
              cursor: 'pointer',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '100px'
            }} onClick={() => onClick(track)}/>
          <p>{track.duration}</p>
        </Card>
      </Grid>
    </div>
  );
};

export default TrackItem;