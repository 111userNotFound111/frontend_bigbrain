// input quiz id, output a card with with the basic info
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import CallAPI from '../callAPI.jsx';
export default function showQuizInCard (inputQuizId) {
  const [quizId] = useState(inputQuizId.inputQuizId);
  const [quizName, setQuizName] = useState('');
  CallAPI('GET', `admin/quiz/${inputQuizId.inputQuizId}`, localStorage.getItem('token'), '').then((data) => {
    console.log(data);
    setQuizName(data.name);
  }).catch((err) => {
    console.log(err);
  });
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <ClearIcon />
          </IconButton>
        }
        title={quizName}
      />
        <CardContent>
        <Typography variant="h5" component="div">
          quiz id: {quizId}
        </Typography>
      <br />
      <Typography variant="body2">
        time required: xxx
        <br />
      </Typography>
      <br />
      <Button size="small" variant="contained" >edit quiz</Button>
    </CardContent>
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