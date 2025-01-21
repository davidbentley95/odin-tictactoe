function createPlayer(name, symbol) {
    let points = 0;
    const incrementPoints = () => points++;
    

    return {name, symbol, points, incrementPoints};
}

// to delete
const player1 = createPlayer("David", "X");
const player2 = createPlayer("Laura", "O");

const gameBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    return {board};
})();

const turnTracker = (function() {
    let turn = 1;

    const incrementTurn = () => turn++;
    const getTurn = () => turn;

    return {incrementTurn, getTurn};
})();

const gamePlayer = (function (e) {
    // track who's turn
    let currentPlayer;
    if(turnTracker.getTurn() % 2 === 0){
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }

    // place tick
    gameBoard.board[e.target.id] = currentPlayer.symbol;
    e.target.innerText = currentPlayer.symbol;
    
    //check results
    if(
        (gameBoard.board[0] === currentPlayer.symbol && 
        gameBoard.board[1] === currentPlayer.symbol && 
        gameBoard.board[2] === currentPlayer.symbol) ||

        (gameBoard.board[3] === currentPlayer.symbol && 
        gameBoard.board[4] === currentPlayer.symbol && 
        gameBoard.board[5] === currentPlayer.symbol) ||

        (gameBoard.board[6] === currentPlayer.symbol && 
        gameBoard.board[7] === currentPlayer.symbol && 
        gameBoard.board[8] === currentPlayer.symbol) ||

        (gameBoard.board[0] === currentPlayer.symbol && 
        gameBoard.board[3] === currentPlayer.symbol && 
        gameBoard.board[6] === currentPlayer.symbol) ||

        (gameBoard.board[1] === currentPlayer.symbol && 
        gameBoard.board[4] === currentPlayer.symbol && 
        gameBoard.board[7] === currentPlayer.symbol) ||

        (gameBoard.board[3] === currentPlayer.symbol && 
        gameBoard.board[5] === currentPlayer.symbol && 
        gameBoard.board[8] === currentPlayer.symbol) ||

        (gameBoard.board[0] === currentPlayer.symbol && 
        gameBoard.board[4] === currentPlayer.symbol && 
        gameBoard.board[8] === currentPlayer.symbol) ||

        (gameBoard.board[2] === currentPlayer.symbol && 
        gameBoard.board[4] === currentPlayer.symbol && 
        gameBoard.board[6] === currentPlayer.symbol)
    ) {
        console.log(`${currentPlayer.name} wins!`);
        currentPlayer.incrementPoints;
    } else if(!gameBoard.board.includes("")) {
        alert("It's a draw!");
    }
    // increment turn 
    turnTracker.incrementTurn();

})

document.querySelectorAll(".game-square").forEach((div) => div.addEventListener("click", (e) => {
    if(e.target.innerText === "") {
        gamePlayer(e);
    }
}));

