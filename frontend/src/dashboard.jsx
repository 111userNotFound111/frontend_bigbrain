import React from 'react';
import NavBar from './component/navBar.jsx'; // 重命名组件

function Dashboard ({ token }) {
  const [newQuizShow, setNewQuizShow] = React.useState(false)
  const [quizzes, setQuizzes] = React.useState([])
  const [newQuizName, setNewQuizName] = React.useState('')

  async function createNewQuiz () {
    console.log('create new game with name:', newQuizName)
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newQuizName,
      })
    });
    const data = await response.json();
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.value)
    }
    await fetchAllQuizzes();
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
    console.log(quizzes)
  }

  // React.useEffect(async () => {
  //   await fetchAllQuizzes();
  // }, [newQuizShow])

  return (
    <>
    <NavBar />
    {quizzes.map(quiz => (
      <>
      <b>{quiz.name}</b> <br />
      </>
    ))}
    <br />
    <button onClick={() => setNewQuizShow(!newQuizShow)}>
        {newQuizShow ? 'Hide' : 'Show'} Create New Quiz
    </button>
    {newQuizShow && (
        <>
        <br />
        From here for new Quiz! <br />
        Name: <input value={newQuizName} onChange={(name) => { setNewQuizName(name.target.value) }} type="text" /> <br />
        <button onClick={createNewQuiz}> Create New Quiz </button>
        </>
    )}
  </>)
}

export default Dashboard;
