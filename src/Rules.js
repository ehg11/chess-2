export default function Rules() {
    return (
        <div className="rules">
            <h1 id="rules">Rules</h1>
                <h2 id="pieces">Pieces</h2>
                <h3 id="crow">Crow</h3>
                <ul>
                <li>Can move anywhere</li>
                <li>If the opponent took a piece in the previous turn, can take a piece in any of the four main directions (not diagonal)</li>
                <li>Note: capturing the king or queen does not enable the rook to take a piece. See <a href="#win-condition">Win Condition</a></li>
                </ul>
                <h3 id="monkey">Monkey</h3>
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
                <li>Additional Functionality: See <a href="#the-banana-catch">The Banana Catch</a></li>
                </ul>
                <h3 id="elephant">Elephant</h3>
                <ul>
                <li>Moves exactly two diagonal spaces in any of the 4 diagonal directions. </li>
                <li>If there is a piece directly diagonal from it, it <strong>cannot</strong> &quot;jump&quot; over the piece like the monkey can.</li>
                <li>If it lands on a piece of the opposite color, it takes it.</li>
                </ul>
                <h3 id="fish">Fish</h3>
                <ul>
                <li>The fish can move 1 space in any direction except backwards. (North, East, West, Northeast, Northwest).</li>
                <li>The fish can only take pieces in the diagonal directions (Northeast, Northwest).</li>
                <li>If the fish makes it across the board (for the white fish &gt;&gt; the 8th rank, for the black fish &gt;&gt; the 1st rank), it becomes a <a href="#fishy-queen"><strong>fishy</strong> queen</a>.</li>
                </ul>
                <h3 id="king">King</h3>
                <ul>
                <li>The king behaves exactly how it does in normal chess.</li>
                <li>The king begins the game with a banana. See <a href="#the-banana-catch">The Banana Catch</a></li>
                <li>When the king is taken, the game is <strong>NOT</strong> over. Instead, the king is captured and moved to the prison. See <a href="#win-condition">Win Condition</a></li>
                <li>Because of the above case, the player is not forced to move the King is the king is in &#39;check&#39; or &#39;checkmate&#39;. The game will continue until the <a href="#win-condition">Win Condition</a> is satisfied.</li>
                </ul>
                <h3 id="queen">Queen</h3>
                <ul>
                <li>The queen behaves exactly how it does in normal chess.</li>
                <li>When the queen is taken, the queen is captured and moved to the prison. See <a href="#win-condition">Win Condition</a></li>
                </ul>
                <h3 id="fishy-queen">Fishy Queen</h3>
                <ul>
                <li>The fishy queen behaves exactly how the queen does in normal chess.</li>
                <li>When the fishy queen is taken, the fishy queen is removed from the board. </li>
                </ul>
                <h3 id="bear">Bear</h3>
                <ul>
                <li>The bear begins in the middle of the board. Until a player moves the bear to a valid position, the bear is not in play. The game proceeds as if the bear does not exist.</li>
                <li>Either player can take control of the bear on their turn. From the center of the board, the bear must first move to positions <code>D4, D5, E4, or E5</code>. From there, either player can move the bear to any of the 8 adjacent positions (including diagonals). </li>
                <li>The bear cannot take pieces. However, the bear can be taken. The monkey may also jump over the bear, provided it is in a valid space--the center of the board is not a valid space. </li>
                </ul>
                <h2 id="win-condition">Win Condition</h2>
                <ul>
                <li>The game is over when both the king and queen are captured. The jail for the white king and queen is next the the A file; the jail for the black king and queen is next to the H file. The jail cells are on the 4th and 5th rank. </li>
                <li>When a king or queen is captured, the player that captured the king or queen can select which jail square (4th or 5th rank) to put the captured piece into. </li>
                <li><h3 id="the-banana-catch">The Banana Catch</h3>
                <ul>
                <li>If the king has his banana, he can be rescued by the monkey.</li>
                <li>The <strong>Banana Catch</strong> can be performed under the following conditions:<ul>
                <li>The monkey is directly adjacent to the king of the same color. </li>
                <li>The monkey can swing to a different spot on the board.</li>
                <li>The king is holding a banana.</li>
                </ul>
                </li>
                <li>If the above three conditions are satisfied, the <strong>Banana Catch</strong> can be performed. The monkey may jump into the jail and rescue the king. The king is left on the space the monkey rescued him from (adjacent to the jail) and the monkey MUST continue jumping to an available position. </li>
                <li>Upon reaching the available position, the monkey may no longer jump. He must rest and consume the banana. </li>
                <li>The rescued king loses his banana. If a king loses his banana, he can no longer be rescued.</li>
                </ul>
                </li>
                <li>The game is only over once both the king and queen are captured. This is the case even if the king has his banana. The fishy queen cannot be captured. The victor is the player who successfully captured both the opposing king and queen.</li>
                </ul>
        </div>
    )
}