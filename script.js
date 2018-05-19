const slot = Array.from(document.querySelectorAll(".slot"));
const mark = Array.from(document.querySelectorAll(".mark"));
const cover = document.querySelector(".cover");
const pieceOptions = document.querySelector(".piece-options");
const gameType = document.querySelector(".game-type");
const singlePlayer = document.querySelector(".single");
const multiPlayer = document.querySelector(".multi");
const begin = document.querySelector(".begin");
const pieceO = document.querySelector(".buttonO");
const pieceX = document.querySelector(".buttonX");
const restart = document.querySelector(".restart");
const endtext = document.querySelector(".endtext");
const endingMessage = document.querySelector(".end-message");

let piece;
let piece2;
let pieceAI;
let chosenGame;
let positions = ['','','','','','','','',''];
let winnerPlaces = [];

function beginAll() {
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(1)");
    pieceOptions.style.setProperty("transform", "translateX(-50%) scale(1)");
    gameType.style.setProperty("transform", "translateX(-50%) scale(1)");
    restart.style.setProperty("transform", "translateX(-50%) scale(0)");
    endingMessage.style.setProperty("transform", "translateX(-50%) scale(0)");
    pieceX.style.setProperty("background-color", "#6ed17d");
    pieceO.style.setProperty("background-color", "#6ed17d");
    multiPlayer.style.setProperty("background-color", "#6ed17d");
    singlePlayer.style.setProperty("background-color", "#6ed17d");
    positions = ['','','','','','','','',''];
    mark.forEach(e => {
        e.style.cssText = "color: white; transform: scale(0); transition: transform 0.3s, color 0.3s; transition-timing-function: cubic-bezier(0, 1.11, 0.43, 1.2);"
    });
    piece = "none";
    chosenGame = "none";
    winnerPlaces = [];
}

window.onload = beginAll;

let player1Turn = true;

for (let i in slot) {
    slot[i].addEventListener("click", () => {
        if (positions[i] == ''){
            if (chosenGame == singlePlayer) {
                playerTurn(i, piece);
                gameState(piece);
                aiTurn();
                gameState(pieceAI);
            } else {
                if (player1Turn){
                    playerTurn(i, piece);
                    player1Turn = false;
                    gameState(piece);
                } else {
                    player1Turn = true;
                    playerTurn(i, piece2);
                    gameState(piece2);
                }
            }
            
        } 
        paintWinners();
        
    });
}


function gameState(mark) {
    if(checkVictory(positions) && mark == pieceAI){
        setTimeout(endingScreen, 1000);
        endtext.innerHTML = 'You lost!';
    } else if(checkVictory(positions) && mark == piece && pieceAI != ''){
        setTimeout(endingScreen, 1000);
        endtext.innerHTML = 'You won!';
    } else if(checkVictory(positions) && mark == piece2){
        setTimeout(endingScreen, 1000);
        endtext.innerHTML = 'Player 2 won!';
    } else if (checkVictory(positions) && mark == piece && pieceAI == '') {
        setTimeout(endingScreen, 1000);
        endtext.innerHTML = 'Player 1 won!';
    }
    const emptySpots = [];
    for (let i in positions){
        if(positions[i] === ''){
            emptySpots.push(i);
        }
    }
    if(emptySpots.length == 0){
        setTimeout(endingScreen, 1000);
        endtext.innerHTML = 'It\'s a Tie!';
    }
    return -999;
}

function endingScreen(){
    paintWinners();
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(1)");
    restart.style.setProperty("transform", "translateX(-50%) scale(1)");
    endingMessage.style.setProperty("transform", "translateX(-50%) scale(1)");
}


function playerTurn(pos, p) {
    positions[pos] = p;
    mark[pos].innerHTML = positions[pos];
    mark[pos].style.setProperty("transform", "scale(1)");

}

let firstPlay = true;

