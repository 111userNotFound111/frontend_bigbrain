import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './signIn'
import SignUp from './signUp'
import Dashboard from './dashboard'
import EditGame from './editGame'

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
    </Routes>
    </>
  );
}

export default Wrapper;
