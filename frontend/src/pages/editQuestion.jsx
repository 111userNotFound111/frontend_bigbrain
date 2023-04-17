import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, Button } from '@mui/material';
import CustomTextField from '../component/customTextField';
import NavBar from '../component/navBar'

export default function editQuestion ({ setUpdatedQuestion }) {
  console.log('edit question function starts')
  const { quizId, questionIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const questionsArray = location.state;
  console.log('questions Array ', location.state)
  const question = questionsArray[questionIndex]
  const [title, setTitle] = useState(question.title);
  const [timeLimit, setTimeLimit] = useState(question.timeLimit);
  const [pointsAllocated, setPointsAllocated] = useState(question.pointsAllocated);
  const [thumbnail, setThumbnail] = useState(question.thumbnail);
  const [answer, setAnswer] = useState(Object.values(question.answer));
  const [correctAnswer, setCorrectAnswer] = useState(Object.values(question.correctAnswer));

  function handleCheckboxChange (index) {
    const newCorrectAnswer = [...correctAnswer];
    newCorrectAnswer[index] = !newCorrectAnswer[index];
    setCorrectAnswer(newCorrectAnswer);
  }

  function handleOptionChange (index, value) {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
  }

  // convert base64 back to image
  function Base64ToImage (thumbnail) {
    const image = new Image();
    image.src = thumbnail;
    return image;
  }
  // convert img to base64
  function handleImageChange (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setThumbnail(base64);
    };
    reader.readAsDataURL(file);
  }
  // pass updated questions back to editGame
  function handleSubmit (event) {
    event.preventDefault();
    const updatedQuestion = {
      title,
      thumbnail,
      timeLimit,
      pointsAllocated,
      correctAnswer,
      answer,
    }
    const newQuestionArray = [...questionsArray];
    newQuestionArray[questionIndex] = updatedQuestion;
    console.log('the new edited array', newQuestionArray)
    setUpdatedQuestion(newQuestionArray);
    navigate(`/editGame/${quizId}`)
  }

  // console.log('current image', thumbnail)

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
      <NavBar /> <br />
      <h1>Edit Question: {title} Quiz Id {quizId}</h1>
      <div>Question Index: {questionIndex} </div> <br /> <br />

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
        <CustomTextField
          autoFocus
          margin="dense"
          label="Question Title"
          value={title}
          style={{ width: '90%' }}
          onChange={(title) => setTitle(title.target.value)}
        />
        <CustomTextField
          margin="dense"
          label="Time Limit (seconds)"
          value={timeLimit}
          style={{ width: '90%' }}
          onChange={(limit) => setTimeLimit(limit.target.value)}
        />
        <CustomTextField
          margin="dense"
          label="Points Allocated"
          value={pointsAllocated}
          style={{ width: '90%' }}
          onChange={(points) => setPointsAllocated(points.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={thumbnail ? Base64ToImage(thumbnail).src : 'https://i.imgur.com/3oqzZ8K.png'} alt="thumbnail" style={{ width: '100%', height: '400px' }} />
        </div> <br />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
          <Button style={{ width: '50%' }} variant="contained" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageChange}
              />
          </Button>
        </div>
    </div>

        <hr />

        <div>
          <h2 style={{ fontWeight: 'bold' }}>Input Answer and Select the Correct Answer</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                  <Checkbox
                    checked={correctAnswer[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <CustomTextField
                    margin="dense"
                    label={`Option ${index + 1}`}
                    value={answer[index] ? answer[index] : ''}
                    onChange={(answer) => handleOptionChange(index, answer.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
            ))}
            <Button type="submit" variant="contained" color="primary" style={{ width: '50%', }}>Finish Edit Question</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
