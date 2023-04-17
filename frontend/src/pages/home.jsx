import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// this is player join part

function home () {
  const navigate = useNavigate();
  function onClickAdmin () {
    if (localStorage.getItem('token') === null) {
      navigate('/signIn');
    } else {
      navigate('/dashboard');
    }
  }
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <Button variant="contained" onClick={onClickAdmin}>Admin</Button>
      <div style={{ width: '10px' }}></div>
      <Button variant="contained" onClick={() => navigate('/kahoot.it')}>User</Button>
  </div>
  )
}

export default home;
