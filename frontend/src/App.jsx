import React from 'react';
import SignIn from './signIn'
import SignUp from './signUp'
import Dashboard from './dashboard'

function App () {
  const [page, setPage] = React.useState('signUp');
  const [token, setToken] = React.useState(null);
  console.log('token is:', token)

  function logout () {
    setToken(null);
    localStorage.removeItem('token');
  }

  function storeToken (token) {
    setToken(token);
    localStorage.setItem('token', token);
  }

  React.useEffect(() => { // execute function only once for the target component
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])
  return (
    <>
      <header>
        <nav>
        {token // header component router
          ? <>
              <a href="#" onClick={logout}>Log Out</a>
              </>
          : <>
                <a href="#" onClick={() => setPage('signUp')}>Sign up</a> | <a href="#" onClick={() => setPage('signIn')}>Sign in</a>
              </>
          }
          <hr />
        </nav>
      </header>
      <main>
        <h1>Big Brain</h1>
        {token !== null
          ? <Dashboard token={token}/>
          : page === 'signUp'
            ? <SignUp onSuccess={storeToken} />
            : <SignIn onSuccess={storeToken} />
            }
      </main>
    </>
  );
}

export default App;
