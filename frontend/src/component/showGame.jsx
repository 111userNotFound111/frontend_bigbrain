// import React from 'react';

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

// {quizzes.map(quiz => (
//   <>
//   <b>{quiz.name}</b> <br />
//   </>
// ))}
