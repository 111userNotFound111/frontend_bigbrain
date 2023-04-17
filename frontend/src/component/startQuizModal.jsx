// import CallAPI from '../callAPI.jsx';
import React, { useRef, useState } from 'react';
// import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CallAPI from '../callAPI.jsx';
import { useNavigate } from 'react-router-dom';

// this is edit quiz profile function
async function startQuizAPI (quizId) {
  console.log('inputQuizDetail');
  await CallAPI('POST', `admin/quiz/${quizId}`, localStorage.getItem('token'), '')
}

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

function StartQuizModal (quizId) {
  // modal
  const navigate = useNavigate();
  const textRef = useRef(null);
  const [buttonText, setButtonText] = useState('复制');
  const handleClick = () => {
    textRef.current.select();
    document.execCommand('copy');
    setButtonText('已经复制');
    setTimeout(() => {
      setButtonText('复制');
    }, 3000);
  };
  const [id] = React.useState(quizId.inputQuizId);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} >Start Quiz</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Start Game!
          </Typography>

          {/* Button */}
          <input type="text" ref={textRef} value="a s d" />
          <Button variant="contained" onClick={handleClick} sx={{ m: 2 }}>{ buttonText }</Button>
          <p style={{ margin: '20px 0' }} />
          <p style={{ margin: '20px 0' }} />
          <Button variant="contained" onClick={() => {
            handleClose();
            startQuizAPI(id);
            navigate(`/playingGame/${quizId.inputQuizId}`);
          }} sx={{ m: 2 }} >Go!</Button>
          <Button variant="outlined" onClick={() => { handleClose() }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default StartQuizModal;
