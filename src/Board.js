import "./index.css"

import React, { useState } from "react";
import Square from "./Square.js"

import { init_board_state } from "./utils.js"

export default function Board() {

    // 2D Array to Be Interpreted as a Board
    let boardArray = [];
    let curr_board_state = JSON.parse(JSON.stringify(init_board_state))

    let moveFrom = false;
    let selected_position = "";

    // all possible letters/columns in a chess board
    const col_letters = "abcdefgh"

    // for each number, add a number to it, put into array
    for (let rowNum = 8; rowNum > 0; rowNum--) {
        let row = [];
        for (let i = 0; i < col_letters.length; i++) {
            const id = col_letters.charAt(i) + rowNum.toString();
            row.push(id);
        }
        boardArray.push(row);
    }

    function findPieceAt(position) {
        let piece = "";
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === position) {
                piece = curr_board_state[i].type
            }
        }
        return piece;
    }

    function movePieceFrom(old_pos, new_pos) {
        console.log(`moving piece from ${old_pos} to ${new_pos}`);
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === old_pos) {
                curr_board_state[i].position = new_pos;
                setBoard(renderBoard());
                break;
            }
        }
        console.log(curr_board_state);
    }

    function click(position) {
        console.log("Clicking " + position);
        if (!moveFrom) {
            console.log("selecting " + position);
            selected_position = position;
        }
        else {
            console.log("deselecting at " + position);
            movePieceFrom(selected_position, position);
            selected_position = "";
        }
        moveFrom = !moveFrom;
    }

    function renderRow(rowNum, board) {
        const rowCells = board[rowNum - 1].map((id, key) => 
            <Square
                key={key}
                position={id}
                piece={findPieceAt(id)}
                onClick={() => click(id)}
            />
        );
        return rowCells;
    }

    function renderBoard() {
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

    const [full_board, setBoard] = useState(renderBoard());

    return (
        <div>
            { full_board }
        </div>
    )
}