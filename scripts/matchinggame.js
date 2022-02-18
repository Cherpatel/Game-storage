const FIELDSIZE = 4 * 4;
const PERMUTARR = Array(FIELDSIZE).fill(0).map((item, i) => Math.floor(i / 2));
const IMAGESRC = [
    "airplane","anchore", "brilliant", "cube",
    "envelope", "leaf", "ruler", "pencil"
].map((elem) => "/resource/images/matchinggame/" + elem + ".png");

const GAMEFIELD = document.querySelector(".game-field");
const STARS = document.querySelector(".stars");
const TIMER = document.querySelector(".time");
const MOVES = document.querySelector(".moves");
const RESTART = document.querySelector(".restart");
const WIN = document.querySelector(".game-win");

// Переменные состояния
let game_start; // false
let cards_left; // FIELDSIZE
let prev_card; // null
let prev_card_node;
let card_id; // null

let time; // 0
let timer_interval;

let moves; //0

function updateStars(value) {
    let str;
    if (value == 3)
        str = "DDD";
    else if (value == 2)
        str = "DDB";
    else if (value == 1)
        str = "DBB";
    else
        str = "BBB";

    STARS.innerHTML = str;
}

function updateTimer(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    TIMER.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:` +
                      `${seconds < 10 ? "0" + seconds : seconds}`;
}

function updateMoves() {
    MOVES.innerHTML = moves++ + " moves";
}

function comparison(value, target) {
    if (game_start == false) {
        game_start = true;

        timer_interval = setInterval(() => {
            if (time == 30)
                updateStars(2);
            else if (time == 45)
                updateStars(1);
            else if (time == 60)
                updateStars(0);

            updateTimer(++time);
        }, 1000);
    }

    if (prev_card == null) {
        target.classList.add("rotateZ");

        prev_card = value;
        prev_card_node = target;

        return;
    }

    target.classList.add("rotateZ");

    if (value == prev_card) {
        setTimeout((prev) => {
            target.classList.add("increase-card");
            target.querySelector(".back").classList.add("complete-card");

            prev.classList.add("increase-card");
            prev.querySelector(".back").classList.add("complete-card");
        }, 400, prev_card_node);

        cards_left -= 2;
        prev_card = null;
    } else {
        setTimeout((prev) => {
            target.classList.remove("rotateZ");
            prev.classList.remove("rotateZ");
        }, 600, prev_card_node);

        prev_card = null;
    }

    updateMoves();

    if (cards_left == 0) {
        clearInterval(timer_interval);
        
        setTimeout(() => {
            GAMEFIELD.classList.add("win-blur");
            WIN.classList.add("win-window");
        }, 1200);
    }
}

function createCard(value, id) {
    let wraper = document.createElement("div");
        wraper.className = "card";

    let face = document.createElement("div");
        face.className = "face";

    let back = document.createElement("div");
        back.className = "back";

    let img = document.createElement("img");
        img.src = IMAGESRC[value];

    wraper.appendChild(face);
    wraper.appendChild(back);
    back.appendChild(img);

    wraper.addEventListener("click", (event) => {
        comparison(value, event.currentTarget);
    });

    return wraper;
}

function generateField(field) {
    let permut = PERMUTARR.slice(0);
    for (let i = 0; i < FIELDSIZE; i++) {
        let rand = Math.floor(i + Math.random() * (FIELDSIZE - i));
        [permut[i], permut[rand]] = [permut[rand], permut[i]];
    }

    for (let i = 0; i < FIELDSIZE; i++)
        field.append(createCard(permut[i], i));
}

RESTART.addEventListener("click", () => {
    startGame();
})

function startGame() {
    game_start = false;
    cards_left = FIELDSIZE;
    prev_card = null;
    card_id = null;

    updateStars(3);

    time = 0;
    updateTimer(time);

    moves = 0;
    updateMoves(moves);

    clearInterval(timer_interval);

    if (WIN.classList.contains("win-window")) {
        GAMEFIELD.classList.remove("win-blur");
        WIN.classList.remove("win-window");
    }

    GAMEFIELD.innerHTML = "";

    generateField(GAMEFIELD);
}

startGame(GAMEFIELD);