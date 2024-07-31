
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = ['','','','','','','','',''];
    let click_audio = new Audio("click_sound.wav");
    let background_music = new Audio("bg_music.mp3");
    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal \
        [2, 4, 6]  // Diagonal /
    ];

    function checkWinner() {
        for (const [a, b, c] of winConditions) {
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
           click_audio.play();

        }
        return null;
    }
    function checkTie() {
        return !gameBoard.includes('');
    }

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] || checkWinner()) {
            return;
        }

        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            // background_music.play();
            
            
            alert(`Player ${winner} wins!`);
            return;
        }

        if (checkTie()) {
            alert("It's a tie!");
            return;
            

        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        gameBoard = ['','','','','','','','',''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    
    resetButton.addEventListener('click', resetGame);
});
