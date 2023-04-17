import * as React from 'react';
import NavBar from '../component/navBar.jsx'; // 重命名组件
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import callAPI from '../callAPI.jsx'

// this is edit quiz profile function
function playingGame () {
  // this is the session id
  // const { sessionId } = useParams();
  const { quizId } = useParams();
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [stage, setStage] = React.useState('');
  const handleSuccess = () => {
    setResult(0);
  };

  // const handleError = () => {
  // setResult(0);
  // };
  const handleStartButtonClick = () => {
    callAPI('POST', `admin/quiz/${quizId}/start`, localStorage.getItem('token'), '').then((data) => {
      setStage(data.stage);
      console.log('stage', data.stage);
    });
    handleSuccess();
    console.log('already started', stage);
  };

  const handleNextButtonClick = () => {
    callAPI('POST', `admin/quiz/${quizId}/advance`, localStorage.getItem('token'), '').then((data) => {
      setStage(data.stage);
      console.log('stage', data.stage);
    });
    handleSuccess();
    console.log('already started', stage);
  };

  const handleEndButtonClick = () => {
    callAPI('POST', `admin/quiz/${quizId}/end`, localStorage.getItem('token'), '').then((data) => {
      setStage(data.stage);
      console.log('stage', data.stage);
    });
    handleSuccess();
    console.log('already started', stage);
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
  return (
    <>
      <NavBar />
      <h1>Current Stage:{stage}</h1>
      <Button variant="contained" onClick={handleStartButtonClick}>Start</Button>
      <Button variant="contained" onClick={handleNextButtonClick}>Next question</Button>
      {result === 0 && <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="already started"
        action={action}
      />}
      <Button variant="contained" onClick={handleEndButtonClick}>End</Button>
    <br />
    </>
  )
}

export default playingGame;
