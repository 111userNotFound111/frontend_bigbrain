import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
import CallAPI from '../../callAPI';
import { useParams } from 'react-router-dom';
import NavBar from '../../component/navBar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, ListItem, ListItemText, } from '@mui/material';
import { styled } from '@mui/material/styles';
// this is the process part
const NewIframe = styled('iframe')({
  width: '400px',
  height: '400px',
  '@media (max-width: 500px)': {
    width: '100%',
  },
});
const Thumbnail = styled('img')({
  maxWidth: '70%',
  maxHeight: '400px',
  '@media (max-width: 1280px)': {
    maxWidth: '70%',
  },
  '@media (max-width: 850px)': {
    maxWidth: '70%',
    maxHeight: '70%',
  },
});

export default function PlayerProcess () {
  const { playerid } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStatus, setCurrentStatus] = useState(false);
  // for question title, thumbnail, countdown, options
  const [questionText, setQuestionText] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [answerIds, setAnswerIds] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);
  const [currentQuestionInfo, setCurrentQuestionInfo] = useState({})

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
    if (currentStatus === false) {
      intervalNum = setInterval(() => {
        statusUpdate();
      }, 5000); // poll every 5 seconds
    }
    console.log('Polling')
    return () => clearInterval(intervalNum)
  }, [currentStatus]);

  // if status is TRUE, get the first question
  async function getQuestion () {
    const updateQuestionInfo = await CallAPI('GET', `play/${playerid}/question`, '', '')
    if (JSON.stringify(currentQuestionInfo) !== JSON.stringify(updateQuestionInfo)) {
      console.log('update question value', JSON.stringify(updateQuestionInfo))
      console.log('the current question info is : ', JSON.stringify(currentQuestionInfo))
      setCorrectAnswerIds([])
      setCurrentQuestionInfo(updateQuestionInfo);
      setQuestionText(updateQuestionInfo.question.title);
      setThumbnail(updateQuestionInfo.question.thumbnail);
      setCountDown(updateQuestionInfo.question.timeLimit);
      setAnswer(updateQuestionInfo.question.answer);
    }
  }

  useEffect(() => {
    if (currentStatus) {
      console.log('the current status is true, get question')
      getQuestion();
    }
  }, [currentStatus])

  // convert base64 back to image
  function convertImg (thumbnail) {
    const image = new Image();
    image.src = thumbnail;
    return image;
  }

  // set count down timer
  useEffect(() => {
    if (countDown !== null && countDown > 0) {
      const timer = setInterval(() => {
        console.log('current Count Down is', countDown)
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  // submit answers
  function submitAnswerId () {
    console.log('submit answer starts')
    CallAPI('PUT', `play/${playerid}/answer`, '', { answerIds })
      .then((data) => { console.log(data) })
      .catch((error) => setErrorMessage(error.message))
  }

  // get correct Answer
  function getCorrectAnswer () {
    console.log('get correct answer starts')
    CallAPI('GET', `play/${playerid}/answer`, '', {})
      .then((data) => { setCorrectAnswerIds(data.answerIds) })
  }

  useEffect(() => {
    if (countDown === 0) {
      getCorrectAnswer();
    }
  }, [countDown]);
  console.log('ANSERS ARE ', correctAnswerIds)

  useEffect(() => {
    let pollInterval;

    if (currentStatus) {
      console.log('111111111update question begin here1111111')
      pollInterval = setInterval(() => {
        getQuestion();
      }, 5000); // poll every 5 seconds
    }

    return () => clearInterval(pollInterval);
  }, [currentStatus, currentQuestionInfo]);

  return (
    <div>
      <NavBar /> <br />
      {currentStatus === false
        ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70vh',
            }}
          >
            <p
              role="img"
              aria-label="waiting-for-session"
              style={{ fontSize: '300%' }}
            >
              ⏳ Please Wait For Session to Begin ⏳
            </p>
          </div>
          )
        : (
          <div style={{ marginBottom: '50px' }}>
            {correctAnswerIds.length === 0
              ? (
                <div>
                  <Stack style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                  </Stack>
                  <br />
                  <div>
                    <div>
                      <h3>Question:</h3>
                      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                        <Typography variant="body1" style={{ width: '70%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', backgroundColor: '#f2f2f2', }}>
                          {questionText}
                        </Typography>
                      </div>

                    </div>
                    <div>
                      <h3>Thumbnail:</h3>
                      {thumbnail && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {thumbnail && thumbnail.match(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=(.*)/)
                              ? (
                                <NewIframe width="400" height="450" src={`https://www.youtube.com/embed/${RegExp.$1}`} title="YouTube" allowFullScreen />
                                )
                              : (
                                <Thumbnail
                                  src={thumbnail ? convertImg(thumbnail).src : 'https://i.imgur.com/3oqzZ8K.png'}
                                  alt="thumbnail"
                                />
                                )}
                          </div> <br />
                        </div>
                      )}
                      {!thumbnail && <p>No thumbnail available.</p>}
                    </div>
                    <div>
                      <h3>Countdown:</h3>
                      <p>{countDown} seconds remaining</p>
                    </div>
                    <div>
                      <h3>Answers:</h3>
                      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                        {answer
                          .filter((item) => item !== false)
                          .map((item, index) => (
                            <FormControlLabel key={index} label={item} control={<Checkbox id={`${index}`} name={`${index}`} value={item} onChange={(checkbox) => {
                              if (checkbox.target.checked) {
                                setAnswerIds((prevAnswerId) => [...prevAnswerId, index]);
                              } else {
                                setAnswerIds((prevAnswerId) => prevAnswerId.filter((id) => id !== index));
                              }
                            }} />} sx={{ width: '70%', height: '50px', backgroundColor: '#2E8BC0', display: 'block', border: '1px solid #ccc', marginBottom: '10px', '&:hover': { backgroundColor: '#B1D4E0', cursor: 'pointer', }, }} />
                          ))}
                        <br /> <br />
                        <Button onClick={submitAnswerId} variant='contained' color='primary' style={{ width: '50%', backgroundColor: '#FFBF00', }}>Finish Question</Button>
                      </div>
                    </div>
                  </div>
                </div>
                )
              : (
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                  <h1>The correct answers are </h1> <br />
                  <div style={{ paddingTop: '20px' }}>
                    {correctAnswerIds.map((item, index) => (
                      <ListItem key={index} style={{
                        backgroundColor: '#e6f3ff',
                        width: '100%',
                      }}>
                        <ListItemText primary={answer[item]} />
                      </ListItem>
                    ))}
                  </div>
                  <Button onClick={getQuestion} style={{ paddingTop: '20px' }}> The Question</Button>
                </div>
                )
            }
          </div>
          )}
    </div>
  );
}
