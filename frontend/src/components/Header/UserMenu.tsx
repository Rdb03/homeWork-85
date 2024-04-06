import React, { useState } from 'react';
import { IUser } from '../../../type';
import { Link } from 'react-router-dom';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { logout } from '../../app/usersThunk.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../app/usersSlice.ts';
import { apiURL } from '../../../constants.ts';
import noImage from '../../assets/images/no-image.jpg';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  return (
    <>
      <Grid className="user-info" sx={{display: 'flex', alignItems: 'center'}}>
        {user?.googleID ? (
          <img style={{width: '50px', borderRadius: '100px'}} src={user?.image ? user?.image : noImage} alt="img"/>
        ) : (
          <img style={{width: '50px', borderRadius: '100px'}} src={user?.image ? apiURL + '/' + user?.image : noImage} alt="img"/>
        )}
        <Button color="inherit" onClick={handleClick}>
          Hello, {user.displayName ? user.displayName : user.email}!
        </Button>
      </Grid>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to={'/track_history'} style={{color: 'black', textDecoration: 'none'}}>Track History</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/newArtist'} style={{color: 'black', textDecoration: 'none'}}>Add artist</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/newAlbum'} style={{color: 'black', textDecoration: 'none'}}>Add album</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/newTrack'} style={{color: 'black', textDecoration: 'none'}}>Add track</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;