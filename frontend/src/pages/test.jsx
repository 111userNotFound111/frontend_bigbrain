import React from 'react';
import Button from '@mui/material/Button';
import CallAPI from '../callAPI';

function checkSessionId (sessionId, name, onSuccess, onError) {
  console.log('checksessionId');
  CallAPI('POST', `play/join/${sessionId}`, localStorage.getItem('token'), {
    name,
  })
    .then(() => {
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    })
    .catch(() => {
      if (typeof onError === 'function') {
        onError();
      }
      console.log('error');
    });
}

function PlayingGame () {
  const [sessionId] = React.useState('123');
  const [result, setResult] = React.useState(null);

  const handleSuccess = () => {
    setResult(1);
  };

  const handleError = () => {
    setResult(0);
  };

  const handleButtonClick = () => {
    checkSessionId(sessionId, 'John Doe', handleSuccess, handleError);
  };

  return (
    <div>
      {/* ... */}
      <Button variant="contained" onClick={handleButtonClick}>
        Go
      </Button>
      {result === 1 && <p>Success!</p>}
      {result === 0 && <p>Error!</p>}
    </div>
  );
}

export default PlayingGame;
