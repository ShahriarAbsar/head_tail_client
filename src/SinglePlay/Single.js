import React, { useState, useEffect } from "react";
import UtilModal from "../components/UtilModal";
import "./single.css";
import computerImage from "../images/Computer.png";
import playerImage from "../images/Player.png";

const HandCricket = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(true);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (computerScore > totalScore) {
      setMessage('India Won!')
      setIsPlayerPlaying(true);
      setShow(true);
    }
  }, [computerScore])

  const handleClose = () => {
    setShow(false);
    setTotalScore(0);
    setComputerScore(0);
  }


  function handleOptionClick (option) {

    if (isPlayerPlaying) {
      document
        .querySelector(".player_img")
        .setAttribute(
          "src",
          `./image/singlePlay/${option}Player.png`
        );

      // Choose a random option for the computer
      const computerChoice = Math.floor(Math.random() * 6) + 1;
      document
        .querySelector(".computer_img")
        .setAttribute(
          "src",
          `./image/singlePlay/${computerChoice}Computer.png`
        );

      // Check if the player's option matches the computer's option
      setTimeout(() => {
        if (option === computerChoice.toString()) {
          setIsPlayerPlaying(false);
          alert("You're out!");
        } else {
          // Update the player's total score and display it on the page
          setTotalScore((prevScore) => prevScore + parseInt(option));
        }
      }, 100);
    } else {
      // If it's the computer's turn
      const computerChoice = Math.floor(Math.random() * 6) + 1;
      document
        .querySelector(".computer_img")
        .setAttribute(
          "src",
          `./image/singlePlay/${computerChoice}Computer.png`
        );

      // Choose a random option for the player
      // const playerChoice = Math.floor(Math.random() * 6) + 1;
      document
        .querySelector(".player_img")
        .setAttribute(
          "src",
          `./image/singlePlay/${option}Player.png`
        );

      // Check if the computer's option matches the player's option
      setTimeout(() => {
        if (option === computerChoice.toString()) {
          if (computerScore === totalScore) {
            setMessage('Match tie!')
            setIsPlayerPlaying(true)
            setShow(true)
          } else {
            setMessage('Bangladesh won!')
            setIsPlayerPlaying(true)
            setShow(true)
          }
        } else {
          setComputerScore((prevScore) => prevScore + computerChoice);
        }
      }, 200)

      // Update the computer's total score and display it on the page
    }
  };

  return (
    <div className="container">

      <div style={{marginTop: '15%'}}>
        {/* <div className="message">
          <button type="button">Batting</button>
          <button type="button">Bowling</button>
        </div> */}
        <div className="images">
          <div className="computer">
            <img
              className="computer_img"
              src={computerImage}
              alt="Computer"
            />
          </div>
          <div className="player">
            <img className="player_img" src={playerImage} alt="Player" />
          </div>
        </div>
        <div className="box">
          <div className="points">
            <div className="score">
              India{" "}
              <span className="computerPoints">{computerScore}</span> || Bangladesh{" "}
              <span className="playerPoints">{totalScore}</span>
            </div>
          </div>
        </div>
        <br />
        <div className="options">
          <button className="bttn" type="button" onClick={() => handleOptionClick("1")}></button>
          <button className="bttn" type="button" onClick={() => handleOptionClick("2")}></button>
          <button className="bttn" type="button" onClick={() => handleOptionClick("3")}></button>
          <button className="bttn" type="button" onClick={() => handleOptionClick("4")}></button>
          <button className="bttn" type="button" onClick={() => handleOptionClick("5")}></button>
          <button className="bttn" type="button" onClick={() => handleOptionClick("6")}></button>
        </div>
      </div>
      <UtilModal show={show} message={message} compScore={computerScore} playerScore={totalScore} handleClose={handleClose} />
    </div>
  );
};

export default HandCricket;
