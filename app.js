const gameBox = document.getElementById("game-box");

let isGameOver = false;
let grid = [];
let turn = 1;
let turnsTaken = 0;

for (let i = 0; i < 9; i++) {
    gameBox.children[i].classList.add("box-" + i);
}

function onClickSquare(e) {
    if (e.target.classList.contains("tic-box") && !e.target.classList.contains("clicked")) {
        if (turn === 1) {
            e.target.style.backgroundImage = "url('symbol-x.png')";
            turn = 2;
            e.target.classList.add("clicked");
            grid[getBoxNumber(e.target)] = 0;

            if (checkGrid()) {
                swal("Player 1 WINS!");
                isGameOver = true;
            }
        } else {
            e.target.style.backgroundImage = "url('symbol-o.png')";
            turn = 1;
            e.target.classList.add("clicked");
            grid[getBoxNumber(e.target)] = 1;

            if (checkGrid()) {
                swal("Player 2 WINS!");
                isGameOver = true;
            }
        }

        turnsTaken++;

        if (turnsTaken >= 9 && !isGameOver) {
            swal("It's a TIE!");
        }
    }
}

function getBoxNumber(box) {
    for (let c of box.classList) {
        if (c.search("box-") > -1) {
            return parseInt(c.substring(4));
        }
    }
}

function checkGrid() {
    switch (true) {
        case check(0, 1, 2): return true;
        case check(0, 3, 6): return true;
        case check(1, 4, 7): return true;
        case check(2, 5, 8): return true;
        case check(3, 4, 5): return true;
        case check(6, 7, 8): return true;
        case check(0, 4, 8): return true;
        case check(2, 4, 6): return true;
        default: return false;
    }
}

function check(...numbers) {
    return grid[numbers[0]] != undefined && grid[numbers[0]] === grid[numbers[1]] && grid[numbers[1]] === grid[numbers[2]];
}

gameBox.addEventListener("click", onClickSquare);

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("swal2-confirm")) {
        location.reload();
    }
});