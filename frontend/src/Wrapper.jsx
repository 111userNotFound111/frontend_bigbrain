import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import EditGame from './pages/editGame'
import PlayingGame from './pages/playingGame'
import Kahoot from './pages/players/kahootJoin'
import KahootProcess from './pages/players/kahootProcess'
import Test from './pages/test'
import EditQuestion from './pages/editQuestion'
import Home from './pages/home';
import Result from './pages/result';
// the Wrapper function is located inside the App router
// App -> Wrapper
function Wrapper () {
  const [token, setToken] = React.useState(null);
  const [dashload, setDashload] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [updatedQuestion, setUpdatedQuestion] = React.useState(null);

  // if sign in or sign up success, store token to localStorage and navigate to dashboard
  function storeToken (tokenInput) {
    const token = tokenInput.token
    console.log('token is:', token)
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/dashboard');
  }

  // check if login navigate to dashboard
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      if (['/signup', '/signin'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    } else if (['/', '/kahoot.it'].includes(location.pathname)) {
      console.log('player');
    } else if (!['/signup', '/signin'].includes(location.pathname)) { // if not login (no token), navigate to signin
      navigate('/signin');
    }
    setDashload(false)
  }, [])

  console.log(token)

  if (dashload) {
    return (
      <>Loading Page</>
    )
  }

  return (
    // the router component
    // add function with the initial letter been capital
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp onSuccess={storeToken} />} />
        <Route path="/signin" element={<SignIn onSuccess={storeToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token}/>} />
        <Route path="/playingGame/quizid/:quizId/sessionid/:sessionId" element={<PlayingGame />} />
        <Route path="/test" element={<Test />} />
        <Route path="/editGame/:quizId" element={<EditGame token={token } updatedQuestion={updatedQuestion}/>} />
        <Route path="/editGame/:quizId/:questionIndex" element={<EditQuestion setUpdatedQuestion={setUpdatedQuestion} />} />
        {/* player */}
        <Route path="/kahoot.it" element={<Kahoot />} />
        <Route path="/kahootProcess/:playerid" element={<KahootProcess />} />
        <Route path="/result/:sessionid" element={<Result />} />
    </Routes>
    </>
  );
}

export default Wrapper;
