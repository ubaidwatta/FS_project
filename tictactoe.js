const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let spaces = Array(9).fill(null);
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  spaces = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  }
}

function handleClick(index) {
  if (!gameActive || spaces[index]) return;

  spaces[index] = currentPlayer;
  const cell = board.children[index];
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (spaces.every(space => space)) {
    statusText.textContent = "It's a Draw! 😐";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combo => {
    const [a,b,c] = combo;
    return spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c];
  });
}

restartBtn.addEventListener("click", createBoard);

createBoard();
