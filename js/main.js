'use strict';

let gameState,
    solvedState,
    start;
renderStartScreen();

function createInitialState(rows, cols) {

    let arr = [null];

    for (let i = 1; i < cols * rows; i++) {
        arr.push(i);
    }

    solvedState = new Array(rows);

    for (let i = 0; i < rows; i++) {
        solvedState[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            solvedState[i][j] = arr[i * cols + j];
        }
    }

    let randomized = arr.sort(() => Math.random() - 0.5);

    gameState = new Array(rows);
    console.log(gameState)

    for (let i = 0; i < rows; i++) {
        gameState[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            gameState[i][j] = randomized[i * cols + j]
        }
    }
    console.log(gameState, arr, randomized);
}

function renderTable(state) {
    document.querySelector('.content').innerHTML = '';
    let table = '<table>';
    let newState = gameState.slice();
    for (let i = 0; i < gameState.length; i++) {
        table += '<tr>';
        for (let j = 0; j < gameState[0].length; j++) {
            let thisCell = state[i][j];
            table += `<td id="${i + '' + j}" class="${!thisCell ? 'empty' : 'filled'}">${thisCell || ''}</td>`;
            newState[i][j] = thisCell;
        }
        table += '</tr>';
    }

    table += '</table>';
    document.querySelector('.content').innerHTML += table;
    gameState = newState.slice()
}

function renderStartScreen() {
    document.querySelector('.content').innerHTML = `
    <div class="startScreen">
        <input type="number" min="3" max="10" class="rows" id="rows" value="3"><span>Высота</span>
        <input type="number" min="3" max="10" class="cols" id="cols" value="3"><span>Ширина</span>
        <button class="startGameBtn">Начать игру</button>
    </div>`
}

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
    }
}

document.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'TD') {
        moveCell(ev.target);
        if (JSON.stringify(gameState) === JSON.stringify(solvedState)) {
            let end = Date.now();
            let playedSec = Math.round((end - start) / 1000);
            let playedMin = Math.round(playedSec / 60);
            setTimeout(() => {
                if (confirm(`Ура! Вы решили головоломку за ${playedMin}:${playedSec % 60 < 10? '0'+ playedSec % 60 : playedSec % 60}!

                        Сыграете ещё раз?`)) {
                    renderStartScreen();
                };
            }, 0);
        }
    }
    if (ev.target.className == 'startGameBtn') {
        createInitialState(document.querySelector('.rows').value, document.querySelector('.cols').value);
        renderTable(gameState);
        start = Date.now();
    }
})