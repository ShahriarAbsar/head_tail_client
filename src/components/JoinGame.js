import React, {useState} from 'react'
import {useChatContext,Channel} from "stream-chat-react"
import Game from './Game';
import "./joinGame.css"


function JoinGame() {
  
    const[rivalUsername,setRivalUsername]=useState("");
    const {client} =useChatContext();
    const [channel,setChannel]= useState(null);


    const createChannel = async ()=>{
      
      const response =await client.queryUsers({name:{$eq:rivalUsername}});
        
      if (response.users.length === 0){
        alert("user not found")
        return;
      }

      const newChannel = await client.channel("messaging", {
        members:[client.userID, response.users[0].id],
      });

      await newChannel.watch();
      setChannel(newChannel);


    };


    return (
      <>
      {channel ? 
      <Channel channel={channel}>
          <Game channel={channel}/> 
      </Channel>
      :(

      
      <div className='joinGame'><h2>Create Game</h2><input placeholder='username of rival...'
      onChange={(event)=>{
        setRivalUsername(event.target.value);
        
      }}
      
      />
      <button className='join' onClick={createChannel}>Join/start Game</button>
      
      </div>
    )}
    </>
    );
}
export default JoinGame
