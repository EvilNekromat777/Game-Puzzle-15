
const boxElem = document.querySelector('.box');
const resetButtonElem = document.querySelector('.button_type_reset');
const startButtonElem = document.querySelector('.button_type_start');


// Инициализация ячеек
let cells = [];
for (let i = 1; i < 16; i += 1) {
    cells.push(i);
}
cells.push(0)

renderCells();


// Вешаем обработчики на кнопки
resetButtonElem.addEventListener('click', function () {
    resetCells();
})

startButtonElem.addEventListener('click', function () {
    activateCells();
    boxElem.addEventListener('click', cellClickHandler)
    // сюда потом сделать еще функцию включения таймера
})

function cellClickHandler(e) {
    const cellElem = e.target.closest('.cell');
    if (!cellElem || cellElem.id === '0') {
        return
    }
    console.log(cellElem.id);
}

// Функция активации игрового поля
function activateCells() {
    const cellElems = document.querySelectorAll('.cell')
    cellElems.forEach((el) => el.classList.add('cell_active'))
}


// Функция перемешивает ячейки
function resetCells() {
    cells = _.shuffle(cells);
    const cellElems = document.querySelectorAll('.cell')
    cells.forEach((n, i) => updateCell(cellElems[i], n));
    // то же самое: cells.forEach (function (n, i) {
    // return updateCell(cellElems[i], n)}
}



// Функция рендерит ячейки
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

