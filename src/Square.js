import "./index.css"

import React from "react"
import { getPath } from "./utils.js"

export default function Square(props) {

    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 96

    function isBlue() {
        const col = alphaVal(props.position.charAt(0));
        const row = props.position.charAt(1);
        return (parseInt(col) + parseInt(row)) % 2 === 0;
    }

    if( isBlue() ) {
        return (
            <button className={`square blue ${props.selected ? "selected" : ""}`} onClick={ props.onClick }>
                <img className="piece" src={ getPath(props.piece, props.color) } alt={ props.piece }/>
                <div className={`${props.available ? "available" : ""}`}></div>
            </button>
        )
    }
    else {
        return (
            <button className={`square white ${props.selected ? "selected" : ""}`} onClick={ props.onClick }>
                <img className="piece" src={ getPath(props.piece, props.color) } alt={ props.piece }/>
                <div className={`${props.available ? "available" : ""}`}></div>
            </button>
        )
    }
}

