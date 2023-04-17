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
// the Wrapper function is located inside the App router
// App -> Wrapper
function Wrapper () {
  const [token, setToken] = React.useState(null);
  const [dashload, setDashload] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
      if (['/signup', '/signin', '/'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    } else { // if not login (no token), navigate to signin
      if (!['/signup', '/signin'].includes(location.pathname)) {
        navigate('/signin');
      }
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
        <Route path="/signup" element={<SignUp onSuccess={storeToken} />} />
        <Route path="/signin" element={<SignIn onSuccess={storeToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token}/>} />
        <Route path="/editGame/:gameId" element={<EditGame />} />
        <Route path="/playingGame/:quizId" element={<PlayingGame />} />
        <Route path="/kahoot.it" element={<Kahoot />} />
        <Route path="/kahootProcess" element={<KahootProcess />} />
        <Route path="/test" element={<Test />} />
    </Routes>
    </>
  );
}

export default Wrapper;
