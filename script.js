(function (tableSize, velocity) {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
    var positionOfSnake = [], cells, direction;

    function onDocumentReady() {
        cells = document.getElementsByClassName("cell");
        createTable();
        placeSnake();
        placeApple();
        startGame();
    }

    function startGame() {
        var dx, dy, intervalID;

        function onKeyDown(e) {
            switch (e.keyCode) {
                case 37: {
                    dx = -1;
                    dy = 0;
                    break;
                }
                case 38: {
                    dx = 0;
                    dy = -1;
                    break;
                }
                case 39: {
                    dx = 1;
                    dy = 0;
                    break;
                }
                case 40: {
                    dx = 0;
                    dy = 1;
                    break;
                }
            }

        }

        function moving() {
            var nextColumn, nextRow, position, temp = -1;
            if (dx === undefined || dy === undefined) {
                if (direction < 0.5) {
                    dx = -1;
                    dy = 0;
                } else {
                    dx = 0;
                    dy = -1;
                }
            }
            nextColumn = getColumn(positionOfSnake[0]) + dx;
            nextRow = getRow(positionOfSnake[0]) + dy;
            position = tableSize * nextColumn + nextRow;
            if (nextRow > -1 && nextRow < tableSize &&
                nextColumn > -1 && nextColumn < tableSize &&
                !cells.item(position).classList.contains("snake") &&
                !cells.item(position).classList.contains("head")) {
                cells.item(positionOfSnake[positionOfSnake.length - 1]).className = "cell";
                if (cells.item(position).classList.contains("apple")) {
                    temp = positionOfSnake[positionOfSnake.length - 1]
                }
                for (var i = positionOfSnake.length - 1; i > 0; i--) {
                    positionOfSnake[i] = positionOfSnake[i - 1];
                }
                positionOfSnake[0] = position;
                cells.item(positionOfSnake[0]).classList.add("head");
                for (var i = 1; i < positionOfSnake.length; i++) {
                    cells.item(positionOfSnake[i]).className = "cell snake";
                }
                if (temp != -1) {
                    positionOfSnake.push(temp);
                    cells.item(positionOfSnake[i]).className = "cell snake";
                    placeApple();
                }
            } else {
                alert("you lost");
                clearInterval(intervalID);
            }
        }

        if (intervalID === undefined) {
            intervalID = setInterval(moving, velocity);
        }
        document.addEventListener("keydown", onKeyDown);
    }

    function getRow(index) {
        return index % tableSize;
    }

    function getColumn(index) {
        return Math.floor(index / tableSize);
    }

    function createTable() {
        var column, div;
        for (var i = 0; i < tableSize; i++) {
            column = document.createElement("div");
            column.className = "column";
            for (var j = 0; j < tableSize; j++) {
                div = document.createElement("div");
                div.className = "cell";
                column.appendChild(div);
            }
            document.getElementById("app").appendChild(column);
        }
    }



    function placeApple() {
        var columnNumber, rowNumber;
        columnNumber = getRandomInteger(0, tableSize);
        rowNumber = getRandomInteger(0, tableSize);
        while (cells.item(tableSize * columnNumber + rowNumber).classList.contains("snake")) {
            columnNumber = getRandomInteger(0, tableSize);
            rowNumber = getRandomInteger(0, tableSize);
        }
        cells.item(tableSize * columnNumber + rowNumber).classList.add("apple");
    }

    function placeSnake() {
        var columnNumber, rowNumber;
        columnNumber = getRandomInteger(1, tableSize - 1);
        rowNumber = getRandomInteger(1, tableSize - 1);
        cells.item(tableSize * columnNumber + rowNumber).classList.add("snake");
        direction = Math.random();
        if (direction < 0.5) {
            cells.item(tableSize * (columnNumber + 1) + rowNumber).classList.add("snake");
            cells.item(tableSize * (columnNumber - 1) + rowNumber).classList.add("head");
            positionOfSnake.push(tableSize * (columnNumber - 1) + rowNumber);
            positionOfSnake.push(tableSize * columnNumber + rowNumber);
            positionOfSnake.push(tableSize * (columnNumber + 1) + rowNumber);

        } else {
            cells.item(tableSize * columnNumber + rowNumber + 1).classList.add("snake");
            cells.item(tableSize * columnNumber + rowNumber - 1).classList.add("head");
            positionOfHead = tableSize * columnNumber + rowNumber - 1;
            positionOfSnake.push(tableSize * columnNumber + rowNumber - 1);
            positionOfSnake.push(tableSize * columnNumber + rowNumber);
            positionOfSnake.push(tableSize * columnNumber + rowNumber + 1);
        }
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}(20, 500));