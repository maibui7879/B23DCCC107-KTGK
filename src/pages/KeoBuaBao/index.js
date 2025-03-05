import React, { useState } from "react";

import { Button } from "antd";
import './Game.css'

const choices = ["Kéo", "Búa", "Bao"];

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const getResult = (player, computer) => {
  if (player === computer) return "Hòa!";
  if (
    (player === "Kéo" && computer === "Bao") ||
    (player === "Búa" && computer === "Kéo") ||
    (player === "Bao" && computer === "Búa")
  ) {
    return "Bạn thắng!";
  }
  return "Bạn thua!";
};

const KeoBuaBao = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleChoice = (choice) => {
    const computer = getRandomChoice();
    const gameResult = getResult(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);
    setHistory([...history, { player: choice, computer, result: gameResult }]);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Trò Chơi Oẳn Tù Tì</h1>
      <div className="choices">
        {choices.map((choice) => (
          <Button key={choice} className="choice-btn" onClick={() => handleChoice(choice)} type="primary">
            {choice}
          </Button>
        ))}
      </div>
      <div className="result">
        {playerChoice && (
          <p>
            Bạn chọn: <strong>{playerChoice}</strong>
          </p>
        )}
        {computerChoice && (
          <p>
            Máy tính chọn: <strong>{computerChoice}</strong>
          </p>
        )}
        {result && <h2 className="result-text">{result}</h2>}
      </div>
      <h3 className="history-title">Lịch sử trò chơi:</h3>
      <ul className="history">
        {history.map((entry, index) => (
          <li key={index} className="history-item">
            Bạn: {entry.player} - Máy: {entry.computer} ➝ {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeoBuaBao;
