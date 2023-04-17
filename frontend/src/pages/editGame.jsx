import React, { useState } from 'react';
import { useParams, } from 'react-router-dom';
import CustomTextField from '../component/customTextField.jsx'
import NavBar from '../component/navBar.jsx'
import { Button, Modal, Box, } from '@mui/material';

export default function editGame () {
  const { gameId } = useParams();
  const [image64, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setImage(base64);
    };
    reader.readAsDataURL(file);
    setImageName(file.name);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddQuestion = () => {
    // get values from form inputs
    const questionName = document.getElementById('question-name-input').value;
    const timeAllowed = document.getElementById('time-allowed-input').value;
    const pointsAllocated = document.getElementById('points-allocated-input').value;
    const option1 = document.getElementById('option1-input').value;
    const option2 = document.getElementById('option2-input').value;
    const option3 = document.getElementById('option3-input').value;
    const option4 = document.getElementById('option4-input').value;
    const correctAnswer = document.getElementById('correct-answer-input').value;

    // create new question object
    const newQuestion = {
      name: questionName,
      timeAllowed,
      pointsAllocated,
      options: [option1, option2, option3, option4],
      correctAnswer
    };

    // add new question to questions state
    setQuestions([...questions, newQuestion]);

    // close modal
    handleClose();
  };

  console.log(image64)
  return (
    <>
      <NavBar/>

      <div>
        <h1>Edit Game </h1>
        <span>Game ID : {gameId}</span>
      </div> <br />

      <div>
        <CustomTextField
          required
          id="outlined-required"
          label="Quiz Name"
        />
        <CustomTextField
          required
          id="outlined-required"
          label="Image"
          value={imageName}
          readOnly={true}
        />
        <Button variant="contained" component="label">
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
      <hr/>
      <div>
        <h1> Questions </h1>
        <Button variant="contained" onClick={handleOpen}> Add Questions </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
            <h2>Add Question</h2>
            <CustomTextField id="question-name-input" label="Question Name" variant="outlined" fullWidth />
            <CustomTextField id="time-allowed-input" label="Time Allowed (sec)" variant="outlined" fullWidth />
            <CustomTextField id="points-allocated-input" label="Points Allocated" variant="outlined" fullWidth />
            <CustomTextField id="option1-input" label="Option 1" variant="outlined" fullWidth />
            <CustomTextField id="option2-input" label="Option 2" variant="outlined" fullWidth />
            <CustomTextField id="option3-input" label="Option 3" variant="outlined" fullWidth />
            <CustomTextField id="option4-input" label="Option 4" variant="outlined" fullWidth />
            <CustomTextField id="correct-answer-input" label="Correct Answer" variant="outlined" fullWidth />
            <Button variant="contained" onClick={handleAddQuestion}> Add </Button>
          </Box>
        </Modal>
      {questions.map((question, index) => {
        return (
          <div key={index}>
            <h2>{question.name}</h2>
            <p>Time Allowed: {question.timeAllowed} seconds</p>
            <p>Points Allocated: {question.pointsAllocated}</p>
            <h3>Options:</h3>
            <ul>
              {question.options.map((option, index) => {
                return (
                  <li key={index}>{option}</li>
                );
              })}
            </ul>
              <p>Correct Answer: {question.correctAnswer}</p>
            <hr />
          </div>
        );
      })}
      </div>
    </>
  );
}
