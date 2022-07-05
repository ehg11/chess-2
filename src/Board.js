import "./index.css"

import React from "react";
import Square from "./Square.js"

// 2D Array to Be Interpreted as a Board
let boardArray = [];

// all possible letters/columns in a chess board
const rowLetters = "abcdefgh"

// for each number, add a number to it, put into array
for (let rowNum = 8; rowNum > 0; rowNum--) {
    let row = [];
    for (let i = 0; i < rowLetters.length; i++) {
        const id = rowLetters.charAt(i) + rowNum.toString();
        row.push(id);
    }
    boardArray.push(row);
}

function renderRow(rowNum, board) {
    const rowCells = board[rowNum - 1].map((id, key) => 
        <Square
            key={key}
            position={id}
        />
    );
    return rowCells;
}

export default function Board() {
    return (
        <div>
            <div className="board-row">
                {renderRow(1, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(2, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(3, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(4, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(5, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(6, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(7, boardArray)}
            </div>
            <div className="board-row">
                {renderRow(8, boardArray)}
            </div>
        </div>

    )
}