import "./index.css"

import React from "react"

export default function Square(props) {

    const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 96

    function isBlue() {
        const col = alphaVal(props.position.charAt(0));
        const row = props.position.charAt(1);
        return (parseInt(col) + parseInt(row)) % 2 === 0;
    }

    if( isBlue() ) {
        return (
            <button className="square blue" onClick={ props.onClick }>
                {props.piece}
            </button>
        )
    }
    else {
        return (
            <button className="square white" onClick={ props.onClick }>
                {props.piece}
            </button>
        )
    }
}