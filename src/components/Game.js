import React ,{useState} from 'react'
import Board from './Board';
import "./game.css"

function Game({channel}) {


  const [playersJoined, setPlayersJoined]=useState (
    channel.state.watcher_count ===2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if(!playersJoined){
    return <div>waiting for players to join...</div>
  }
  return (
    <div>
      <Board/>
      
    </div>
  )
}

export default Game;
