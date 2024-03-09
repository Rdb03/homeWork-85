import React, { useState } from 'react';
import { User } from '../../../type';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { logout } from '../../app/usersThunk.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../app/usersSlice.ts';

interface Props {
  user: User;
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
     <Button color="inherit" onClick={handleClick}>
       Hello, {user.username}!
     </Button>
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