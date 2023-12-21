import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { authState, defaultAuthState } from '../../states/authState';
import Image from 'next/image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const [user, setUser] = useRecoilState(authState); // authState should have user info and isAuthenticated flag
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(defaultAuthState); // Reset the auth state
    handleClose();
    router.push('/'); // Redirect to home page
  };

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Image
          src="/images/accessible-learning-ai-logo.png"
          alt="Accessible Learning AI Logo"
          width={60}
          height={60}
        />
        <p className="text-3xl font-bold ml-4">Accessible Learning</p>
      </div>
      <div>
        {user.isAuthenticated ? (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <SettingsIcon />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton color="inherit" onClick={() => router.push('/login')}>
            <AccountCircleIcon />
            <p>Login</p>
          </IconButton>
        )}
      </div>
    </header>
  );
}

export default Header;
