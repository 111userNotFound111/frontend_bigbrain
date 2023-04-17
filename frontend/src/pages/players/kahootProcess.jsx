import * as React from 'react';
import Button from '@mui/material/Button';
import CallAPI from '../../callAPI';
import { useParams } from 'react-router-dom';

// this is the process part

export default function PlayerProcess () {
  const { playerid } = useParams();
  // const [gameStatus, setGameStatus] = React.useState(false);

  async function onClickFunction () {
    await CallAPI('GET', `play/${playerid}/question`, localStorage.getItem('token'), '').then((data) => {
      console.log(data)
    });
  }
  return (
    <Button variant="contained" onClick={onClickFunction}>get question</Button>
  )
}
