'use strict';

let gameState,
    solvedState,
    start,
    moveCell300 = throttle(moveCell, 200);


renderStartScreen();

document.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'TD') {
        moveCell300(ev.target, 200);
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
    if (ev.target.className === 'startGameBtn') {
        createInitialState(document.querySelector('.rows').value, document.querySelector('.cols').value, true);
        renderTable(gameState);
        start = Date.now();
    }
    if (ev.target.className === 'startByRulesBtn') {
        createInitialState(document.querySelector('.rows').value, document.querySelector('.cols').value, false);
        renderTable(gameState);
        randomizeByRules(+prompt('Сколько ходов перемешивать?', '20'));
        start = Date.now();
    }
})

function createInitialState(rows, cols, randomized) {

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

    if (randomized) {
        arr.sort(() => Math.random() - 0.5);
    }

    gameState = new Array(rows);

    for (let i = 0; i < rows; i++) {
        gameState[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            gameState[i][j] = arr[i * cols + j]
        }
    }
}

function renderTable(state) {
    document.querySelector('.content').innerHTML = '';
    let table = '<table>';
    let newState = gameState.slice();
    for (let i = 0; i < gameState.length; i++) {
        table += '<tr>';
        for (let j = 0; j < gameState[0].length; j++) {
            let thisCell = state[i][j];
            table += `<td id="id_${i + '' + j}" class="${!thisCell ? 'empty' : 'filled'}">${thisCell || ''}</td>`;
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
    <form class="start-screen">
        <label for="rows">Высота</label><input type="number" min="3" max="10" class="rows" id="rows" value="3">
        <label for="cols">Ширина</label><input type="number" min="3" max="10" class="cols" id="cols" value="3">
        <button class="startGameBtn">Размешать через массив</button>
        <button class="startByRulesBtn">Размешать по правилам игры</button>
    </form>`
}

function moveCell(cell, timeout) {
    let emptyCell = document.querySelector('.empty'),
        thisRow = cell.id.slice(-2, -1),
        thisCol = cell.id.slice(-1),
        emptyRow = emptyCell.id.slice(-2, -1),
        emptyCol = emptyCell.id.slice(-1);

    if (((Math.abs(thisCol - emptyCol) === 1) && (thisRow === emptyRow)) || ((Math.abs(thisRow - emptyRow) === 1) && (thisCol === emptyCol))) {
        cell.classList.toggle('fade-out');
        emptyCell.innerHTML = cell.innerHTML;
        emptyCell.classList.toggle('fade-in');
        gameState[emptyRow][emptyCol] = gameState[thisRow][thisCol];
        gameState[thisRow][thisCol] = null;
        emptyCell.classList.toggle('empty');
        if (timeout) {
            setTimeout(() => renderTable(gameState), timeout)
        } else {
            renderTable(gameState);
        }
    }
}

//throttle написал сам, т.к. в нужна только изолированная функция, в подключении либы нет надобности
function throttle(fun, delay) {

    var isPaused = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isPaused) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        fun.apply(this, arguments);

        isPaused = true;

        setTimeout(function () {
            isPaused = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, delay);
    }

    return wrapper;
}

function randomizeByRules(iterations) {
    for (let i = 0; i < iterations; i++) {
        let emptyCell = document.querySelector('.empty'),
            emptyRow = +emptyCell.id.slice(-2, -1),
            emptyCol = +emptyCell.id.slice(-1),
            top = document.getElementById(`id_${emptyRow - 1}${emptyCol}`),
            right = document.getElementById(`id_${emptyRow}${emptyCol + 1}`),
            bottom = document.getElementById(`id_${emptyRow + 1}${emptyCol}`),
            left = document.getElementById(`id_${emptyRow}${emptyCol - 1}`),
            possibleMoves = [],
            directionIds = [top, right, bottom, left];

        for (let j = 0; j < 4; j++) {
            if (directionIds[j]) {
                possibleMoves.push(directionIds[j]);
            }
        }

        let randomDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        moveCell(randomDirection);
    }
}