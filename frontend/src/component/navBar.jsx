import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import createQuiz from './createQuiz';
import { useState, useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateModal () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newQuizName, setNewQuizName] = React.useState('')
  const [confirmIsDisabled, confirmSetIsDisabled] = useState(true);

  useEffect(() => {
    if (newQuizName.length > 0) {
      confirmSetIsDisabled(false);
    } else {
      confirmSetIsDisabled(true);
    }
  }, [newQuizName]);
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            create a quiz
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            name:<Input value={newQuizName} onChange={(name) => { if (name.target) setNewQuizName(name.target.value) }} type="text" />
          </Typography>
          <Button variant="contained" onClick={() => { createQuiz(newQuizName); handleClose(); window.location.href = '/dashboard'; }} disabled={confirmIsDisabled} sx={{ m: 2 } } >Confirm</Button>
          <Button variant="outlined" onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}

function Logout () {
  localStorage.clear();
  window.location.reload();
}

export default function ButtonAppBar () {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <CreateModal /> {/* 在这里使用组件 */}
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={Logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
