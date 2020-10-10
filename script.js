
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
    stopGame();
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
    runGemeCycle(cellElem);
}


function runGemeCycle(targetCell) {
    // 1. Проверка, может ли ячейка двигаться
    const num = parseInt(targetCell.id, 10) // String --> Number, '1' --> 1
    console.log(canCellMove(num))

    if (!canCellMove(num)) {         // предикат? true / false
        return
    }

    // 2. Поменять местами
    const numIdx = cells.indexOf(num);
    const zeroInx = cells.indexOf(0);
    cells[zeroInx] = num;
    cells[numIdx] = 0;

    const zeroCell = document.querySelector('[id="0"]');
    updateCell(targetCell, 0);
    updateCell(zeroCell, num);

    // 3. Закончена ли игра?
    if (isGameOver()) {
        stopGame();
        alert('You Win!!!')
    }
}

function isGameOver() {
    return cells.slice(0, 15).every((v, i) => v === i + 1);
}


function stopGame() {
    const cellElems = document.querySelectorAll('.cell');
    cellElems.forEach((el) => el.classList.remove('cell_active'));
    boxElem.removeEventListener('click', cellClickHandler);
}

// Функция, которая должна проверить: ячейка может двигаться или нет
function canCellMove(n) {
    const idx = cells.indexOf(n);
    // проверить ячейку:
    // top
    if (cells[idx - 4] === 0) {
        return true
    }
    // bottom
    if (cells[idx + 4] === 0) {
        return true
    }
    // left
    if (cells[idx - 1] === 0 && (idx % 4 !== 0)) {
        return true
    }
    // right
    if (cells[idx + 1] === 0 && (idx + 1) % 4 !== 0) {
        return true
    }
    return false
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

