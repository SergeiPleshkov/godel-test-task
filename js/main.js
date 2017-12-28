'use strict';

let gameState = [null, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => 0.5 - Math.random());

function renderRandomTable(state) {
    let table = '<table>';
    let newState = [];
    for (var i = 0; i < 3; i++) {
        table += '<tr>';
        for (var j = 0; j < 3; j++) {
            let thisCell = state.shift(1);
            table += `<td class="${newState.length} ${!thisCell?'empty':'filled'}">${thisCell || ''}</td>`;
            newState.push(thisCell) - 1;
        }
        table += '</tr>';
    }

    table += '</table>';
    document.querySelector('.content').innerHTML += table;
    gameState = newState.slice()
}

renderRandomTable(gameState);

function moveCell(cell) {
    let emptyCell = document.querySelector('.empty');
    let cellClass = cell.className;
    let cellNum = cellClass.slice(0, 1);
    
    let emptyCellClass = emptyCell.className;
    let emptyCellNum = emptyCellClass.slice(0, 1);
    if (emptyCellNum == cellNum - 1 || emptyCellNum == cellNum + 1 || emptyCellNum == cellNum - 3 || emptyCellNum == cellNum + 3) {
        emptyCell.innerHTML = cell.innerHTML;
        emptyCell.classList.toggle('empty');
        emptyCell.classList.toggle('filled');
        cell.classList.toggle('filled');
        cell.classList.toggle('empty', true);
        cell.innerHTML = '';
    }
}

document.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'TD') {
        moveCell(ev.target);
    }
})