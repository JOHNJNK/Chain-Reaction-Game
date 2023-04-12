class ChainReaction {

    constructor() {
        this.playActive = true;
        this.chance = 1;
        this.currentPlayer = 1;
        this.restBtn = document.createElement("button");
        this.restBtn.textContent = "Reset";
        this.restBtn.addEventListener('click', () => {
            this.reset();
        });
    }

    reset() {

        const grid = document.getElementById("tableGrid");
        createButton.style.display = "inline-block";
        const resultBox = document.getElementById("resultBox");
        resultBox.remove();
        grid.remove();
        console.log("Game Over");
    }

    change = () => {
        if (this.currentPlayer == 1) {
            return "red";
        }
        else {
            return "blue";
        }
    }

    checkForResult(table) {
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
        if ((playerOne == 0 || playerTwo == 0) && this.chance == 0) {

            this.playActive = false;

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
            resultContainer.appendChild(this.restBtn);

        }
        if (playerOne == 0 || playerTwo == 0) {
            this.chance--;
        }

        console.log(playerOne + "  " + playerTwo + " " + this.chance);
    }

    actionwork(col) {
        const rows = document.getElementById("tableGrid");
        if (this.currentPlayer == 1) {
            col.style.backgroundColor = "red";
        }
        else {
            col.style.backgroundColor = "blue";
        }

        if (col.textContent == "*") {
            col.textContent = 1;
        }

        else {

            const cols = document.getElementById("row"+parseInt(col.id));


            let rowMaxLength = rows.childElementCount - 1;
            let colMaxLength = cols.childElementCount - 1;

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
                        previousRowCell.style.backgroundColor = this.change();
                        this.actionwork(previousRowCell);
                    }
                }
                if (nextRow) {
                    let nextRowCell = nextRow.children[col.cellIndex];
                    if (nextRowCell) {
                        nextRowCell.style.backgroundColor = this.change();
                        this.actionwork(nextRowCell);
                    }
                }
                let previousCell = col.previousSibling;
                let nextCell = col.nextSibling;
                if (previousCell) {
                    previousCell.style.backgroundColor = this.change();
                    this.actionwork(previousCell);
                }
                if (nextCell) {
                    nextCell.style.backgroundColor = this.change();
                    this.actionwork(nextCell);
                }
            }
            else {
                col.textContent = num;
            }
        }
    }


    grid() {

        let table = document.createElement("table");
        table.id = "tableGrid";


        // let dataTable;
        for (let i = 0; i < 10; i++) {

            let row = document.createElement("tr");
            row.id = "row" + (i + 1);

            for (let j = 0; j < 10; j++) {

                let col = document.createElement("td");
                col.className = "cell";
                col.id = (i + 1) + "col" + "" + (j + 1);
                col.textContent = "*";

                col.addEventListener("click", () => {
                    let color = getComputedStyle(col, null).getPropertyValue("background-color");
                    console.log(color);
                    let check = false;
                    if (this.playActive == true && (color === "rgb(255, 255, 255)" || (this.currentPlayer == 1 && color == "rgb(255, 0, 0)") || (this.currentPlayer == 2 && color == "rgb(0, 0, 255)"))) {
                        check = true;
                    }
                    console.log(check);
                    if (check) {
                        this.actionwork(col);
                        if (this.currentPlayer == 1) {
                            this.currentPlayer = 2;
                            document.getElementById("player").textContent = "Player Two(Blue)";
                        }
                        else {
                            this.currentPlayer = 1;
                            document.getElementById("player").textContent = "Player One(Red)";
                        }
                        this.checkForResult(table);
                    }
                });
                row.appendChild(col);
            }
            table.appendChild(row);

        }

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


if (createButton != null) {
    createButton.addEventListener('click', () => {
        const game = new ChainReaction();
        const grid = game.grid();

        const table = document.getElementById("grid");
        table.appendChild(grid);
        createButton.style.display = "none";
        // createBlock.remove();
    });
}
