const COORD_SIZE = 1000;
let context = null;
let size = 5;
let newSize = 5;

let totalTime = 0
let gameWon = false;

let highScore = 0;
let currentScore = 0;

let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'images/topography.png';

function drawCell(cell) {
    if (imgFloor.isReady) {
        context.drawImage(imgFloor,
        cell.x * (COORD_SIZE / size), cell.y * (COORD_SIZE / size),
        COORD_SIZE / size + 0.5, COORD_SIZE / size + 0.5);
    }
    
    if (cell.edges.n === null) {
        context.moveTo(cell.x * (COORD_SIZE / size), cell.y * (COORD_SIZE / size));
        context.lineTo((cell.x + 1) * (COORD_SIZE / size), cell.y * (COORD_SIZE / size));
    }

    if (cell.edges.s === null) {
        context.moveTo(cell.x * (COORD_SIZE / size), (cell.y + 1) * (COORD_SIZE / size));
        context.lineTo((cell.x + 1) * (COORD_SIZE / size), (cell.y + 1) * (COORD_SIZE / size));
    }

    if (cell.edges.e === null) {
        context.moveTo((cell.x + 1) * (COORD_SIZE / size), cell.y * (COORD_SIZE / size));
        context.lineTo((cell.x + 1) * (COORD_SIZE / size), (cell.y + 1) * (COORD_SIZE / size));
    }

    if (cell.edges.w === null) {
        context.moveTo(cell.x * (COORD_SIZE / size), cell.y * (COORD_SIZE / size));
        context.lineTo(cell.x * (COORD_SIZE / size), (cell.y + 1) * (COORD_SIZE / size));
    }
}


function renderMaze() {
    // Render the cells first
    context.beginPath();
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            drawCell(maze[row][col]);
        }
    }
    context.strokeStyle = 'rgb(135, 135, 135)';
    context.lineWidth = 6;
    context.stroke();

    // Draw a black border around the whole maze
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(COORD_SIZE - 1, 0);
    context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
    context.lineTo(0, COORD_SIZE - 1);
    context.closePath();
    context.strokeStyle = 'rgb(135, 135, 135)';
    context.stroke();
}

function renderTime() {
    let displayTime = document.getElementById('elapsedTime');
    let message = `${ Math.floor(totalTime / 60) }:${ totalTime % 60 }`;
    displayTime.innerHTML = `<b>Time `;
    displayTime.innerHTML += message;
}

function renderScores() {
    let score = document.getElementById('currentScore');
    score.innerHTML = `<b>Current Score: `;
    score.innerHTML += currentScore;

    let high = document.getElementById('highScore');
    high.innerHTML = `<b>High Score: `;
    high.innerHTML += highScore;
}

function renderDialog(){
    let dialog = document.getElementById('gameOver');
    dialog.style.display = 'block';
    let score = document.getElementById('gameScore');
    score.innerHTML = `<b>Your Score: `;
    score.innerHTML += currentScore;
}

function drawBreadcrumbs() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (maze[row][col].breadcrumbs) {
                myBreadcrumbList.push(createImage('images/egg.png', maze[row][col]));
            }
        }
    }
    for (let index = 0; index < myBreadcrumbList.length; index++) {
        renderCharacter(myBreadcrumbList[index]);
    }
}

function drawPath(path) {
    for (let i = 0; i < path.length; i++) {
        myPath.push(createImage('images/blueFlower.png', path[i]));
    }
    for (let j = 0; j < myPath.length; j++) {
       renderCharacter(myPath[j]);
    }
}

function drawHint(path) {
    if (path.length > 0) {
        let l = path.length - 1;
        let n = path[l];
        myHints.push(createImage('images/orangeFlower.png', n));
        renderCharacter(myHints[0]);
    }
}

function renderCharacter(character) {
    if (character.image.isReady) {
        context.drawImage(character.image,
        character.location.x * (COORD_SIZE / size)+5, character.location.y * (COORD_SIZE / size)+5, (800 / size), (800 / size));
    }
}

function createImage(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;

    return {
        location: location,
        image: image
    };
}

let myCharacter = createImage('images/dino.png', maze[0][0]);
let myDoor = createImage('images/door.png', maze[size-1][size-1]);
let myHint = createImage('images/orangeFlower.png', maze[0][1]);

let myBreadcrumbList = [];
let myPath = [];

let myHints = [];
