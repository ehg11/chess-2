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
    let possible_positions = [];

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

    function getColorAt(position) {
        let color = "";
        if (findPieceAt(position) === "") {
            return color;
        }
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === position) {
                color = curr_board_state[i].isWhite ? "white" : "black";
                return color;
            }
        }
    }

    function movePieceFrom(old_pos, new_pos) {
        console.log(` attempting to move piece from ${old_pos} to ${new_pos}`);
        if (!possible_positions.includes(new_pos)) {
            console.log("position is invalid, trying again");
            return false;
        }
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === old_pos) {
                curr_board_state[i].position = new_pos;
                break;
            }
        }
        return true;
    }

    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 96;

    function parsePos(position) {
        return [position[0], parseInt(position[1])];
    }

    function isValidPos(position) {
        let [col, row] = parsePos(position);
        col = alphaVal(col);
        if (col < 1 || col > 8) {
            return false;
        }
        if (row < 1 || row > 8) {
            return false;
        }
        return true;
    }

    function addIfValid(set, position) {
        if (isValidPos(position)) {
            set.add(position);
            return true;
        }
        return false;
    }

    function possiblePositions(piece, position) {
        let poss_pos = new Set();
        let [col, row] = parsePos(position);
        let colNum = alphaVal(col);
        let step;
        switch (piece) {
            case "pawn":
                let color = getColorAt(position);
                step = color === "white" ? 1 : -1;
                addIfValid(poss_pos, col + (row + step));
                if (color === "white") {
                    if (row === 2) {
                        step *= 2;
                        addIfValid(poss_pos, col + (row + step));
                    }
                }
                if (color === "black") {
                    if (row === 7) {
                        step *= 2;
                        addIfValid(poss_pos, col + (row + step));
                    }
                }
                break;
        }
        return Array.from(poss_pos);
    }

    function resetBoard() {
        console.log("resetting");
        curr_board_state = JSON.parse(JSON.stringify(init_board_state));
        setBoard(renderBoard());
    }

    function click(position) {
        // selecting a piece
        if (!moveFrom) {
            let piece = findPieceAt(position);
            if (piece === "") {
                return;
            }
            console.log(`selected ${piece}`);
            possible_positions = possiblePositions(piece, position);
            console.log("possible positions: " + possible_positions);
            selected_position = position;
            setBoard(renderBoard());
        }
        // placing a piece
        else {
            let moved = movePieceFrom(selected_position, position);
            if (!moved) {
                // return;
            }
            selected_position = "";
            possible_positions = [];
            setBoard(renderBoard());
        }
        moveFrom = !moveFrom;
    }

    function getPNGAt(position) {
        let path = "./assets/";
        let piece = findPieceAt(position);
        if (piece === "") {
            return "";
        }
        let color = getColorAt(position);
        path += piece + "_" + color + ".png";
        return path;
    }

    function renderRow(rowNum, board) {
        const rowCells = board[rowNum - 1].map((id, key) => 
            <Square
                key={key}
                position={id}
                piece={findPieceAt(id)}
                color={getColorAt(id)}
                onClick={() => click(id)}
                img={getPNGAt(id)}
                selected={selected_position === id}
                available={possible_positions.includes(id)}
            />
        );
        return rowCells;
    }

    function renderBoard() {
        return (
            <div className="board">
                <div className="alpha-row">
                    <div className="alpha-label">A</div>
                    <div className="alpha-label">B</div>
                    <div className="alpha-label">C</div>
                    <div className="alpha-label">D</div>
                    <div className="alpha-label">E</div>
                    <div className="alpha-label">F</div>
                    <div className="alpha-label">G</div>
                    <div className="alpha-label">H</div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 8 </div>
                    {renderRow(1, boardArray)}
                    <div className="num-label"> 8 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 7 </div>
                    {renderRow(2, boardArray)}
                    <div className="num-label"> 7 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 6 </div>    
                    {renderRow(3, boardArray)}
                    <div className="num-label"> 6 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 5 </div>
                    {renderRow(4, boardArray)}
                    <div className="num-label"> 5 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 4 </div>
                    {renderRow(5, boardArray)}
                    <div className="num-label"> 4 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 3 </div>
                    {renderRow(6, boardArray)}
                    <div className="num-label"> 3 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 2 </div>
                    {renderRow(7, boardArray)}
                    <div className="num-label"> 2 </div>
                </div>
                <div className="board-row">
                    <div className="num-label"> 1 </div>
                    {renderRow(8, boardArray)}
                    <div className="num-label"> 1 </div>
                </div>
                <div className="alpha-row">
                    <div className="alpha-label">A</div>
                    <div className="alpha-label">B</div>
                    <div className="alpha-label">C</div>
                    <div className="alpha-label">D</div>
                    <div className="alpha-label">E</div>
                    <div className="alpha-label">F</div>
                    <div className="alpha-label">G</div>
                    <div className="alpha-label">H</div>
                </div>
                <div className="board-row">
                    <button onClick={() => resetBoard()}>
                        RESET
                    </button>
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