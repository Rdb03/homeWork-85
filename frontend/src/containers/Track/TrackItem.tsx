import { Card, Grid } from '@mui/material';

interface Props {
  name: string,
  album: string,
  duration: string,
  number: number
}

const TrackItem: React.FC<Props> = ({name, number, duration}) => {
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
          <p style={{fontWeight: 'bold'}}>{number}</p>
          <p style={{fontSize: '25px'}}>{name}</p>
          <p>{duration}</p>
        </Card>
      </Grid>
    </div>
  );
};

export default TrackItem;