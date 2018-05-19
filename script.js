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

let piece = "none";
let pieceAI;
let chosenGame = "none";
let positions = ['','','','','','','','',''];

window.onload = function() {
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(1)");
    pieceOptions.style.setProperty("transform", "translateX(-50%) scale(1)");
    gameType.style.setProperty("transform", "translateX(-50%) scale(1)");
};

for (let i in slot) {
    slot[i].addEventListener("click", () => {
        playerTurn(i);
        aiTurn();
        console.log(positions);
    });
}

function playerTurn(pos) {
    if (positions[pos] == ''){
        positions[pos] = piece;
        mark[pos].innerHTML = positions[pos];
        mark[pos].style.setProperty("transform", "scale(1)");
    }
}

function aiTurn() {
    let ix = minimax(positions, pieceAI).index;
    mark[ix].innerHTML = pieceAI;
    mark[ix].style.setProperty("transform", "scale(1)");
}

function appearBegin() {
    begin.style.setProperty("transform", "translateX(-50%) scale(1)");
}

begin.addEventListener("click", () => {
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
            return true;
        }
    }
    for(i = 0; i < 3; i+= 1){
        if (arr[i] == arr[i+3] && arr[i+3] == arr[i+6] && arr[i] !== ''){
            return true;
        }
    }

    if (arr[0] == arr[4] && arr[4] == arr[8] && arr[0] !== ''){
        return true;
    }

    if (arr[2] == arr[4] && arr[4] == arr[6] && arr[2] !== ''){
        return true;
    }

    return false;
}

function gameState(mark, pos) {
    let copyPos = positions.slice();
    copyPos[pos] = mark;
    if(checkVictory(copyPos) && mark == pieceAI){
        return 10;
    } else if(checkVictory(copyPos) && mark == piece){
        return -10;
    }
    return 0;
}

function possibilities(arr, p){
    const copyArr = arr.slice();
    const values = [];
    for (let i in copyArr){
        if (arr[i] == ''){
            values.push(gameState(p,i));
        } else if (p == piece){
            values.push(10000);
        } else {
            value.push(-10000);
        }
    }
    return values;
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
    return moves[bestMove];
    

}

