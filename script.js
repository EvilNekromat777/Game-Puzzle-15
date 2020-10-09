
const boxElem = document.querySelector('.box');
const resetButtonElem = document.querySelector('.button_type_reset');
const startButtonElem = document.querySelector('.button_type_start');
console.log(startButtonElem);


let cells = [];
for (let i = 1; i < 16; i += 1) {
    cells.push(i);
}
cells.push(0)

renderCells();

/**
 * Рендерит ячейки
 */
function renderCells() {
    const cellTemplate = document.querySelector('[data-component="cell"]');

    cells.forEach((n) => {
        const cellFragment = cellTemplate.content.cloneNode(true);
        const cellElem = cellFragment.querySelector('.cell');
        updateCell(cellElem, n);
        boxElem.appendChild(cellElem);
    })
}

function updateCell(cellElem, number) {
    const cellNumElem = cellElem.querySelector('.cell__num');
    cellNumElem.textContent = number
    cellElem.id = number
}