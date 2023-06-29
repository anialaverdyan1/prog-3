var side = 20;
socket = io();
var m = 40;
var n = 40;
multForGrass = 8
var grassColor = "#09DE17"
function setup() {
    frameRate(40);
    createCanvas(n * side, m * side);
    background('#e8e8e8');
    button1 = document.getElementById('summer');
    button2 = document.getElementById('spring');
    button3 = document.getElementById('autumn');
    button4 = document.getElementById('winter');
    restart = document.getElementById("restart");
    button2.addEventListener("click", onColorChange);
    button3.addEventListener("click", onColorChange);
    button4.addEventListener("click", onColorChange);
    button1.addEventListener("click", onColorChange);
    restart.addEventListener("click", restartGame);
}
function restartGame() {
    socket.emit("restartProject", true)
}
function onColorChange() {
    if (event.target.id == "summer") {
        grassColor = "#12D804"
        multForGrass = 6;
    } else if (event.target.id == "spring") {
        grassColor = "#118B08"
        multForGrass = 4;
    } else if (event.target.id == "autumn") {
        grassColor = "#809F1B"
        multForGrass = 10;
    } else if (event.target.id == "winter") {
        grassColor = "#DDF3DB"
        multForGrass = 12;
    }

    let data = {
        multForGrass : multForGrass
    }
    socket.on("matrix", drawMatrix);
    socket.emit("afterClick", data)
}
function drawMatrix(data) {
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grassColor);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawMatrix);
// socket.on("sendStatistics", stateGenerator)
