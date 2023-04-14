import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Toolbar, AppBar, } from '@mui/material';

export default function customNavBar () {
  const navigate = useNavigate();

  function Logout () {
    localStorage.clear();
    navigate('/signin');
  }

  function Dashboard () {
    navigate('/dashboard');
  }
  return (
        <>
              <nav>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="inherit" onClick={ Dashboard }>Dashboard</Button>
              <Button color="inherit" onClick={ Logout }>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </nav>
        </>
  )
}