function aiTurn() {
    let ix = minimax(positions, pieceAI).index;
    positions[ix] = pieceAI;
    mark[ix].innerHTML = pieceAI;
    mark[ix].style.setProperty("transform", "scale(1)");
}

function appearBegin() {
    begin.style.setProperty("transform", "translateX(-50%) scale(1)");
}

restart.addEventListener('click', beginAll);

begin.addEventListener("click", () => {
    if (chosenGame == multiPlayer){
        piece2 = pieceAI;
        pieceAI = '';
    }
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(0)");
    pieceOptions.style.setProperty("transform", "translateX(-50%) scale(0)");
    gameType.style.setProperty("transform", "translateX(-50%) scale(0)");
    begin.style.setProperty("transform", "translateX(-50%) scale(0)");
});

singlePlayer.addEventListener("click", () => {
    chosenGame = singlePlayer;
    multiPlayer.style.setProperty("background-color", "#455347");
    singlePlayer.style.setProperty("background-color", "#35f852");
    if (piece != "none") {
        appearBegin();
    }
});

multiPlayer.addEventListener("click", () => {
    chosenGame = multiPlayer;
    singlePlayer.style.setProperty("background-color", "#455347");
    multiPlayer.style.setProperty("background-color", "#35f852");
    if (piece != "none") {
        appearBegin();
    }
});

pieceO.addEventListener("click", () => {
    piece = "O";
    pieceAI = "X";
    pieceX.style.setProperty("background-color", "#455347");
    pieceO.style.setProperty("background-color", "#35f852");
    if (chosenGame != "none") {
        appearBegin();
    }
});

pieceX.addEventListener("click", () => {
    piece = "X";
    pieceAI = "O";
    pieceO.style.setProperty("background-color", "#455347");
    pieceX.style.setProperty("background-color", "#35f852");
    if (chosenGame != "none") {
        appearBegin();
    }
});

function checkVictory(arr) {
    for(let i = 0; i < 7; i+= 3){
        if (arr[i] == arr[i+1] && arr[i+1] == arr[i+2] && arr[i] !== ''){
            winnerPlaces = [i,i+1,i+2];
            return true;
        }
    }
    for(i = 0; i < 3; i+= 1){
        if (arr[i] == arr[i+3] && arr[i+3] == arr[i+6] && arr[i] !== ''){
            winnerPlaces = [i,i+3,i+6];
            return true;
        }
    }

    if (arr[0] == arr[4] && arr[4] == arr[8] && arr[0] !== ''){
        winnerPlaces = [0,4,8];
        return true;
    }

    if (arr[2] == arr[4] && arr[4] == arr[6] && arr[2] !== ''){
        winnerPlaces = [2,4,6];
        return true;
    }

    return false;
}

function paintWinners() {
    for (i in winnerPlaces){
        mark[winnerPlaces[i]].style.setProperty("color", "#35f852");
    }
}

function minimax(arr, p){
    const emptySpots = [];
    for (let i in arr){
        if(arr[i] === ''){
            emptySpots.push(i);
        }
    }

    if (checkVictory(arr) && p == pieceAI){
        return {score: -10};
    } else if (checkVictory(arr) && p == piece){
        return {score: 10};
    } else if (emptySpots.length === 0){
        return {score: 0};
    }

    const moves = [];
    for (let i in emptySpots){
        let move = {};
        move.index = Number(emptySpots[i]);
        arr[emptySpots[i]] = p;
        if(p == pieceAI){
            let result = minimax(arr, piece);
            move.score = result.score;
        } else {
            let result = minimax(arr, pieceAI);
            move.score = result.score;
        }
        arr[emptySpots[i]] = '';
        moves.push(move);
    }

    let bestMove;

    if(p == pieceAI){
        let value = -10000;
        for (let i in moves){
            if (moves[i].score > value){
                value = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let value = 10000;
        for (let i in moves){
            if (moves[i].score < value){
                value = moves[i].score;
                bestMove = i;
            }
        }
    }
    winnerPlaces = [];
    return moves[bestMove];
    

}

