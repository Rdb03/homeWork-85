import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <Grid sx={{
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
        <LibraryMusicIcon sx={{fontSize: '50px', marginLeft: '15px', color: 'green'}}/>
      </Grid>
      {user ? (
        <UserMenu user={user}/>
      ) : (
        <AnonymousMenu/>
      )}
    </Grid>
  );
};

export default Header;