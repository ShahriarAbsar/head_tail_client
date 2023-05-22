import React, { useState } from "react";
import "./single.css";
import computerImage from "../images/Computer.png";
import playerImage from "../images/Player.png";

const HandCricket = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(true);

  const handleOptionClick = (option) => {
    
    if (isPlayerPlaying) {
      // If it's the player's turn
      const playerInput = parseInt(option);
      const computerInput = Math.floor(Math.random() * 6)+1;
      const sum = playerInput + computerInput;

      // Update the player's image to the chosen option
      document.querySelector(".player_img").setAttribute("src",`./image/singlePlay/${option}Player.png`);

      // Choose a random option for the computer
      const computerChoice = Math.floor(Math.random() * 6) + 1;
      document.querySelector(".computer_img").setAttribute("src",`./image/singlePlay/${computerChoice}Computer.png`);

      // Check if the player's option matches the computer's option
      if (option === computerChoice.toString()) {
        alert("You're out!");
        setIsPlayerPlaying(false);
        return;
      }

      // Update the player's total score and display it on the page
      setTotalScore((prevScore) => prevScore + parseInt(option));
    } else {
      // If it's the computer's turn
      const computerChoice = Math.floor(Math.random() * 6) + 1;
      document
        .querySelector(".computer_img")
        .setAttribute("src",`./image/singlePlay/${computerChoice}Computer.png`);

      // Choose a random option for the player
      const playerChoice = Math.floor(Math.random() * 6) + 1;
      document.querySelector(
        ".player_img"
      ).setAttribute("src",`./image/singlePlay/${playerChoice}Player.png`);

      // Check if the computer's option matches the player's option
      if (option === computerChoice.toString()) {
        alert("Computer is out!");
        setIsPlayerPlaying(true);
        setComputerScore(0);
        return;
      }

      // Update the computer's total score and display it on the page
      setComputerScore((prevScore) => prevScore + computerChoice);
    }

    // Check if both players are out and determine the winner
    if (!isPlayerPlaying) {
      if (totalScore > computerScore) {
        document.querySelector(".winner").innerHTML = "Player wins!";
      } else if (computerScore > totalScore) {
        document.querySelector(".winner").innerHTML = "Computer wins!";
      }
    }
  };

  return (
    <div className="container">
      <div className="message">
        <h1>Toss</h1>
        <button onClick={handleOptionClick}>Toss</button>
        <button onClick={() => handleOptionClick("Head")}>Head</button>
        <button onClick={() => handleOptionClick("Tail")}>Tail</button>
      </div>

      <div >
        <div className="message">
          <button type="button">Batting</button>
          <button type="button">Bowling</button>
        </div>
        <div className="images">
          <div className="computer">
            <img className="computer_img" src={computerImage} alt="Computer" />
          </div>
          <div className="player">
            <img className="player_img" src={playerImage} alt="Player" />
          </div>
        </div>
        <div className="box">
          <div className="points">
            <div className="score">
              Computer <span className="computerPoints">{computerScore}</span>{" "}
              || Player <span className="playerPoints">{totalScore}</span>
            </div>
          </div>
        </div>
        <div className="options">
          <button type="button" onClick={() => handleOptionClick("1")}>
            1
          </button>
          <button type="button" onClick={() => handleOptionClick("2")}>
            2
          </button>
          <button type="button" onClick={() => handleOptionClick("3")}>
            3
          </button>
          <button type="button" onClick={() => handleOptionClick("4")}>
            4
          </button>
          <button type="button" onClick={() => handleOptionClick("5")}>
            5
          </button>
          <button type="button" onClick={() => handleOptionClick("6")}>
            6
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandCricket;
