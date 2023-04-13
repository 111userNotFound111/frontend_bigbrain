import React from 'react';
import NavBar from './component/navBar.jsx'; // 重命名组件
// import createGame from './component/createQuiz.jsx';
import EditQuizModal from './component/editQuiz.jsx';
import ShowQuizInCard from './component/showQuiz.jsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function BasicGrid () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>< ShowQuizInCard inputQuizId='113967492' /></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
// previous is test code

function Dashboard ({ token }) {
  const [quizzes, setQuizzes] = React.useState([])
  const [newQuizName, setNewQuizName] = React.useState('')
  async function Game (aa) {
    console.log('test', aa);
    // await createGame(aa)
    fetchAllQuizzes();
  }

  async function fetchAllQuizzes () {
    console.log('the current token passed in is :', token)
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setQuizzes(data.quizzes)
    // console.log(quizzes)
  }

  return (
    <>
      <NavBar />
      <EditQuizModal />
      <BasicGrid />
    {quizzes.map(quiz => (
      <>
        <b>{quiz.name}{quiz.id}</b> <br />
      </>
    ))}
    <br />
        From here for new Quiz! <br />
        Name: <input value={newQuizName} onChange={(name) => { setNewQuizName(name.target.value) }} type="text" /> <br />
      <button onClick={() => Game(newQuizName) }> Create New Quiz </button>
  </>)
}

export default Dashboard;
