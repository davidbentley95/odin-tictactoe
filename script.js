let player1;
let player2;

function createPlayer(name, symbol) {
    let points = 0;
    const incrementPoints = () => points++;
    const getPoints = () => points;
    
    return {name, symbol, points, incrementPoints, getPoints};
}

const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    const reset = () => {
        board.fill("");
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
    let currentScore;
    if(turnTracker.getTurn() % 2 === 0){
        currentPlayer = player2;
        currentScore = document.querySelector(".player2-score");
    } else {
        currentPlayer = player1;
        currentScore = document.querySelector(".player1-score");
    }

    // place tick
    gameBoard.board[e.target.id] = currentPlayer.symbol;
    e.target.innerHTML = currentPlayer.symbol.outerHTML;
    
    
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
        currentPlayer.incrementPoints();
        currentScore.innerText = currentPlayer.getPoints();
        continuePlayingCheck();
        console.log(gameBoard.board)
    } else if(!gameBoard.board.includes("")) {
        continuePlayingCheck();
        console.log(gameBoard.board)
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

document.querySelector(".start-game-button").addEventListener("click", (e) => {
    const player1Name = e.target.parentNode.querySelector("#player1").value;
    const player1Symbol = e.target.parentNode.querySelector(".player1-symbol")
    const player2Name = e.target.parentNode.querySelector("#player2").value
    const player2Symbol = e.target.parentNode.querySelector(".player2-symbol")
    
    player1 = createPlayer(player1Name, player1Symbol);
    player2 = createPlayer(player2Name, player2Symbol);
   
    document.querySelector(".start-game").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
})
