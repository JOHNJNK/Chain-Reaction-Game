class ChainReaction {
    constructor() {
        this.playactive = true;
        this.chance = 1;
        this.currentPlayer = 1;
        this.resetbtn = document.createElement("button");
        this.resetbtn.textContent = "Reset";
        this.resetbtn.addEventListener('click', () => {
            this.reset();
        });
    }

    reset() {

        const grid = document.getElementById("tableGrid");
        createBlock.style.display = "block";
        const resultBox = document.getElementById("resultBox");
        resultBox.remove();
        grid.remove();
        console.log("Game Over");
    }

    change(game) {
        if (game.currentPlayer == 1) {
            return "red";
        }
        else {
            return "blue";
        }
    }

    checkForResult(table, game) {
        let playerOne = 0;
        let playerTwo = 0;
        for (let row of table.rows) {
            for (let col of row.cells) {
                let color = col.style.backgroundColor;
                if (color == "red") {
                    playerOne++;
                }
                else if (color == "blue") {
                    playerTwo++;
                }
            }
        }
        if ((playerOne == 0 || playerTwo == 0) && game.chance == 0) {

            game.playactive = false;

            const currentPlayerStatus = document.getElementById("playerStatus");
            currentPlayerStatus.remove();

            const result = document.getElementById("result");
            const resultContainer = document.createElement("resultBox");
            resultContainer.id = "resultBox";
            result.appendChild(resultContainer);
            const resultMsg = document.createElement('h2');
            if (playerOne == 0) {
                resultMsg.textContent = "Player Two Wins";
            }
            else {
                resultMsg.textContent = "Player One Wins";
            }
            resultContainer.appendChild(resultMsg);
            resultContainer.appendChild(this.resetbtn);

        }
        if (playerOne == 0 || playerTwo == 0) {
            game.chance--;
        }

        console.log(playerOne + "  " + playerTwo + " " + game.chance);
    }

    actionwork(col, game) {
        const rows = document.getElementById("tableGrid");
        if (game.currentPlayer == 1) {
            col.style.backgroundColor = "red";
        }
        else {
            col.style.backgroundColor = "blue";
        }


        if (col.textContent == "*") {
            col.textContent = 1;
        }

        else {

            const cols = document.getElementById("row" + parseInt(col.id));

            let colMaxLength = cols.childElementCount - 1;
            let rowMaxLength = rows.childElementCount - 1;

            let num = parseInt(col.textContent) + 1;
            let maxNum = 4;

            if ((cols.rowIndex === 0 && col.cellIndex === 0) ||
                (cols.rowIndex === 0 && col.cellIndex === colMaxLength) ||
                (cols.rowIndex === rowMaxLength && col.cellIndex === 0) ||
                (cols.rowIndex === rowMaxLength && col.cellIndex === colMaxLength)) {
                maxNum = 2;
            }
            else if (cols.rowIndex === 0 || col.cellIndex === 0 ||
                cols.rowIndex === rowMaxLength || col.cellIndex === colMaxLength) {
                maxNum = 3;
            }
            if (num == maxNum) {
                col.textContent = "*";
                col.style.backgroundColor = "white";

                let previousRow = cols.previousSibling;
                let nextRow = cols.nextSibling;
                if (previousRow) {
                    let previousRowCell = previousRow.children[col.cellIndex];
                    if (previousRowCell) {
                        previousRowCell.style.backgroundColor = game.change(game);
                        game.actionwork(previousRowCell, game);
                    }
                }
                if (nextRow) {
                    let nextRowCell = nextRow.children[col.cellIndex];
                    if (nextRowCell) {
                        nextRowCell.style.backgroundColor = game.change(game);
                        game.actionwork(nextRowCell, game);
                    }
                }
                let previousCell = col.previousSibling;
                let nextCell = col.nextSibling;
                if (previousCell) {
                    previousCell.style.backgroundColor = game.change(game);
                    game.actionwork(previousCell, game);
                }
                if (nextCell) {
                    nextCell.style.backgroundColor = game.change(game);
                    game.actionwork(nextCell, game);
                }
            }
            else {
                col.textContent = num;
            }
        }
    }


    grid = (game) => {

        let table = document.createElement("table");
        table.id = "tableGrid";
        table.style.border = "1px solid black";
        table.style.width = "50%";
        table.style.margin = "auto";

        // let dataTable;
        for (let i = 0; i < 10; i++) {

            let row = document.createElement("tr");
            row.id = "row" + (i + 1);

            for (let j = 0; j < 10; j++) {

                let col = document.createElement("td");
                col.className = "cell";
                col.id = (i + 1) + "col" + "" + (j + 1);
                col.style.border = "1px solid black";
                col.style.margin = "auto";
                col.textContent = "*";
                col.style.backgroundColor = "white";

                col.addEventListener("click", function () {
                    let color = col.style.backgroundColor;
                    let check = false;

                    if (game.playactive == true && (color === "white" || (game.currentPlayer == 1 && color == "red") || (game.currentPlayer == 2 && color == "blue"))) {
                        check = true;
                    }

                    if (check) {
                        console.log(this);
                        game.actionwork(col, game);
                        if (game.currentPlayer == 1) {
                            game.currentPlayer = 2;
                            document.getElementById("player").textContent = "Player Two(Blue)";
                        }
                        else {
                            game.currentPlayer = 1;
                            document.getElementById("player").textContent = "Player One(Red)";
                        }
                        game.checkForResult(table, game);
                    }
                });
                row.appendChild(col);
            }
            table.appendChild(row);

        }

        {/* <p id="playerStatus">Current Move By : <span id="player"> Player One(Red)</span></p> */ }

        const gridblock = document.createElement('div');
        gridblock.appendChild(table);

        const playerStatus = document.createElement('p');
        playerStatus.textContent = "Current Move By : ";
        playerStatus.id = "playerStatus";

        const span = document.createElement("span");
        span.id = "player";
        span.textContent = " PlayOne(Red)";

        playerStatus.appendChild(span);

        gridblock.appendChild(table);
        gridblock.appendChild(playerStatus);

        return gridblock;
    }
}

const createButton = document.getElementById("createButton");
const createBlock = document.getElementById("gridCreator");


if (createButton != null) {
    createButton.addEventListener('click', () => {
        const game = new ChainReaction();
        const grid = game.grid(game);

        const table = document.getElementById("grid");
        table.appendChild(grid);
        createBlock.style.display = "none";
        // createBlock.remove();
    });
}
