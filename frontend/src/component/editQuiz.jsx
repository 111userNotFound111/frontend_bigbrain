import CallAPI from '../callAPI.jsx';

export default async function quizDetail (quizId, inputQuestion, inputName, inputThumbnail) {
  CallAPI('GET', `admin/quiz/${quizId}`, localStorage.getItem('token'), {
    questions: inputQuestion,
    name: inputName,
    thumbnail: inputThumbnail,
  })
}
