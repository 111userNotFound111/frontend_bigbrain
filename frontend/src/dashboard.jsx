import React from 'react';
import NavBar from './component/navBar.jsx'; // 重命名组件
import createGame from './component/createGame.jsx';

function Dashboard ({ token }) {
  const [quizzes, setQuizzes] = React.useState([])
  const [newQuizName, setNewQuizName] = React.useState('')
  async function Game (aa) {
    console.log('test', aa);
    await createGame(aa)
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
    {quizzes.map(quiz => (
      <>
      <b>{quiz.name}</b> <br />
      </>
    ))}
    <br />
        From here for new Quiz! <br />
        Name: <input value={newQuizName} onChange={(name) => { setNewQuizName(name.target.value) }} type="text" /> <br />
        <button onClick={() => Game(newQuizName)}> Create New Quiz </button>
  </>)
}

export default Dashboard;
