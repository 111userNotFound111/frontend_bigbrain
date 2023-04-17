import * as React from 'react';
import NavBar from '../component/navBar.jsx'; // 重命名组件
import { useParams, } from 'react-router-dom';
// import createGame from './component/createQuiz.jsx';
// import ShowQuizInCard from '../component/showQuiz.jsx';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2';
// import { useEffect } from 'react';
// import Box from '@mui/material/Box';
import CallAPI from '../callAPI.jsx';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import ReactDOM from 'react-dom';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// this is edit quiz profile function
async function startQuiz (quizId, onSuccess, onError) {
  await CallAPI('POST', `admin/quiz/${quizId}/start`, localStorage.getItem('token'), '').then(() => {
    onSuccess();
    // then get the
  }).catch(() => {
    onError();
  });
}

function playingGame () {
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = React.useState(null);

  const handleSuccess = () => {
    setResult(1);
  };

  const handleError = () => {
    setResult(0);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const { quizId } = useParams();
  startQuiz(quizId, handleSuccess, handleError);
  return (
    <>
      <NavBar />
      <Button variant="contained" onClick={() => { }}>copy session link</Button>
      {result === 0 && <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="already started"
        action={action}
      />}
    <br />
    </>
  )
}

export default playingGame;
