// import CallAPI from '../callAPI.jsx';
import * as React from 'react';
// import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import CallAPI from '../callAPI.jsx';
import TextField from '@mui/material/TextField';

// this is edit quiz profile function
async function inputQuizDetail (quizId, inputQuestion, inputName, inputThumbnail) {
  console.log('inputQuizDetail');
  await CallAPI('PUT', `admin/quiz/${quizId}`, localStorage.getItem('token'), {
    questions: inputQuestion,
    name: inputName,
    thumbnail: inputThumbnail,
  })
  // window.location.href = '/dashboard';
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

function editQuizModal (quizId) {
  // modal
  const [editQuizId] = React.useState(quizId.inputQuizId);
  const [editQuizName, setEditQuizName] = React.useState('');
  const [editQuizThumbnail, setEditQuizThumbnail] = React.useState('');
  const handleFileInput = (event) => {
    setEditQuizThumbnail(URL.createObjectURL(event.target.files[0]));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} id={ editQuizId }>edit Quiz</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            edit quiz
          </Typography>

          {/* id */}
          {/* <TextField id="standard-basic" label="quiz id" variant="standard" value={editQuizId}
            onChange={(id) => { if (id.target) setEditQuizId(id.target.value) }} type="text" /> */}

          {/* name */}
          <TextField id="standard-basic" label="Name" variant="standard" value={editQuizName}
            onChange={(name) => { if (name.target) setEditQuizName(name.target.value) }} type="text" />

          {/* image */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Input variant="outlined" size="small" type="file" onChange={handleFileInput} />
          </Typography>

          {/* Button */}
          <p style={{ margin: '20px 0' }} />
          <Button variant="contained" onClick={() => {
            console.log('editQuizId', editQuizId);
            inputQuizDetail(editQuizId, '',
              editQuizName, editQuizThumbnail);
            handleClose();
          }} sx={{ m: 2 }} >Confirm</Button>
          <Button variant="outlined" onClick={() => { handleClose() }}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default editQuizModal;
