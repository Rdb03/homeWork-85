import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { selectTrackHistories, selectTrackHistoryLoading } from '../../app/trackHistorySlice.ts';
import { fetchHistory } from '../../app/trackHistoryThunk.ts';


const TrackHistory = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectTrackHistories);
  const loading = useAppSelector(selectTrackHistoryLoading);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchHistory());
  }, [dispatch, user, navigate]);

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid>
      <Typography sx={{fontSize: '50px', fontWeight: 'bold'}}>Listening history</Typography>
      <Grid item>
        {history.map((item) => (
          <Grid sx={{
            display: 'flex',
            border: '3px solid black',
            justifyContent: 'space-between',
            margin: '20px',
            padding: '10px',
            height: '100px',
            alignItems: 'center',
            borderRadius: '10px'
          }} key={item._id}>
            <Typography sx={{fontSize: '30px', fontWeight: 'bold'}}>{item.artist ? item.artist.name : ''}</Typography>
            <Typography sx={{fontSize: '20px'}}>{item.trackName}</Typography>
            <Typography sx={{fontSize: '20px'}}>{item.date}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TrackHistory;
