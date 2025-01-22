function createPlayer(name, symbol, color) {
    let points = 0;
    const incrementPoints = () => points++;
    

    return {name, symbol, points, color, incrementPoints};
}

const player1 = createPlayer("David", "X", "#D139D4");
const player2 = createPlayer("Laura", "O", "#39D4BB");

const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".game-square").forEach((div) => div.innerText = "");
    };

    return {board, reset};
})();

function continuePlayingCheck() {
    document.querySelector(".play-again").style.display = "block";
}

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
    // e.target.style.color = currentPlayer.color;
    // console.log(e.target);
    
    
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
        currentPlayer.incrementPoints;
        continuePlayingCheck();
    } else if(!gameBoard.board.includes("")) {
        continuePlayingCheck();
    }
    // increment turn 
    turnTracker.incrementTurn();
})

document.querySelectorAll(".game-square").forEach((div) => div.addEventListener("click", (e) => {
    if(e.target.innerText === "") {
        gamePlayer(e);
    }
}));

document.querySelector(".restart").addEventListener("click", () => location.reload());

document.querySelector(".continue").addEventListener("click", (e) => {
    e.target.parentNode.style.display = "none";
    gameBoard.reset();
})