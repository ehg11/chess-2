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
        jailed: false,
    },
    {
        type: "king_banana",
        position: "e1",
        isWhite: true,
        jailed: false,
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
        jailed: false,
    },
    {
        type: "king_banana",
        position: "e8",
        isWhite: false,
        jailed: false,
    },
    {
        type: "bear",
        position: "center",
        isWhite: false,
    }
]

export const name_map = {
    "king":"king",
    "queen":"queen",
    "fish_queen":"fishy queen",
    "rook":"crow",
    "knight":"monkey",
    "bishop":"elephant",
    "pawn":"fish",
    "bear":"bear",
};

export const piece_details = {
    "king":
        <div>
            <ul>
                <li>The king behaves exactly how it does in normal chess.</li>
                <li>The king begins the game with a banana.</li>
                <li>When the king is taken, the game is <strong>NOT</strong> over. Instead, the king is captured and moved to the prison.</li>
                <li>Because of the above case, the player is not forced to move the King is the king is in &#39;check&#39; or &#39;checkmate&#39;. The game will continue until the  is satisfied.</li>
            </ul>
        </div>,
    "queen":
        <div>
            <ul>
                <li>The queen behaves exactly how it does in normal chess.</li>
                <li>When the queen is taken, the queen is captured and moved to the prison.</li>
            </ul>
        </div>,
    "fish_queen":
        <div>
            <ul>
                <li>The fishy queen behaves exactly how the queen does in normal chess.</li>
                <li>When the fishy queen is taken, the fishy queen is removed from the board. </li>
            </ul>
        </div>,
    "rook":
        <div>
            <ul>
                <li>Can move anywhere</li>
                <li>If the opponent took a piece in the previous turn, can take a piece in any of the four main directions (not diagonal)</li>
                <li>Note: capturing the king or queen does not enable the rook to take a piece.</li>
            </ul> 
        </div>,
    "knight":
        <div>
                <ul>
                    <li>Can move to any of the 8 available adjacent squares (includes diagonals). If the space is occupied, it cannot move there. </li>
                    <li>If there is an adjacent piece <strong>of any color</strong>, the monkey can swing over it an land on the other side (like in checkers). The monkey cannot jump back over any piece it has already jumped over. </li>
                    <li>The monkey can continue jumping until:<ul>
                        <li>There are no more adjacent pieces the monkey has not jumped over yet.</li>
                        <li>The monkey lands on a piece of the opposite color, thereby taking the piece.</li>
                        <li>The player decides to stop the monkey.</li>
                    </ul>
                    </li>
                    <li>In any of the above three cases, the player&#39;s turn will end. The monkey cannot perform a default move after jumping. </li>
                </ul>
        </div>,
    "bishop":
        <div>
            <ul>
                <li>Moves exactly two diagonal spaces in any of the 4 diagonal directions. </li>
                <li>If there is a piece directly diagonal from it, it <strong>cannot</strong> &quot;jump&quot; over the piece like the monkey can.</li>
                <li>If it lands on a piece of the opposite color, it takes it.</li>
            </ul> 
        </div>,
    "pawn":
        <div>
            <ul>
                <li>The fish can move 1 space in any direction except backwards. (North, East, West, Northeast, Northwest).</li>
                <li>The fish can only take pieces in the diagonal directions (Northeast, Northwest).</li>
                <li>If the fish makes it across the board (for the white fish &gt;&gt; the 8th rank, for the black fish &gt;&gt; the 1st rank), it becomes a .</li>
            </ul> 
        </div>,
    "bear":
        <div>
            <ul>
                <li>The bear begins in the middle of the board. Until a player moves the bear to a valid position, the bear is not in play. The game proceeds as if the bear does not exist.</li>
                <li>Either player can take control of the bear on their turn. From the center of the board, the bear must first move to positions <code>D4, D5, E4, or E5</code>. From there, either player can move the bear to any of the 8 adjacent positions (including diagonals). </li>
                <li>The bear cannot take pieces. However, the bear can be taken. The monkey may also jump over the bear, provided it is in a valid space--the center of the board is not a valid space. </li>
            </ul>  
        </div>
}

export function getPath(piece, color) {
    if (!piece) {
        return "";
    }
    if (piece === "bear") {
        return require("./assets/" + piece + ".png");
    }
    return require("./assets/" + piece + "_" + color + ".png");
}

export function removeElement(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

export function getValFromString(dict, string) {
    let index = Object.keys(dict).findIndex(
        ele => ele === string
    );
    return Object.values(dict)[index];
}