import React, { useState, useEffect } from "react";

import "../SinglePlay/single.css";
//import "./board.css";
import playerImage1 from "../images/Player.png";
import playerImage2 from "../images/1Player1.png";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import {
  Window,
  MessageList,
  MessageInput,
  reactionHandlerWarning,
} from "stream-chat-react";

import "./Chat.css";

const Board = ({socket}) => {
  // State variables
  const [player1Score, setPlayer1Score] = useState(0); // Player 1's score
  const [player2Score, setPlayer2Score] = useState(0); // Player 2's score
  // const [isPlayer1Playing, setIsPlayer1Playing] = useState(true); // Tracks if it's Player 1's turn
  // const [selectedOvers, setSelectedOvers] = useState(1); // Number of overs selected
  // const [currentOver, setCurrentOver] = useState(1); // Current over being played
  const [batsmanOption, setBatsmanOption] = useState(null); // Player 1's selected option

   // Access the Stream Chat channel
  const { client } = useChatContext(); // Access the Stream Chat client

  const [player, setPlayer] = useState('Player 1')
  const [turn, setTurn] = useState('Player 1')
  const [batting, setBatting] = useState('Player 1')

  console.log('Turn:', turn, 'Player:', player)
  console.log('player1 Score:', player1Score, 'player2 Score:', player2Score)
  console.log('batting', batting)

  useEffect(() => {
    socket.on("move_received", data => {
      const currentPlayer = data.player === 'Player 1' ? 'Player 2' : "Player 1"
      setPlayer(currentPlayer)
      setTurn(currentPlayer)

      if (data.batting === 'Player 1') {
        console.log('batting:', data.batting)
        if (data.player === 'Player 1') {
          console.log(data.option)
          setBatsmanOption(data.option)
        } else {
          console.log(data)
          
          document
            .querySelector(".player2_img")
            .setAttribute("src", `./images/${data.option}Player.png`);
  
          if (data.Out) {
            alert('You are out')
            setBatting('Player 2')
            setTurn('Player 2')
          } else {
            setPlayer1Score(data.Score)
          }
        }
      } else {
        console.log('batting:', data.batting)
        if (data.player === 'Player 2') {
          console.log(data.option)
          setBatsmanOption(data.option)
        } else {
          console.log(data)
          
          document
            .querySelector(".player1_img")
            .setAttribute("src", `./images/${data.option}Player1.png`);
  
          if (data.Out) {
            alert('You are out')
            setBatting('Player 1')
            setTurn('Player 1')
          } else {
            setPlayer2Score(data.Score)
          }
        }
      }
    })
  }, [socket])

  const handleOptionClick = async (option) => {
    console.log('batting:', batting)
    if (turn === player && batting === 'Player 1') {
      // Update the player 1's image to the chosen option
      console.log(player)
      if (player === 'Player 1') {
        console.log('You are player 1:', option)
        
        document
        .querySelector(".player1_img")
        .setAttribute("src", `./images/${option}Player1.png`);

        await socket.emit("game_move", {
          userID: client.userID,
          player: player,
          option: option,
          batting: batting
        });
      } else {
        console.log(option, batsmanOption)
        
        document
        .querySelector(".player1_img")
        .setAttribute("src", `./images/${batsmanOption}Player1.png`);
        
        document
        .querySelector(".player2_img")
        .setAttribute("src", `./images/${option}Player.png`);

        if (option === batsmanOption) {
          console.log('player 1 is out')
          await socket.emit("game_move", {
            userID: client.userID,
            player: player,
            option: option,
            Out: true,
            batting: batting
          });
          setBatting('Player 2')
          return
        } else {
          setPlayer1Score(current => current += batsmanOption)
          await socket.emit("game_move", {
            userID: client.userID,
            player: player,
            option: option,
            Score: player1Score + batsmanOption,
            batting: batting
          });
        }
      }
      setTurn(player === 'Player 1' ? 'Player 2' : 'Player 1')
      // If it's player 1's turn
    } else if (turn === player && batting === 'Player 2') {
      // Update the player 1's image to the chosen option
      console.log(player)
      if (player === 'Player 2') {
        console.log('You are player 2:', option)
        
        document
        .querySelector(".player2_img")
        .setAttribute("src", `./images/${option}Player.png`);

        await socket.emit("game_move", {
          userID: client.userID,
          player: player,
          option: option,
          batting: batting
        });
      } else {
        console.log(option, batsmanOption)
        
        document
        .querySelector(".player2_img")
        .setAttribute("src", `./images/${batsmanOption}Player.png`);
        
        document
        .querySelector(".player1_img")
        .setAttribute("src", `./images/${option}Player1.png`);

        if (option === batsmanOption) {
          console.log('player 2 is out')
          setBatting('Player 1')
          await socket.emit("game_move", {
            userID: client.userID,
            player: player,
            option: option,
            Out: true,
            batting: batting
          });
          return
        } else {
          setPlayer2Score(current => current += batsmanOption)
          await socket.emit("game_move", {
            userID: client.userID,
            player: player,
            option: option,
            Score: player2Score + batsmanOption,
            batting: batting
          });
        }
      }
      setTurn(player === 'Player 1' ? 'Player 2' : 'Player 1')
    }
  };

  return (
    <>
      <section className="container">
        <div>
          <div>
            {/* <div className="message">
              <label htmlFor="overs">Select Overs: </label>
              <select
                id="overs"
                value={selectedOvers}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div> */}
            <div className="images">
              <div className="player1">
                <img
                  className="player1_img"
                  src={playerImage1}
                  alt="Player 1"
                />
              </div>
              <div className="player2">
                <img
                  className="player2_img"
                  src={playerImage2}
                  alt="Player 2"
                />
              </div>
            </div>
            <div className="box">
              <div className="points">
                <div className="score">
                  Player 1 Score:{" "}
                  <span className="player1Score">{player1Score}</span>
                  <br />
                  Player 2 Score:{" "}
                  <span className="player2Score">{player2Score}</span>
                  <br />
                  Balls played: 0
                </div>
              </div>
            </div>
            <div className="options">
              <button
                className="bttn1"
                type="button"
                onClick={() => handleOptionClick(1)}
              >
                1
              </button>

              <button
                className="bttn2"
                type="button"
                onClick={() => handleOptionClick(2)}
              >
                2
              </button>

              <button
                className="bttn3"
                type="button"
                onClick={() => handleOptionClick(3)}
              >
                3
              </button>

              <button
                className="bttn4"
                type="button"
                onClick={() => handleOptionClick(4)}
              >
                4
              </button>

              <button
                className="bttn5"
                type="button"
                onClick={() => handleOptionClick(5)}
              >
                5
              </button>

              <button
                className="bttn6"
                type="button"
                onClick={() => handleOptionClick(6)}
              >
                6
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="gameContainer1">
        <div>
          <Window>
            <MessageList
              hideDeletedMessages
              disableDateSeparator
              closeReactionSelectorOnClick
              messageActions={["none"]}
            />
            <MessageInput noFiles />
          </Window>
        </div>
      </section>
    </>
  );
};

export default Board;
