import "./index.css"

import React from "react"
import { getPath } from "./utils.js"

export default function Square(props) {

    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 96
    const col = alphaVal(props.position.charAt(0));
    const row = props.position.charAt(1);

    function isBlue() {
        return (parseInt(col) + parseInt(row)) % 2 === 0;
    }

    function bananaCatchSquare() {
        // if the king w/ banana is in an available square
        if (props.available && props.piece === "king_banana") {
            // and that square is a jail cell
            if (props.position.charAt(0) === "z" || props.position.charAt(0) === "i") {
                return true;
            }
        }
        return false;
    }

    if( isBlue() ) {
        return (
            <button className={`square blue ${props.selected ? "selected" : ""}`} onClick={ props.onClick }>
                { !bananaCatchSquare()
                    ? <div className={`${props.available ? "available" : ""} ${props.target ? "target" : ""}`}></div> 
                    : <div className="banana-catch"></div>    
                }
                <img className="piece" src={ getPath(props.piece, props.color) } alt={ props.piece }/>
            </button>
        )
    }
    else {
        return (
            <button className={`square white ${props.selected ? "selected" : ""}`} onClick={ props.onClick }>
                <div className={`${props.available ? "available" : ""} ${props.target ? "target" : ""}`}></div>
                <img className="piece" src={ getPath(props.piece, props.color) } alt={ props.piece }/>
            </button>
        )
    }
}

