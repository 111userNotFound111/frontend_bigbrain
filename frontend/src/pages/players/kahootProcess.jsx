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
// this is the process part

export default function PlayerProcess () {
  const { playerid } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStatus, setCurrentStatus] = useState(false);
  // for question title, thumbnail, countdown, options
  const [currentQuestionInfo, setCurrentQuestionInfo] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [answer, setAnswer] = useState([])
  // const [answerId, ]

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
    return () => clearInterval(intervalNum)
  }, [currentStatus]);

  // if status is TRUE, get the first question
  async function getQuestion () {
    const questionInfo = await CallAPI('GET', `play/${playerid}/question`, '', '')
    setCurrentQuestionInfo(questionInfo.question)
    setQuestionText(questionInfo.question.title)
    setThumbnail(questionInfo.question.thumbnail)
    setCountDown(questionInfo.question.timeLimit)
    setAnswer(questionInfo.question.answer)
  }

  useEffect(() => {
    if (currentStatus) {
      getQuestion();
    }
  }, [currentStatus])

  // convert base64 back to image
  function convertImg (thumbnail) {
    const image = new Image();
    image.src = thumbnail;
    return image;
  }

  if (currentQuestionInfo) {
    console.log('111111111111111111111111111111')
    console.log('the current question info : ', currentQuestionInfo)
    console.log('the current question text : ', questionText)
    console.log('the current thumbnail : ', thumbnail)
    console.log('the current countDown : ', countDown)
    console.log('the current answer : ', answer)
  }

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
          <Stack style={{ justifyContent: 'center', alignItems: 'center' }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Stack>
          <br />

          <div>
            <div>
              <h3>Question:</h3>
              <Typography variant="body1" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f5f5f5', }}>
                {questionText}
              </Typography>
            </div>
            <div>
              <h3>Thumbnail:</h3>
              {thumbnail && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {thumbnail && thumbnail.match(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=(.*)/)
                      ? (
                      <iframe width="400" height="450" src={`https://www.youtube.com/embed/${RegExp.$1}`} title="YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                        )
                      : (
                      <img
                        src={thumbnail ? convertImg(thumbnail).src : 'https://i.imgur.com/3oqzZ8K.png'}
                        alt="thumbnail"
                        style={{ width: '100%', height: '400px' }}
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
              {answer
                .filter((item) => item !== false)
                .map((item, index) => (
                  <FormControlLabel key={index} label={item} control={ <Checkbox id={`answer-${index}`} name={`answer-${index}`} value={item}/>} sx={{ backgroundColor: '#2E8BC0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', marginBottom: '5px', '&:hover': { backgroundColor: '#B1D4E0', cursor: 'pointer', }, }}/>
                ))}
            </div>
          </div>
        </div>
          )}
    </div>
  );
}
