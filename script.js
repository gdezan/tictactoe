const slot = Array.from(document.querySelectorAll(".slot"));
const mark = Array.from(document.querySelectorAll(".mark"));
const cover = document.querySelector(".cover");
const pieceOptions = document.querySelector(".piece-options");
const gameType = document.querySelector(".game-type");
const singlePlayer = document.querySelector(".single");
const multiPlayer = document.querySelector(".multi");

const pieceO = document.querySelector(".buttonO");
const pieceX = document.querySelector(".buttonX");

let piece = "none";
let chosenGame = "none";

window.onload = function() {
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(1)");
    pieceOptions.style.setProperty("transform", "translateX(-50%) scale(1)");
    gameType.style.setProperty("transform", "translateX(-50%) scale(1)");
};

for (let i in slot) {
    slot[i].addEventListener("click", () => {
        mark[i].innerHTML = piece;
        mark[i].style.setProperty("transform", "scale(1)");
    });
}

function closeMenu() {
    cover.style.setProperty("transform", "translate(-20px, -20px) scale(0)");
    pieceOptions.style.setProperty("transform", "translateX(-50%) scale(0)");
    gameType.style.setProperty("transform", "translateX(-50%) scale(0)");
}

singlePlayer.addEventListener("click", () => {
    chosenGame = singlePlayer;
    multiPlayer.style.setProperty("background-color", "#455347");
    singlePlayer.style.setProperty("background-color", "#35f852");
    if (piece != "none") {
        closeMenu();
    }
});

multiPlayer.addEventListener("click", () => {
    chosenGame = multiPlayer;
    singlePlayer.style.setProperty("background-color", "#455347");
    multiPlayer.style.setProperty("background-color", "#35f852");
    if (piece != "none") {
        closeMenu();
    }
});

pieceO.addEventListener("click", () => {
    piece = "O";
    pieceX.style.setProperty("background-color", "#455347");
    pieceO.style.setProperty("background-color", "#35f852");
    if (chosenGame != "none") {
        closeMenu();
    }
});

pieceX.addEventListener("click", () => {
    piece = "X";
    pieceO.style.setProperty("background-color", "#455347");
    pieceX.style.setProperty("background-color", "#35f852");
    if (chosenGame != "none") {
        closeMenu();
    }
});
