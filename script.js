const board = document.getElementById('game-board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const newGameBtn = document.getElementById('new-game');
const restartGameBtn = document.getElementById('restart-game');
const currentPlayerDisplay = document.getElementById('current-player');

let currentPlayer = 'X';
let winner = null;
let player1 = 'Player 1';
let player2 = 'Player 2';
let cells = ['', '', '', '', '', '', '', '', ''];

// Function to toggle starting player
function toggleStartingPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            winner = cells[a];
            return true;
        }
    }

    return false;
}

function handleCellClick(index) {
    if (cells[index] || winner) return;

    cells[index] = currentPlayer;

    board.children[index].textContent = currentPlayer;

    if (checkWinner()) {
        fireworks();
        setTimeout(() => {
            alert(`Congratulations ${currentPlayer === 'X' ? player1 : player2}, you win!`);
            showNewGameButton();
        }, 2000);
    } else if (cells.every(cell => cell !== '')) {
        setTimeout(() => {
            alert('It\'s a draw!');
            showNewGameButton();
        }, 1000);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer === 'X' ? player1 : player2}`;
    }
}

function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    winner = null;
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer === 'X' ? player1 : player2}`;
    for (let cell of board.children) {
        cell.textContent = '';
    }
}

function fireworks() {
    const fireworks = document.createElement('div');
    fireworks.classList.add('fireworks');
    document.body.appendChild(fireworks);
    setTimeout(() => {
        fireworks.remove();
    }, 2000);
}

function showNewGameButton() {
    newGameBtn.style.display = 'block';
}

newGameBtn.addEventListener('click', () => {
    player1 = player1Input.value || 'Player 1';
    player2 = player2Input.value || 'Player 2';
    toggleStartingPlayer(); // Toggle starting player after each game
    resetGame();
    newGameBtn.style.display = 'none';
});

restartGameBtn.addEventListener('click', () => {
    resetGame();
});

initializeBoard();
