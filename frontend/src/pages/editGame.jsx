// import libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';

// import components
import { Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit, } from '@mui/icons-material';
import callAPI from '../callAPI.jsx'
import AddQuestionForm from '../component/addQuestionsForm.jsx'
import CustomTextField from '../component/customTextField.jsx'
import NavBar from '../component/navBar.jsx'

export default function editGame ({ token, updatedQuestion }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [newQuizName, setNewQuizName] = useState('')
  const [newThumbnail64, setThumbnail] = useState(null);
  const [questions, setQuestions] = useState([])

  // Second store game info into variables every time quizInfo changes
  async function fetchQuizData () {
    const quizData = await callAPI('GET', `admin/quiz/${quizId}`, token, {});
    console.log('fet quiz data begins')
    setNewQuizName(quizData.name);
    setThumbnail(quizData.thumbnail);
    setQuestions(quizData.questions);
    if (updatedQuestion) {
      setQuestions(updatedQuestion)
    }
  }

  useEffect(() => {
    fetchQuizData();
  }, []);

  // convert img to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setThumbnail(base64);
    };
    reader.readAsDataURL(file);
  };

  console.log('quiz name :', newQuizName)
  console.log('quiz questions :', questions)
  // console.log('quiz thumbnail :', newThumbnail64)

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Third edit variables and send back to database
  async function editQuizDetails () {
    await callAPI('PUT', `admin/quiz/${quizId}`, token, {
      questions,
      name: newQuizName,
      thumbnail: newThumbnail64,
    }).then(() => {
      navigate('/dashboard');
    })
  }
  // convert base64 back to image
  function Base64ToImage (base64) {
    const image = new Image();
    image.src = base64;
    return image;
  }
  // add new question using Modal
  function addNewQuestions (newQuestion) {
    setQuestions([...questions, newQuestion])
  }
  function handleEditQuestion (index) {
    console.log('current selected question to edit :', questions, 'with index', index)
    navigate(`/editGame/${quizId}/${index}`, { state: questions });
  }

  function handleDeleteQuestion (index) {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
        <NavBar />
        <div>
          <h1>Edit Game : {newQuizName}</h1>
          <span>Game ID : {quizId}</span>
        </div> <br />
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomTextField
              required
              style={{ width: '60%' }}
              id="outlined-required"
              label="Quiz Name"
              value={newQuizName || ''}
              onChange={(quizName) => setNewQuizName(quizName.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={newThumbnail64 ? Base64ToImage(newThumbnail64).src : 'https://i.imgur.com/3oqzZ8K.png'} alt="thumbnail" style={{ width: '60%', height: '400px' }} />
          </div> <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '60%' }} variant="contained" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          </div> <br /> <br />
        </div>
        <hr />
        {/* below are questions section, do not alter any style */}
        <div>
          <h1> Questions </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AddQuestionForm onSubmit={addNewQuestions} />
          </div>
          <br />
          <List style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {questions && questions.map((question, index) => (
              <ListItem key={index} style={{
                marginBottom: '10px',
                backgroundColor: '#e6f3ff',
                width: '60%',
              }}>
                <ListItemText primary={question.title} />
                <div>
                  <IconButton aria-label="edit" onClick={() => handleEditQuestion(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteQuestion(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
          <hr />
          <br /> <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" onClick={editQuizDetails} style={{ backgroundColor: 'green', color: 'white', width: '60%' }}>Edit Game</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
