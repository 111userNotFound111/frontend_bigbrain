import React from 'react';


async function callAPI ({method, path, payload, inputFunction}) {
  const [token, setToken] = React.useState(null);
  console.log(`method: ${method}, path: ${path}, payload: ${payload}`)

  React.useEffect(() => { // execute function only once for the target component
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])
  }
  const response = await fetch('http://localhost:5005/admin/auth/register', options);
  const data = await response.json();
  onSuccess(data.token);
  console.log(data)
}

