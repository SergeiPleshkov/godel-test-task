'use strict';

let gameState = [null, 1, 2, 3, 4, 5, 6, 7, 8];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let randomizedNums = shuffle(gameState).slice();
console.log(randomizedNums);

function renderRandomTable(state) {
    let table = '<table>';
    let newState = [];
    for (var i = 0; i < 3; i++) {
        table += '<tr>';
        for (var j = 0; j < 3; j++) {
            let thisCell = state.shift(1);
            table += `<td class="cell-${newState.length}">${thisCell || ''}</td>`;
            newState.push(thisCell) - 1;
        }
        table += '</tr>';
    }

    table += '</table>';
    document.querySelector('.content').innerHTML += table;
    gameState = newState.slice()
}

renderRandomTable(randomizedNums);

function moveCell(cell) {
    let cellClass = cell.className;
    let cellNum =  cellClass.slice(-1);
    console.log(cellNum)
}

document.addEventListener('click', (ev) => {
    if (ev.target.tagName = 'TD') {
        moveCell(ev.target);
    }
})