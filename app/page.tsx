"use client";
import Image from "next/image";
import Cell from "../components/cell"
import { useEffect, useState } from "react";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(""); 
  console.log(winningMessage);
  useEffect(() => {
    winningCombos.forEach((combo) => { 
      const circleWins = combo.every((cell) => {return cells[cell] === "circle" });
      const crossWins = combo.every((cell) => { return cells[cell] === "cross" });
      if (circleWins) {
        setWinningMessage("Circle wins!");
      }
      else if (crossWins) {
        setWinningMessage("Cross wins!");
      }

    })
  }, [cells, winningMessage]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winningMessage) {
      setWinningMessage("Draw!");
    }
  }, [cells, winningMessage]);
  return (
    <div className="container">
      <div className="gameboard">
        {cells.map((cell, index) => (<Cell id={index} go={go} setGo={setGo} cells={cells} setCells={setCells} cell={cell} winningMessage={winningMessage} key={index} />))}
      </div>
      <div>{winningMessage}</div>
      {!winningMessage && <div>It's now {go} turn! </div>}
    </div>
  );
}
