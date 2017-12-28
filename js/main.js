'use strict';

let randomized = [null, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => 0.5 - Math.random());
var gameState = new Array(3);

for (var i = 0; i < 3; i++) {
    gameState[i] = new Array(3);
    for (var j = 0; j < 3; j++) {
        gameState[i][j] = randomized[i * 3 + j]
    }
}

console.log(gameState[1-1][2])

function renderTable(state) {
    let table = '<table>';
    let newState = gameState.slice();
    for (var i = 0; i < 3; i++) {
        table += '<tr>';
        for (var j = 0; j < 3; j++) {
            let thisCell = state[i][j];
            table += `<td id="${(i||0)+''+(j||0)}" class="${!thisCell?'empty':'filled'}">${thisCell || ''}</td>`;
            newState[i][j] = thisCell;
        }
        table += '</tr>';
    }

    table += '</table>';
    document.querySelector('.content').innerHTML += table;
    gameState = newState.slice()
}

renderTable(gameState);

console.log(gameState)

function moveCell(cell) {
    let emptyCell = document.querySelector('.empty'),
        thisRow = cell.id.slice(0, 1),
        thisCol = cell.id.slice(-1),
        emptyRow = emptyCell.id.slice(0, 1),
        emptyCol = emptyCell.id.slice(-1);

    debugger;
    
    if (((Math.abs(thisCol - emptyCol) === 1) && (thisRow === emptyRow)) || ((Math.abs(thisRow - emptyRow) === 1) && (thisCol === emptyCol))) {
        let cache = gameState[thisRow][thisCol];
        gameState[emptyRow][emptyCol] = cache;
        gameState[thisRow][thisCol] = null;
        document.querySelector('.content').innerHTML = '';
        renderTable(gameState);
    }
}

document.addEventListener('click', (ev, gameState) => {
    if (ev.target.tagName == 'TD') {
        moveCell(ev.target, gameState);
    }
})