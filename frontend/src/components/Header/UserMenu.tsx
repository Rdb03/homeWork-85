import React, { useState } from 'react';
import { User } from '../../../type';
import { Button, Menu, MenuItem } from '@mui/material';

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

  return (
    <>
     <Button color="inherit" onClick={handleClick}>
       Hello, {user.username}!
     </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
        <MenuItem>TrackHistory</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;