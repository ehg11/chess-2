# Rules

## Pieces
### Rook
- Can move anywhere
- If the opponent took a piece in the previous turn, can take a piece in any of the four main directions (not diagonal)

### Monkey
- Can move to any of the 8 available adjacent squares (includes diagonals). If the space is occupied, it cannot move there. 
-  If there is an adjacent piece **of any color**, the monkey can swing over it an land on the other side (like in checkers). The monkey cannot jump back over any piece it has already jumped over. 
- The monkey can continue jumping until:
    - There are no more adjacent pieces the monkey has not jumped over yet.
    - The monkey lands on a piece of the opposite color, thereby taking the piece.
    - The player decides to stop the monkey.
- In any of the above three cases, the player's turn will end. The monkey cannot perform a default move after jumping. 
- Additional Functionality: See [The Banana Catch](#the-banana-catch)

### Elephant
- Moves exactly two diagonal spaces in any of the 4 diagonal directions. 
- If there is a piece directly diagonal from it, it **cannot** "jump" over the piece like the monkey can.
- If it lands on a piece of the opposite color, it takes it.

### Fish
- The fish can move 1 space in any direction except backwards. (North, East, West, Northeast, Northwest).
- The fish can only take pieces in the diagonal directions (Northeast, Northwest).
- If the fish makes it across the board (for the white fish >> the 8th rank, for the black fish >> the 1st rank), it becomes a **fishy** queen. 

### King
- The king behaves exactly how it does in normal chess.
- The king begins the game with a banana. See [The Banana Catch](#the-banana-catch)
- When the king is taken, the game is **NOT** over. Instead, the king is captured

### Queen
- The queen behaves exactly how it does in normal chess. 

## Win Condition
- The game is over when both the king and queen are captured. The jail for the white king and queen is next the the A file; the jail for the black king and queen is next to the H file. The jail cells are on the 4th and 5th rank. 
- When a king or queen is captured, the player that captured the king or queen can select which jail square to put the captured piece into. 
- ### The Banana Catch
    - If the king has his banana, he can be rescued by the monkey.
    - The **Banana Catch** can be performed under the following conditions:
        - The monkey is directly adjacent to the king of the same color. 
        - The monkey can swing to a different spot on the board.
        - The king is holding a banana.
    - If the above three conditions are satisfied, the **Banana Catch** can be performed. The monkey may jump into the jail and rescue the king. The king is left on the space the monkey rescued him from (adjacent to the jail) and the monkey MUST continue jumping to an available position. 
    - The rescued king then loses his banana. If a king loses his banana, he can no longer be rescued. 
