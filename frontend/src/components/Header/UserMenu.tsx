import React, { useState } from 'react';
import { User } from '../../../type';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { persist } from '../../app/store.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const logout = () => {
    localStorage.removeItem('persist:spotybi:users');
    persist.purge().then(() => {
      setAnchorEl(null);
      window.location.reload();
    });
  }

  return (
    <>
     <Button color="inherit" onClick={handleClick}>
       Hello, {user.username}!
     </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to={'/track_history'} style={{color: 'black', textDecoration: 'none'}}>Track History</Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;