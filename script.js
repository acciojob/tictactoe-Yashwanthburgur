//your JS code here. If required.
let player1, player2;
let currentPlayer = 'X';
let playerNames = {};
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
  player1 = document.getElementById('player-1').value || 'Player 1';
  player2 = document.getElementById('player-2').value || 'Player 2';
	
  playerNames['X'] = player1;
  playerNames['O'] = player2;
  
  // Reset game state
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  
  // Clear board UI
  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).textContent = '';
  }
  
  // Switch views
  document.getElementById('setup').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  
  // Show first turn
  document.querySelector('.message').textContent = `${player1}, you're up`;
}

document.getElementById('board').addEventListener('click', (e) => {
  if (e.target.id === 'board' || !gameActive) return;
  
  const cellId = parseInt(e.target.id);
  const index = cellId - 1;
  
  if (board[index] !== '') return;
  
  // Update data and UI
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  // Check win
  if (checkWin()) {
    gameActive = false;
    document.querySelector('.message').textContent = 
      `${playerNames[currentPlayer]} congratulations you won!`;
    return;
  }
  
  // Check draw
  if (checkDraw()) {
    gameActive = false;
    document.querySelector('.message').textContent = "It's a draw!";
    return;
  }
  
  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.querySelector('.message').textContent = 
    `${playerNames[currentPlayer]}, you're up`;
});

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  
  return wins.some(([a,b,c]) => 
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function checkDraw() {
  return !board.includes('');
}