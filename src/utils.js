export var init_board_state = [
    {
        type: "pawn",
        position: "a2",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "b2",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "c1",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "d2",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "e2",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "f1",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "g2",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "h2",
        isWhite: true,
        alive: true,
    },
    {
        type: "bishop",
        position: "c2",
        isWhite: true,
        alive: true,
    },
    {
        type: "bishop",
        position: "f2",
        isWhite: true,
        alive: true,
    },
    {
        type: "knight",
        position: "b1",
        isWhite: true,
        alive: true,
    },
    {
        type: "knight",
        position: "g1",
        isWhite: true,
        alive: true,
    },
    {
        type: "rook",
        position: "a1",
        isWhite: true,
        alive: true,
    },
    {
        type: "rook",
        position: "h1",
        isWhite: true,
        alive: true,
    },
    {
        type: "queen",
        position: "d1",
        isWhite: true,
        alive: true,
    },
    {
        type: "king",
        position: "e1",
        isWhite: true,
        alive: true,
    },
    {
        type: "pawn",
        position: "a7",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "b7",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "c8",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "d7",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "e7",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "f8",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "g7",
        isWhite: false,
        alive: true,
    },
    {
        type: "pawn",
        position: "h7",
        isWhite: false,
        alive: true,
    },
    {
        type: "bishop",
        position: "c7",
        isWhite: false,
        alive: true,
    },
    {
        type: "bishop",
        position: "f7",
        isWhite: false,
        alive: true,
    },
    {
        type: "knight",
        position: "b8",
        isWhite: false,
        alive: true,
    },
    {
        type: "knight",
        position: "g8",
        isWhite: false,
        alive: true,
    },
    {
        type: "rook",
        position: "a8",
        isWhite: false,
        alive: true,
    },
    {
        type: "rook",
        position: "h8",
        isWhite: false,
        alive: true,
    },
    {
        type: "queen",
        position: "d8",
        isWhite: false,
        alive: true,
    },
    {
        type: "king",
        position: "e8",
        isWhite: false,
        alive: true,
    },
]

export function getPath(piece, color) {
    if (!piece) {
        return "";
    }
    return require("./assets/" + piece + "_" + color + ".png")
}

export function removeElement(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}