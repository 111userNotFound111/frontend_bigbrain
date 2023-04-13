// import * as React from 'react';
/* method, path, token, payload**/
export default async function callAPI (method, path, token, payload) {
  console.log('API call starts with :', method, path, payload)
  const response = await fetch(`http://localhost:5005/${path}`, {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
    throw new Error(data.error);
  }
  return data;
}
