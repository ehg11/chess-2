import "./index.css"

import React, { useState } from "react";
import Square from "./Square.js"

import { init_board_state, removeElement } from "./utils.js"

export default function Board() {

    // 2D Array to Be Interpreted as a Board
    let boardArray = [];
    let curr_board_state = JSON.parse(JSON.stringify(init_board_state))

    // movement globals
    let moveFrom = false;
    let selected_position = "";
    let possible_positions = [];
    let targets_at = [];

    // trackers for special features
    let monkey_jump = false;
    let rook_enabled = false;

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

    function index2pos(colNum, rowNum) {
        return col_letters[colNum - 1] + rowNum;
    }

    function getPieceAt(position) {
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
        if (getPieceAt(position) === "") {
            return color;
        }
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === position) {
                color = curr_board_state[i].isWhite ? "white" : "black";
                return color;
            }
        }
    }

    function isLiving(position) {
        if (getPieceAt(position) === "") {
            return false;
        }
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === position) {
                return curr_board_state[i].alive;
            }
        }
    }

    function movePieceFrom(old_pos, new_pos) {
        // console.log(`attempting to move piece from ${old_pos} to ${new_pos}`);
        if (!(possible_positions.includes(new_pos) || targets_at.includes(new_pos))) {
            // console.log("position is invalid, trying again");
            return false;
        }
        let killed = false;
        // if piece was taken, change position to "", set alive to false (used for tracking)
        if (targets_at.includes(new_pos)) {
            for (let i = 0; i < curr_board_state.length; i++) {
                if (curr_board_state[i].position === new_pos) {
                    curr_board_state[i].position = "";
                    curr_board_state[i].alive = false;
                    killed = true;
                    break;
                }
            }
        }
        for (let i = 0; i < curr_board_state.length; i++) {
            if (curr_board_state[i].position === old_pos) {
                curr_board_state[i].position = new_pos;
                break;
            }
        }
        // special check for monkey if monkey jumped
        if (getPieceAt(new_pos) === "knight") {
            let [col, row] = pos2index(old_pos);
            let colNum = alphaVal(col);
            let one_away = [];
            // n
            addIfInBoard(colNum, row + 1, one_away);
            // ne
            addIfInBoard(colNum + 1, row + 1, one_away);
            // e
            addIfInBoard(colNum + 1, row, one_away);
            // se
            addIfInBoard(colNum + 1, row - 1, one_away);
            // s
            addIfInBoard(colNum, row - 1, one_away);
            // sw
            addIfInBoard(colNum - 1, row - 1, one_away);
            // w
            addIfInBoard(colNum - 1, row, one_away);
            // nw
            addIfInBoard(colNum - 1, row + 1, one_away); 
            // stand still
            addIfInBoard(colNum, row, one_away);
            if (!one_away.includes(new_pos)) {
                console.log("setting monkey_jump to true");
                monkey_jump = true;
            } 
            else {
                console.log("setting monkey_jump to false");
                monkey_jump = false;
            }
        }
        if (rook_enabled !== killed) {
            console.log(`${killed ? "enabling rook" : "disabling rook"}`);
        }
        rook_enabled = killed;
        return true;
    }

    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 96;

    function pos2index(position) {
        return [position[0], parseInt(position[1])];
    }

    function isValidPos(src, dest) {
        // if there is a piece at the destination cannot take
        // targets added separately
        if (src === dest) {
            return true;
        }
        if (getPieceAt(dest) !== "") {
            return false;
        }
        return true;
    }

    function addIfValid(src, dest, set) {
        if (isValidPos(src, dest)) {
            set.add(dest);
            return true;
        }
        return false;
    }

    function inBoard(col, row) {
        if (col < 1 || col > 8) {
            return false;
        }
        if (row < 1 || row > 8) {
            return false;
        }
        return true;
    }

    function addIfInBoard(col, row, array) {
        if (!inBoard(col, row)) {
            return false;
        }
        array.push(index2pos(col, row));
        return true;
    }

    function possiblePositions(piece, position) {
        let poss_pos = new Set();
        let targets = [];
        let color = getColorAt(position);
        let dirs = [];
        let [col, row] = pos2index(position);
        let colNum = alphaVal(col);
        // if in dev mode, all positions are possible
        // if (dev) {
        //     for (let i = 0; i < boardArray.length; i++) {
        //         for (let j = 0; j < boardArray[i].length; j++) {
        //             poss_pos.add(boardArray[i][j]);
        //         }
        //     }
        //     return Array.from(poss_pos);
        // }
        switch (piece) {
            case "pawn":
                let step = color === "white" ? 1 : -1;
                // adding all positions 1 space away
                addIfInBoard(colNum, row + step, dirs);
                addIfInBoard(colNum + 1, row, dirs);
                addIfInBoard(colNum + 1, row + step, dirs);
                addIfInBoard(colNum - 1, row, dirs);
                addIfInBoard(colNum - 1, row + step, dirs);
                // checking if any of them are targets
                // pawn can only take to diagonals
                if (dirs.includes(index2pos(colNum + 1, row + step))) {
                    let pos = index2pos(colNum + 1, row + step);
                    // must be piece and must be a different color to be target
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        targets.push(pos);
                    }
                }
                if (dirs.includes(index2pos(colNum - 1, row + step))) {
                    let pos = index2pos(colNum - 1, row + step);
                    // must be piece and must be a different color to be target
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        targets.push(pos);
                    }
                }
                break;
            case "bishop":
                // if a piece blocks a diagonal, the bishop cannot move
                let blocked_dirs = [];
                let block_pos = "";
                // ne
                if (inBoard(colNum + 1, row + 1)) {
                    block_pos = col_letters[colNum + 1 - 1] + (row + 1);
                    if (getPieceAt(block_pos) !== "") {
                        blocked_dirs.push("ne");
                    }
                }
                // se
                if (inBoard(colNum + 1, row - 1)) {
                    block_pos = col_letters[colNum + 1 - 1] + (row - 1);
                    if (getPieceAt(block_pos) !== "") {
                        blocked_dirs.push("se");
                    }
                }
                // nw
                if (inBoard(colNum - 1, row + 1)) {
                    block_pos = col_letters[colNum - 1 - 1] + (row + 1);
                    if (getPieceAt(block_pos) !== "") {
                        blocked_dirs.push("nw");
                    }
                }
                // sw
                if (inBoard(colNum - 1, row - 1)) {
                    block_pos = col_letters[colNum - 1 - 1] + (row - 1);
                    if (getPieceAt(block_pos) !== "") {
                        blocked_dirs.push("sw");
                    }
                }
                // ne
                if (!blocked_dirs.includes("ne")) {
                    addIfInBoard(colNum + 2, row + 2, dirs);
                }
                // se
                if (!blocked_dirs.includes("se")) {
                    addIfInBoard(colNum + 2, row - 2, dirs);
                }
                // nw
                if (!blocked_dirs.includes("nw")) {
                    addIfInBoard(colNum - 2, row + 2, dirs);
                }
                // sw
                if (!blocked_dirs.includes("sw")) {
                    addIfInBoard(colNum - 2, row - 2, dirs);
                }
                // check if any of them are targets
                for (let i = 0; i < dirs.length; i++) {
                    // if there is a piece there and the piece is a diff color
                    if (getPieceAt(dirs[i]) !== "" && getColorAt(dirs[i]) !== color) {
                        targets.push(dirs[i]);
                    }
                }
                break;
            case "knight":
                // if not jumped, can move in any direction
                // cannot take pieces
                // n
                if (!monkey_jump) {
                    addIfInBoard(colNum, row + 1, dirs);
                    // ne
                    addIfInBoard(colNum + 1, row + 1, dirs);
                    // e
                    addIfInBoard(colNum + 1, row, dirs);
                    // se
                    addIfInBoard(colNum + 1, row - 1, dirs);
                    // s
                    addIfInBoard(colNum, row - 1, dirs);
                    // sw
                    addIfInBoard(colNum - 1, row - 1, dirs);
                    // w
                    addIfInBoard(colNum - 1, row, dirs);
                    // nw
                    addIfInBoard(colNum - 1, row + 1, dirs);       
                }
                // check for jumps
                // n
                let pos = index2pos(colNum, row + 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum, row + 2, dirs);
                    // if the jumped spot has a piece of diff color, add to targets
                    let target_pos = index2pos(colNum, row + 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // ne
                pos = index2pos(colNum + 1, row + 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum + 2, row + 2, dirs);
                    let target_pos = index2pos(colNum + 2, row + 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // e
                pos = index2pos(colNum + 1, row);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum + 2, row, dirs);
                    let target_pos = index2pos(colNum + 2, row);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // se
                pos = index2pos(colNum + 1, row - 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum + 2, row - 2, dirs);
                    let target_pos = index2pos(colNum + 2, row - 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // s
                pos = index2pos(colNum, row - 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum, row - 2, dirs);
                    // if the jumped spot has a piece of diff color, add to targets
                    let target_pos = index2pos(colNum, row - 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // sw
                pos = index2pos(colNum - 1, row - 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum - 2, row - 2, dirs);
                    let target_pos = index2pos(colNum - 2, row - 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // w
                pos = index2pos(colNum - 1, row);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum - 2, row, dirs);
                    let target_pos = index2pos(colNum - 2, row);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // nw
                pos = index2pos(colNum - 1, row + 1);
                if (getPieceAt(pos) !== "") {
                    addIfInBoard(colNum - 2, row + 2, dirs);
                    let target_pos = index2pos(colNum - 2, row + 2);
                    if (getPieceAt(target_pos) !== "" && getColorAt(target_pos) !== color) {
                        targets.push(target_pos);
                    }
                }
                // if jumped, add option to stay still
                if (monkey_jump) {
                    dirs.push(position);
                }
                break;
            case "rook":
                // can move anywhere
                for (let i = 0; i < boardArray.length; i++) {
                    for (let j = 0; j < boardArray[i].length; j++) {
                        dirs.push(boardArray[i][j]);
                    }
                }
                // remove current location
                removeElement(dirs, position);
                // if a piece was killed on prev turn, rook can take adjacent pieces
                if (rook_enabled) {
                    // if adjacent pieces are pieces, remove from dirs, add to targets
                    // n
                    let pos = index2pos(colNum, row + 1);
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        removeElement(dirs, pos);
                        targets.push(pos);
                    }
                    // s
                    pos = index2pos(colNum, row - 1);
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        removeElement(dirs, pos);
                        targets.push(pos);
                    }
                    // e
                    pos = index2pos(colNum + 1, row);
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        removeElement(dirs, pos);
                        targets.push(pos);
                    }
                    pos = index2pos(colNum - 1, row);
                    if (getPieceAt(pos) !== "" && getColorAt(pos) !== color) {
                        removeElement(dirs, pos);
                        targets.push(pos);
                    }
                }
                break;
            case "king":
                // n
                addIfInBoard(colNum, row + 1, dirs);
                // ne
                addIfInBoard(colNum + 1, row + 1, dirs);
                // e
                addIfInBoard(colNum + 1, row, dirs);
                // se
                addIfInBoard(colNum + 1, row - 1, dirs);
                // s
                addIfInBoard(colNum, row - 1, dirs);
                // sw
                addIfInBoard(colNum - 1, row - 1, dirs);
                // w
                addIfInBoard(colNum - 1, row, dirs);
                // nw
                addIfInBoard(colNum - 1, row + 1, dirs);  
                // king can kill in any of the directions
                for (let i = 0; i < dirs.length; i++) {
                    // if there is a piece there and the piece is a diff color
                    if (getPieceAt(dirs[i]) !== "" && getColorAt(dirs[i]) !== color) {
                        targets.push(dirs[i]);
                    }
                }
                break;
            case "queen":
                // in each direction, keep going until the edge of the board
                // n
                for (let i = 1; addIfInBoard(colNum, row + i, dirs); i++) {
                    let pos = index2pos(colNum, row + i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // s
                for (let i = 1; addIfInBoard(colNum, row - i, dirs); i++) {
                    let pos = index2pos(colNum, row - i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // e
                for (let i = 1; addIfInBoard(colNum + i, row, dirs); i++) {
                    let pos = index2pos(colNum + i, row);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // w
                for (let i = 1; addIfInBoard(colNum - i, row, dirs); i++) {
                    let pos = index2pos(colNum - i, row);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // ne
                for (let i = 1; addIfInBoard(colNum + i, row + i, dirs); i++) {
                    let pos = index2pos(colNum + i, row + i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    }  
                }
                // se
                for (let i = 1; addIfInBoard(colNum + i, row - i, dirs); i++) {
                    let pos = index2pos(colNum + i, row - i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // nw
                for (let i = 1; addIfInBoard(colNum - i, row + i, dirs); i++) {
                    let pos = index2pos(colNum - i, row + i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                // sw
                for (let i = 1; addIfInBoard(colNum - i, row - i, dirs); i++) {
                    let pos = index2pos(colNum - i, row - i);
                    // if the queen hits a piece of a diff color, stop the line, add it to targets
                    // if the queen hits a piece of same color, just stop the line
                    if (getPieceAt(pos) !== "") {
                        if (getColorAt(pos) !== color) {
                            targets.push(pos);
                        }
                        break;
                    } 
                }
                break;
            default:
                break;  
        }
        for (let i = 0; i < dirs.length; i++) {
            addIfValid(position, dirs[i], poss_pos);
        }
        return [Array.from(poss_pos), targets];
    }

    function resetBoard() {
        console.log("resetting");
        curr_board_state = JSON.parse(JSON.stringify(init_board_state))

        // movement globals
        moveFrom = false;
        selected_position = "";
        possible_positions = [];
        targets_at = [];
    
        // trackers for special features
        monkey_jump = false;
        rook_enabled = false;

        setBoard(renderBoard());
    }

    function click(position) {
        // selecting a piece
        if (!moveFrom) {
            let piece = getPieceAt(position);
            if (piece === "") {
                return;
            }
            // console.log(`selected ${piece}`);
            [possible_positions, targets_at] = possiblePositions(piece, position);
            console.log(`possible positions: ${possible_positions}`);
            console.log(`targets at: ${targets_at}`);
            // console.log("possible positions: " + possible_positions);
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
            targets_at = [];
            setBoard(renderBoard());
        }
        moveFrom = !moveFrom;
    }

    function getPNGAt(position) {
        let path = "./assets/";
        let piece = getPieceAt(position);
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
                piece={getPieceAt(id)}
                color={getColorAt(id)}
                alive={isLiving(id)}
                onClick={() => click(id)}
                img={getPNGAt(id)}
                selected={selected_position === id}
                available={possible_positions.includes(id)}
                target={targets_at.includes(id)}
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
                    <Square
                        position={"z5"}
                    />
                    <div className="num-label"> 5 </div>
                    {renderRow(4, boardArray)}
                    <div className="num-label"> 5 </div>
                    <Square
                        position={"i5"}
                    />
                </div>
                <div className="board-row">
                    <Square
                        position={"z4"}
                    />
                    <div className="num-label"> 4 </div>
                    {renderRow(5, boardArray)}
                    <div className="num-label"> 4 </div>
                    <Square
                        position={"i4"}
                    />
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
            </div>
        )
    }

    const [full_board, setBoard] = useState(renderBoard());

    return (
        <div>
            { full_board }
            <div className="board-row">
                <button onClick={() => resetBoard()}>
                    RESET
                </button>
            </div>
        </div>
    )
}