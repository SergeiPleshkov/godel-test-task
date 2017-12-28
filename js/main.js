'use strict';

let randomized = [null, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => 0.5 - Math.random());
let gameState = new Array(3);

for (let i = 0; i < 3; i++) {
    gameState[i] = new Array(3);
    for (let j = 0; j < 3; j++) {
        gameState[i][j] = randomized[i * 3 + j]
    }
}
gameState = [[null, 1, 2], [3, 4, 5], [6, 7, 8]]

function renderTable(state) {
    document.querySelector('.content').innerHTML = '';
    let table = '<table>';
    let newState = gameState.slice();
    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
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
if (confirm('Начать игру?')) {
    renderTable(gameState);
}
let start = Date.now();

function moveCell(cell) {
    let emptyCell = document.querySelector('.empty'),
        thisRow = cell.id.slice(0, 1),
        thisCol = cell.id.slice(-1),
        emptyRow = emptyCell.id.slice(0, 1),
        emptyCol = emptyCell.id.slice(-1);
    
    if (((Math.abs(thisCol - emptyCol) === 1) && (thisRow === emptyRow)) || ((Math.abs(thisRow - emptyRow) === 1) && (thisCol === emptyCol))) {
        gameState[emptyRow][emptyCol] = gameState[thisRow][thisCol];
        gameState[thisRow][thisCol] = null;
        renderTable(gameState);
}}

document.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'TD') {
        moveCell(ev.target);
    }
    
    if (JSON.stringify(gameState) === JSON.stringify([[null, 1, 2], [3, 4, 5], [6, 7, 8]])) {
        let end = Date.now();
        let playedSec = Math.round((end - start)/1000);
        let playedMin = Math.round(playedSec/60);
        setTimeout(() => confirm(`Ура! Вы решили головоломку за ${playedMin}:${playedSec % 60 < 10? '0'+ playedSec % 60 : playedSec % 60}`), 0)
    }
})