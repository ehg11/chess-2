import "./index.css";
import { getPath, getValFromString, name_map, piece_details } from "./utils.js"
import { useState } from "react";

import Modal from "./Modal.js"

export default function PieceInfo(props) {
    let piece_grid = 
        <div className="piece-grid">
            { infoButtons() }
        </div>
    let close = props.close;
    let [title, set_title] = useState("Pieces");
    let [body, set_body] = useState(piece_grid);
        
    let [back, set_back] = useState(false);

    function name2Title(piece) {
        piece = getValFromString(name_map, piece);
        let split = piece.split(" ");
        split.forEach((element, index) => {
            split[index] = element[0].toUpperCase() + element.slice(1);
        });
        return split.join(" ");
    }

    function descriptionPage(piece) {
        let desc = getValFromString(piece_details, piece);
        return (
            <div className="desc">
                <img 
                    className="info-piece"
                    src={ getPath(piece, "white")} 
                    alt={ piece } 
                />
                { desc }
            </div>
        )
    }

    function infoClick(piece) {
        console.log(piece);
        set_title(name2Title(piece));
        set_back(true);
        set_body(descriptionPage(piece));
    }

    function showInfoButtons() {
        set_title("Pieces");
        set_body(piece_grid);
        set_back(false);
    }

    function infoButtons() {
        let pieces =    ["king","queen","fish_queen",
                         "rook","knight","bishop",
                         "pawn", "bear"
                        ];
        let piece_buttons = pieces.map((piece, index) => {
            return (
                <button className="info-button" key={index}>
                    <img 
                        src={ getPath(piece, "white")} 
                        alt={ piece } 
                        onClick={ () => infoClick(piece)}
                    />
                </button>
            )
        })
        return piece_buttons
    }
    return (
        <Modal
            title={ title }
            body={ body }
            close={ close }
            back={ back }
            back_click={ () => showInfoButtons() }
        />
    )
}