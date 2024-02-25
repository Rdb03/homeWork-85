import { Grid, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Header = () => {
  return (
    <Grid sx={{
      marginBottom: '50px',
      borderBottom: '2px solid black',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px'
    }}>
      <Grid
        item
        component={Link} to={'/'}
        sx={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}
      >
        <Typography sx={{color: 'black', fontSize: '50px'}}>
          SpotyBi
        </Typography>
        <LibraryMusicIcon sx={{fontSize: '50px', marginLeft: '15px', color: 'black'}}/>
      </Grid>
      <Grid sx={{display: 'flex'}} item>
        <NavLink style={{
          marginRight: '30px',
          textDecoration: 'none',
          color: 'black'
        }} to={'/register'}>
          <Typography sx={{
            fontWeight: 'bold',
          }}>
            Sign up
          </Typography>
        </NavLink>
        <Typography sx={{}}>Sign in</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;