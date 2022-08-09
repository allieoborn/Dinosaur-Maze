let inputBuffer = {};
let canvas = null;
let showBreadcrumbs = false;
let showHint = false;
let showPath = false;
let path = [];
let newPath = [];
let next = null;

let prevTime = performance.now();


function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    window.addEventListener('keyup', function(event) {
        inputBuffer[event.key] = event.key;
    });

    gameLoop(performance.now);
}


function gameLoop(timeStamp) {
    let elapsedTime = timeStamp - prevTime;

    processInput();
    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);

}


function processInput() {
    newSize = document.getElementById('size').value;

    let crumbs = document.getElementById('breadcrumbs').checked;
    if (crumbs) {
        showBreadcrumbs = true;
    } else {
        showBreadcrumbs = false;
    }

    let p = document.getElementById('path').checked;
    if (p) {
        showPath = true;
    } else {
        showPath = false;
    }

    let hint = document.getElementById('hint').checked;
    if (hint) {
        showHint = true;
    } else {
        showHint = false;
    }
    
    for (input in inputBuffer) {
        moveCharacter(inputBuffer[input], myCharacter);
        myPath = [];
        myHints = [];
    }
    inputBuffer = {};
}


function update(elapsedTime) {
    totalTime = Math.floor(elapsedTime / 1000);
    if (newSize != size) {
        size = newSize;
        maze = mazeGeneration(size);
        myCharacter = createImage('images/dino.png', maze[0][0]);
        myDoor = createImage('images/door.png', maze[size-1][size-1]);
        prevTime = performance.now();
        currentScore = 0;
        myBreadcrumbList = [];
        myPath = [];
        myHints = [];
    }
    bfs(myCharacter.location);
    newPath = getPath(myCharacter.location, maze[size-1][size-1]);
    if (newPath.length > path.length) {
        if (currentScore > 0) {
            currentScore -= 10;
        }
        path = newPath;
    }
    if (newPath.length < path.length) {
        currentScore += 5;
        path = newPath;
    }
    if (currentScore > highScore) {
        highScore = currentScore;
    }
}


function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (gameWon) {
        renderDialog();
    }
    renderTime();
    renderScores();
    renderMaze();
    if (showBreadcrumbs) {
        drawBreadcrumbs();
    }
    if (showPath) {
        drawPath(path);
    }
    if (showHint) {

        drawHint(path);
    }
    renderCharacter(myCharacter);
    renderCharacter(myDoor);
    
}


function newGame() {
    let closeDialog = document.getElementById('gameOver');
    gameWon = false;
    closeDialog.style.display = 'none';
    maze = mazeGeneration(size);
    myCharacter = createImage('images/dino.png', maze[0][0]);
    prevTime = performance.now();
    currentScore = 0;
    myBreadcrumbList = [];
    myPath = [];
    myHints = [];
}

