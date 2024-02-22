import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Grid sx={{marginBottom: '50px', borderBottom: '2px solid black'}}>
      <Grid
        item sm md={6} lg={4}
        component={Link} to={'/'}
        sx={{textDecoration: 'none'}}
      >
        <Typography sx={{color: 'black', fontSize: '50px'}}>SpotyBi</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;