// import * as React from 'react';
export default async function callAPI (methodInput, path, payload) {
  console.log('API call starts with :', methodInput, path, payload)
  const response = await fetch(`http://localhost:5005/${path}`, {
    method: methodInput,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
    throw new Error(data.error);
  }
  return data.token;
}
