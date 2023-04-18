import React, { useEffect } from 'react';
// import Button from '@mui/material/Button';
import CallAPI from '../../callAPI';
import { useParams } from 'react-router-dom';
import NavBar from '../../component/navBar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// this is the process part

export default function PlayerProcess () {
  const { playerid } = useParams();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentStatus, setCurrentStatus] = React.useState(false);
  // for question title, thumbnail, countdown, options
  const [currentQuestion, setCurrentQuestion] = React.useState('');

  // First : continously poll until status change from false to true
  async function statusUpdate () {
    await CallAPI('GET', `play/${playerid}/status`, '', '')
      .then((data) => {
        setCurrentStatus(data.started)
      })
      .catch((error) => { setErrorMessage(error.message) })
  }

  // Continouse polling getQuestion until questions are received
  useEffect(() => {
    let intervalNum = 0
    if (currentQuestion === '') {
      intervalNum = setInterval(() => {
        statusUpdate();
      }, 5000); // poll every 5 seconds
    }
    return () => clearInterval(intervalNum)
  }, [currentQuestion, statusUpdate]);

  // if status is TRUE, get the first question
  async function getQuestion () {
    const questionInfo = await CallAPI('GET', `play/${playerid}/question`, '', '')
    setCurrentQuestion(questionInfo.question)
  }

  useEffect(() => {
    if (currentStatus) {
      getQuestion();
    }
  }, [currentStatus])

  console.log('the current question is : ', currentQuestion)
  if (currentQuestion) {
    console.log('the current question title : ', currentQuestion.title)
  }

  return (
    <div>
      <NavBar/> <br />
      {currentStatus === false
        ? (
          <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', }}>
          <p role='img' aria-label='waiting-for-session' style={ { fontSize: '300%' } }> ⏳ Please Wait For Session to Begin ⏳ </p>
        </div>
          )
        : (
        <div>
          <Stack style={{ justifyContent: 'center', alignItems: 'center', }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Stack> <br />

          <>Render the Question here</>
        </div>
          )}
    </div>
  )
}
