import React ,{useState} from 'react'
import Board from './Board';
import "./game.css"

import io from "socket.io-client";


function Game({channel}) {
  const socket = io.connect("http://localhost:3002")

  const [playersJoined, setPlayersJoined] = useState (
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if(!playersJoined){
    return <div>waiting for players to join...</div>
  }
  return (
    <>
      <div className="gameContainer">
        <Board socket={socket} />
      </div>
    </>    
  )
}

export default Game;
