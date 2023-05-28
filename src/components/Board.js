import React, { useState, useEffect } from "react";
import "../SinglePlay/single.css";
//import "./board.css";
import playerImage1 from "../images/Player.png";
import playerImage2 from "../images/1Player1.png";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Window,MessageList,MessageInput,reactionHandlerWarning } from 'stream-chat-react';
import "./Chat.css"
const Board = () => {
  // State variables
  const [player1Score, setPlayer1Score] = useState(0); // Player 1's score
  const [player2Score, setPlayer2Score] = useState(0); // Player 2's score
  const [isPlayer1Playing, setIsPlayer1Playing] = useState(true); // Tracks if it's Player 1's turn
  const [isPlayer2Playing, setIsPlayer2Playing] = useState(true); // Tracks if it's Player 2's turn
  const [selectedOvers, setSelectedOvers] = useState(1); // Number of overs selected
  const [currentOver, setCurrentOver] = useState(1); // Current over being played
  const [player1Option, setPlayer1Option] = useState(""); // Player 1's selected option
  const [player2Option, setPlayer2Option] = useState(""); // Player 2's selected option
  const { channel } = useChannelStateContext(); // Access the Stream Chat channel
  const { client } = useChatContext(); // Access the Stream Chat client

  useEffect(() => {
    // Check if both players have made their selections and the game can proceed
    if (!isPlayer1Playing && !isPlayer2Playing && player1Option !== "" && player2Option !== "") {
      if (player1Option === player2Option) {
        // Players' inputs match, game over
        alert("Both players' inputs match! Game over.");
        setCurrentOver(0);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setIsPlayer1Playing(true);
        setIsPlayer2Playing(true);
        setPlayer1Option("");
        setPlayer2Option("");
      } else {
        // Update player 2's total score and display it on the page
        setPlayer2Score((prevScore2) => prevScore2 + parseInt(player2Option));
      }
    }
  }, [isPlayer1Playing, isPlayer2Playing, player1Option, player2Option]);

  const handleOptionClick = async (option) => {
    if (isPlayer1Playing) {
      // If it's player 1's turn
      await channel.sendMessage({
        text: option,
        player: "player1",
      });

      // Update the player 1's image to the chosen option
      document
        .querySelector(".player1_img")
        .setAttribute("src", `./images/${option}Player1.png`);

      // Update player 1's total score and display it on the page
      setPlayer1Score((prevScore) => prevScore + parseInt(option));
      setPlayer1Option(option);
    } else {
      // If it's player 2's turn
      // Update the player 2's image to the chosen option
      document
        .querySelector(".player2_img")
        .setAttribute("src", `./images/${option}Player.png`);

      // Store player 2's option
      setPlayer2Option(option);
    }

    // Switch turns between players
    setIsPlayer1Playing(!isPlayer1Playing);

    // Check if an over has been completed
    if (isPlayer1Playing && currentOver % 6 === 0) {
      if (currentOver < selectedOvers * 6) {
        setCurrentOver((prevOver) => prevOver + 1);
        setIsPlayer1Playing(false);
      } else {
        // All overs completed, determine the winner
        let winner;
        if (player1Score > player2Score) {
          winner = "Player 1 wins!";
        } else if (player2Score > player1Score) {
          winner = "Player 2 wins!";
        } else {
          winner = "It's a tie!";
        }
        alert(winner);
        // Reset the game
        setCurrentOver(1);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setIsPlayer1Playing(true);
        setIsPlayer2Playing(true);
        setPlayer1Option("");
        setPlayer2Option("");
      }
    }
  };

  const handleOversChange = (e) => {
    const overs = parseInt(e.target.value);
    setSelectedOvers(overs);
    setCurrentOver(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setIsPlayer1Playing(true);
    setPlayer1Option("");
    setPlayer2Option("");
  };

  useEffect(() => {
    // Event handling for Stream Chat messages
    const handleChannelEvent = (event) => {
      if (event.type === "message.new" && event.user.id !== client.userID) {
        const option = event.message.text;
        const player = event.message.player;

        if (player === "player1") {
          // Update the player 1's image to the chosen option
          document
            .querySelector(".player1_img")
            .setAttribute("src", `./images/${option}Player1.png`);

          // Update player 1's total score and display it on the page
          setPlayer1Score((prevScore) => prevScore + parseInt(option));
          setPlayer1Option(option);
        } else {
          // Update the player 2's image to the chosen option
          document
            .querySelector(".player2_img")
            .setAttribute("src", `./images/${option}Player.png`);

            setPlayer2Score((prevScore2) => prevScore2 + parseInt(option));
            setPlayer2Option(option);

          // Store player 2's option
          setPlayer2Option(option);

          // Switch turns between players
          setIsPlayer1Playing(true);
        }
      }
    };

    // Subscribe to new message events
    channel.on("message.new", handleChannelEvent);

    return () => {
      // Unsubscribe from message events when component unmounts
      channel.off("message.new", handleChannelEvent);
    };
  }, [channel, client]);

  return (
    
   
  <>

   
    <section className="container">
   

    <div >
      <div>
        <div className="message">
          <label htmlFor="overs">Select Overs: </label>
          <select id="overs" value={selectedOvers} onChange={handleOversChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <div className="images">
          <div className="player1">
            <img className="player1_img" src={playerImage1} alt="Player 1" />
          </div>
          <div className="player2">
            <img className="player2_img" src={playerImage2} alt="Player 2" />
          </div>
        </div>
        <div className="box">
          <div className="points">
            <div className="score">
              Player 1 Score: <span className="player1Score">{player1Score}</span>
              <br />
              Player 2 Score: <span className="player2Score">{player2Score}</span>
              <br />
              Balls played: {currentOver}
            </div>
          </div>
        </div>
        <div className="options">
          <button className="bttn1" type="button" onClick={() => handleOptionClick("1")}>
            1
          </button>
          <button className="bttn2" type="button" onClick={() => handleOptionClick("2")}>
            2
          </button>
          <button className="bttn3" type="button" onClick={() => handleOptionClick("3")}>
            3
          </button>
          <button className="bttn4" type="button" onClick={() => handleOptionClick("4")}>
            4
          </button>
          <button className="bttn5" type="button" onClick={() => handleOptionClick("5")}>
            5
          </button>
          <button className="bttn6" type="button" onClick={() => handleOptionClick("6")}>
            6
          </button>
        </div>
      </div>
      
     </div>

     </section>
      
    <section className="gameContainer1">

        <div > 
   
    <Window>

      <MessageList hideDeletedMessages
       disableDateSeparator
       closeReactionSelectorOnClick 
        messageActions={["none"]
        }/>
      <MessageInput noFiles />

    </Window>
    </div>
      </section>
      
   
</>

    
  );
};

export default Board;
