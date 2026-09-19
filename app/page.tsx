"use client";

import { useState, useEffect } from "react";
import Cell from "@/components/cell";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // الصفوف
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // الأعمدة
  [0, 4, 8], [2, 4, 6]            // الأقطار
];

export default function Home() {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [go, setGo] = useState<"circle" | "cross">("circle");
  const [winningMessage, setWinningMessage] = useState<string>("");
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState({ circle: 0, cross: 0, draws: 0 });

  useEffect(() => {
    let hasWinner = false;

    for (const combo of WINNING_COMBINATIONS) {
      const circleWins = combo.every((index) => cells[index] === "circle");
      const crossWins = combo.every((index) => cells[index] === "cross");

      if (circleWins || crossWins) {
        const winner = circleWins ? "circle" : "cross";
        setWinningMessage(`${winner === "circle" ? "Circle (O)" : "Cross (X)"} Wins! 🎉`);
        setWinningLine(combo);
        setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
        hasWinner = true;
        break;
      }
    }

    if (!hasWinner && cells.every((cell) => cell !== "")) {
      setWinningMessage("It's a Draw! 🤝");
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }, [cells]);

  const handleCellClick = (id: number) => {
    if (cells[id] || winningMessage) return;

    const copyCells = [...cells];
    copyCells[id] = go;
    setCells(copyCells);
    setGo(go === "circle" ? "cross" : "circle");
  };

  const resetBoard = () => {
    setCells(Array(9).fill(""));
    setGo("circle");
    setWinningMessage("");
    setWinningLine([]);
  };

  const resetAll = () => {
    resetBoard();
    setScores({ circle: 0, cross: 0, draws: 0 });
  };

  return (
    <main className="container">
      <h1>Tic-Tac-Toe</h1>

      {/* لوحة النتائج */}
      <div className="scoreboard">
        <div className={`score-box ${go === "circle" && !winningMessage ? "active" : ""}`}>
          <span className="player circle-text">Player O</span>
          <span className="score">{scores.circle}</span>
        </div>
        <div className="score-box">
          <span className="player">Draws</span>
          <span className="score">{scores.draws}</span>
        </div>
        <div className={`score-box ${go === "cross" && !winningMessage ? "active" : ""}`}>
          <span className="player cross-text">Player X</span>
          <span className="score">{scores.cross}</span>
        </div>
      </div>

      {/* الحالة الحالية */}
      <div className="status">
        {winningMessage ? (
          <h2>{winningMessage}</h2>
        ) : (
          <p>
            Current Turn: <span className={go}>{go === "circle" ? "O" : "X"}</span>
          </p>
        )}
      </div>

      {/* لوحة اللعبة */}
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            isWinningSquare={winningLine.includes(index)}
            disabled={!!winningMessage}
            onClick={handleCellClick}
          />
        ))}
      </div>

      {/* أزرار التحكم */}
      <div className="controls">
        <button className="btn reset-btn" onClick={resetBoard}>
          Next Round
        </button>
        <button className="btn clear-btn" onClick={resetAll}>
          Reset Score
        </button>
      </div>
    </main>
  );
}