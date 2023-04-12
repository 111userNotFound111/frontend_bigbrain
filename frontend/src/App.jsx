import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Wrapper from './Wrapper.jsx'

function App () {
  return (
    // the router component
    <>
    <Router>
        <Wrapper />
    </Router>
    </>
  );
}

export default App;
