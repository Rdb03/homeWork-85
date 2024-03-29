import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { postTrack } from '../../app/trackHistoryThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';
import { deleteTrack, fetchTracks, patchTrack } from '../../app/trackThunk.ts';

interface Props {
  name: string;
  number: number;
  duration: string;
  id: string;
  isPublished: boolean
}

const TrackItem: React.FC<Props> = (props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const id = props.id;
  const url = window.location.href;
  const idAlbum = url.substring(url.lastIndexOf('/') + 1);

  const goPostTrack = () => {

    if(!user) {
      alert('Go Login!')
    }

    const track = {
      track: props.id,
    };

    dispatch(postTrack(track));
  };

  const trackDelete = async () => {
    if(user) {
      const token = user.token;
      await dispatch(deleteTrack({id, token}));
      await dispatch(fetchTracks(idAlbum));
    }
  };

  const trackPatch = async () => {
    if(user) {
      const token = user.token;
      await dispatch(patchTrack({id, token}));
      await dispatch(fetchTracks(idAlbum));
    }
  };

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
          <p style={{fontWeight: 'bold'}}>{props.number}</p>
          <p style={{fontSize: '25px', margin: '0 auto 0 80px'}}>{props.name}</p>
            <PlayCircleOutlineOutlinedIcon sx={{
            marginRight: '50px',
            cursor: 'pointer',
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '100px'
          }} onClick={goPostTrack}/>
          <p>{props.duration}</p>
          {user?.role === 'admin' ?
            <Grid>
              <Button variant="outlined" color="error" onClick={trackDelete}>Delete</Button>
            </Grid>
            : null
          }
          {user?.role === 'admin' && !props.isPublished ?
            <Grid>
              <Button variant="contained" color="success" onClick={trackPatch}>Publish</Button>
            </Grid>
            : null
          }
          <Typography sx={{marginLeft: 'auto', color: 'red'}}>{!props.isPublished ? 'unpublished' : null}</Typography>
        </Card>
      </Grid>
    </div>
  );
};

export default TrackItem;