
function moveCharacter(key, character) {
    character.location.breadcrumbs = true;
    // arrows
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
    // WASD
    if (key === 's') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'w') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'd') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'a') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
    // IJKL

    if (key === 'k') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'i') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'l') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'j') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
    // game over
    if (character.location.x == size-1 && character.location.y == size-1) {
        gameWon = true;
    }

    // toggle hint
    if (key == 'h') {
        document.getElementById('hint').click();
    }

    // toggle path
    if (key == 'p') {
        document.getElementById('path').click();
    }

    // toggle breadcrumbs
    if (key == 'b') {
        document.getElementById('breadcrumbs').click();
    }

}
