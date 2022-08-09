
let maze = [];
let mazeSize = 5;

function addCells() {
    for (let row = 0; row < mazeSize; row++) {
        maze.push([]);
        for (let col = 0; col < mazeSize; col++) {
            maze[row].push({
                x: col, y: row, visited: false, edges: {
                    n: null,
                    s: null,
                    w: null,
                    e: null
                }
            });
        }
    }
}

function mazeGeneration(size) {
    mazeSize = size;
    maze = [];
    // add all the cells to the maze
    addCells();
    let frontier = [];

    // choose a random space in the maze to start
    let randomRow = Math.floor(Math.random()*maze.length);
    let randomCol = Math.floor(Math.random()*maze[randomRow].length);
    let currentCell = maze[randomRow][randomCol];
    frontier.push(currentCell);
    while (frontier.length > 0) {
        currentCell.visited = true;

        // add neighbors to the frontier 
        frontier = addNeighbors(currentCell, frontier);

        // delete the currentCell from the frontier
        frontier.splice(frontier.indexOf(currentCell), 1);
        if (frontier.length == 0) {
            break;
        }

        // get a new cell randomly from the frontier
        let newCell = frontier[Math.floor(Math.random()*frontier.length)];

        // randomly choose a wall that connects to the maze
        newCell = removeWalls(newCell);

        // reset the current cell
        currentCell = newCell;
    }
    return maze;
}

function addNeighbors(currentCell, frontier) {
    let neighbor = null;
    if (currentCell.x != 0) {
        // add neighbor to the west if it is not in the maze
        neighbor = maze[currentCell.y][currentCell.x-1];
        if (!neighbor.visited && !frontier.includes(neighbor)) {
            frontier.push(neighbor);
        }
    }
    if (currentCell.x != mazeSize-1) {
        // add neighbor to the east if it is not in the maze
        neighbor = maze[currentCell.y][currentCell.x+1];
        if (!neighbor.visited && !frontier.includes(neighbor)) {
            frontier.push(neighbor);
        }
    }
    if (currentCell.y != 0) {
        // add neighbor to the north if it is not in the maze
        neighbor = maze[currentCell.y-1][currentCell.x];
        if (!neighbor.visited && !frontier.includes(neighbor)) {
            frontier.push(neighbor);
        }
    }
    if (currentCell.y != mazeSize-1) {
        // add neighbor to the south if it is not in the maze
        neighbor = maze[currentCell.y+1][currentCell.x];
        if (!neighbor.visited && !frontier.includes(neighbor)) {
            frontier.push(neighbor);
        }
    }
    return frontier;
}

function removeWalls(newCell) {
    let walls = [];
    let neighbor = null;

    if (newCell.x != 0) {
        neighbor = maze[newCell.y][newCell.x-1];
        if (neighbor.visited) {
            neighbor.direction = "w";
            walls.push(neighbor);
        }
    }
    if (newCell.x != mazeSize-1) {
        neighbor = maze[newCell.y][newCell.x+1];
        if (neighbor.visited) {
            neighbor.direction = "e";
            walls.push(neighbor);
        }
    }
    if (newCell.y != 0) {
        neighbor = maze[newCell.y-1][newCell.x];
        if (neighbor.visited) {
            neighbor.direction = "n";
            walls.push(neighbor);
        }
    }
    if (newCell.y != mazeSize-1) {
        neighbor = maze[newCell.y+1][newCell.x];
        if (neighbor.visited) {
            neighbor.direction = "s";
            walls.push(neighbor);
        }
    }
    if (walls.length != 0) {
        let connection = walls[Math.floor(Math.random()*walls.length)];
        if (connection.direction == "w") {
            newCell.edges.w = connection;
            connection.edges.e = newCell;
        } else if (connection.direction == "e") {
            newCell.edges.e = connection;
            connection.edges.w = newCell;
        } else if (connection.direction == "n") {
            newCell.edges.n = connection;
            connection.edges.s = newCell;
        } else if ( connection.direction == "s") {
            newCell.edges.s = connection;
            connection.edges.n = newCell;
        }
    }
    return newCell;
}

maze = mazeGeneration(mazeSize);

