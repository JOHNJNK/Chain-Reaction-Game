


let chance = 1;

reset = () => {

    document.getElementById("grid").innerHTML = "";
    currentPlayer = 1;
    grid();
}

change = (currentPlayer) => {
    if (currentPlayer == 1) {
        return "red";
    }
    else {
        return "blue";
    }
}


check = (currentPlayer, col) => {
    let color = col.style.backgroundColor;
    if (color === "white") {
        return true;
    }
    else if (currentPlayer == 1 && color == "red") {
        return true;
    }
    else if (currentPlayer == 2 && color == "blue") {
        return true;
    }
    return false;
}

checkForResult = (table) => {
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
    if (playerOne == 0 && chance == 0) {
        alert("Player Two Wins");
        chance++;
        reset();
    }
    if (playerTwo == 0 && chance == 0) {
        alert("Player One Wins");
        chance++;
        reset();
    }
    if (playerOne == 0 || playerTwo == 0) {
        chance--;
    }

    console.log(playerOne + "  " + playerTwo + " " + chance);
}

actionwork = (col, currentPlayer) => {
    // console.log(currentPlayer);
    if (currentPlayer == 1) {
        col.style.backgroundColor = "red";
    }
    if (currentPlayer == 2) {
        col.style.backgroundColor = "blue";
    }
    if (col.innerHTML == "*") {
        col.innerHTML = 1;
    }
    else {
        let colMaxLength = col.parentNode.cells.length - 1;
        let rowMaxLength = col.parentNode.parentNode.rows.length - 1;
        let num = parseInt(col.innerHTML) + 1;
        let maxNum = 4;
        if ((col.parentNode.rowIndex === 0 && col.cellIndex === 0) ||
            (col.parentNode.rowIndex === 0 && col.cellIndex === colMaxLength) ||
            (col.parentNode.rowIndex === rowMaxLength && col.cellIndex === 0) ||
            (col.parentNode.rowIndex === rowMaxLength && col.cellIndex === colMaxLength)) {
            maxNum = 2;
        }
        else if (col.parentNode.rowIndex === 0 || col.cellIndex === 0 ||
            col.parentNode.rowIndex === rowMaxLength || col.cellIndex === colMaxLength) {
            maxNum = 3;
        }
        if (num == maxNum) {
            col.innerHTML = "*";
            col.style.backgroundColor = "white";
            let previousRow = col.parentNode.previousSibling;
            let nextRow = col.parentNode.nextSibling;
            if (previousRow) {
                let previousRowCell = previousRow.children[col.cellIndex];
                if (previousRowCell) {
                    previousRowCell.style.backgroundColor = change(currentPlayer);
                    actionwork(previousRowCell, currentPlayer);
                }
            }
            if (nextRow) {
                let nextRowCell = nextRow.children[col.cellIndex];
                if (nextRowCell) {
                    nextRowCell.style.backgroundColor = change(currentPlayer);
                    actionwork(nextRowCell, currentPlayer);
                }
            }
            let previousCell = col.previousSibling;
            let nextCell = col.nextSibling;
            if (previousCell) {
                previousCell.style.backgroundColor = change(currentPlayer);
                actionwork(previousCell, currentPlayer);
            }
            if (nextCell) {
                nextCell.style.backgroundColor = change(currentPlayer);
                actionwork(nextCell, currentPlayer);
            }
        }
        else {
            col.innerHTML = num;
        }
    }
}

grid = () => {

    let table = document.getElementById("grid");

    // let rowSize = document.getElementById("rowSize").value;
    // let colSize = document.getElementById("colSize").value;
    let currentPlayer = 1;
    table.style.border = "1px solid black";
    table.style.width = "50%";
    table.style.margin = "auto";

    for (let i = 0; i < 10; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            let col = document.createElement("td");
            col.style.border = "1px solid black";
            col.style.margin = "auto";
            col.innerHTML = "*";
            col.style.backgroundColor = "white";

            col.addEventListener("click", function () {
                let color = col.style.backgroundColor;
                let check= false;
                if (color === "white" || (currentPlayer == 1 && color == "red") || (currentPlayer == 2 && color == "blue") ){
                    check=true;
                }
                if (check) {
                    actionwork(col, currentPlayer);
                    if (currentPlayer == 1) {
                        currentPlayer = 2;
                        document.getElementById("player").innerHTML = "Player Two(Blue)";
                    }
                    else {
                        currentPlayer = 1;
                        document.getElementById("player").innerHTML = "Player One(Red)";
                    }
                    checkForResult(table);
                }
            });
            row.appendChild(col);
        }
        table.appendChild(row);

    }
}








