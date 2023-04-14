import React from 'react';
import { useParams } from 'react-router-dom';

export default function editGame () {
  const gameId = useParams().gameId;

  return (
    <>
    <div>Edit Game here</div>
    <div>Game ID is : {gameId}</div>
    </>
  )
}
