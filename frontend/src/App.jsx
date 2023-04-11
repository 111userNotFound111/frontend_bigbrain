import React from 'react';
import SignIn from './signIn';
import SignUp from './signUp';

function App () {
  const [page, setPage] = React.useState('signup');
  return (
    <>
      <header>
        <nav><a href="#" onClick={() => setPage('signup')}>Sign up</a> |<a href="#" onClick={() => setPage('signin')}>Sign in</a>
          <hr />
        </nav>
      </header>
      <main>
        <h1>Big Brain</h1>
        {page === 'signup'
          ? (SignUp()
            )
          : (SignIn())
        }
      </main>
    </>
  );
}

export default App;
