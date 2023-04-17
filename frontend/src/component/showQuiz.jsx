// input quiz id, output a card with with the basic info
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditQuizModal from './editQuizModal.jsx';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import CallAPI from '../callAPI.jsx';
import CardMedia from '@mui/material/CardMedia';
import StartQuiz from './startQuizModal.jsx';
import CardActions from '@mui/material/CardActions';
import { Grid } from '@mui/material';
function deleteQuiz (quizId) {
  CallAPI('DELETE', `admin/quiz/${quizId}`, localStorage.getItem('token'), '');
  window.location.href = '/dashboard';
}

export default function showQuizInCard (inputQuizId) {
  const [quizId] = useState(inputQuizId.inputQuizId);
  const [quizName, setQuizName] = useState('');
  const [quizThumbnail, setQuizThumbnail] = useState('');
  useEffect(() => {
    CallAPI('GET', `admin/quiz/${inputQuizId.inputQuizId}`, localStorage.getItem('token'), '').then((data) => {
      setQuizName(data.name);
      if (data.thumbnail === undefined) {
        setQuizThumbnail(data.thumbnail);
      } else {
        setQuizThumbnail('https://i.imgur.com/3oqzZ8K.png');
      }
    }).catch(() => {
      console.log('error in showQuizInCard');
    });
  }, [])

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick = {() => deleteQuiz(inputQuizId.inputQuizId) } >
              <ClearIcon />
          </IconButton>
        }
        />
        <CardContent>
        <Typography variant="h5" component="div">
          name: {quizName}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          id: {quizId}
        </Typography>
        <CardMedia
        component="img"
        height="120"
        width="120"
        image={quizThumbnail}
        alt="quiz thumbnail"
      />
      <Typography variant="body2">
        time required: xxx
        <br />
      </Typography>
          <br />

        </CardContent>
        <CardActions>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <EditQuizModal inputQuizId={inputQuizId.inputQuizId} />
          </Grid>
            <Grid item>
            <StartQuiz inputQuizId={inputQuizId.inputQuizId} />
      </Grid>
    </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

// const [quizzes, setQuizzes] = React.useState([])

// async function fetchAllQuizzes () {
//   // console.log('the current token passed in is :', token)
//   const response = await fetch('http://localhost:5005/admin/quiz', {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   setQuizzes(data.quizzes)
//   // console.log(quizzes)
// }
