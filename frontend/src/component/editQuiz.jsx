// import CallAPI from '../callAPI.jsx';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import CallAPI from '../callAPI.jsx';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// this is edit quiz profile function
async function inputQuizDetail (quizId, inputQuestion, inputName, inputThumbnail) {
  console.log('inputQuizDetail');
  await CallAPI('PUT', `admin/quiz/${quizId}`, localStorage.getItem('token'), {
    questions: inputQuestion,
    name: inputName,
    thumbnail: inputThumbnail,
  })
  window.location.href = '/dashboard';
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

function editQuizModal () {
  // file
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = () => {
    console.log(selectedFile);
  };

  // modal
  const [editQuizId, setEditQuizId] = React.useState('');
  const [editQuizName, setEditQuizName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            edit quiz
          </Typography>

          {/* id */}
          <TextField id="standard-basic" label="quiz id" variant="standard" value={editQuizId}
            onChange={(id) => { if (id.target) setEditQuizId(id.target.value) }} type="text" />

          {/* name */}
          <TextField id="standard-basic" label="Name" variant="standard" value={editQuizName}
            onChange={(name) => { if (name.target) setEditQuizName(name.target.value) }} type="text" />

          {/* image */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            quiz thumbnail: <Stack spacing={2}>
      <Input variant="outlined" size="small" type="file" onChange={handleFileInput} />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            上传
          </Button>
          </Stack>
          </Typography>

          <hr style={{ margin: '20px 0' }} />
          <Button variant="contained" onClick={() => {
            console.log('editQuizId', editQuizId);
            inputQuizDetail(editQuizId, '',
              editQuizName, '');
            handleClose();
          }} sx={{ m: 2 }} >Confirm</Button>
          <Button variant="outlined" onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default editQuizModal;