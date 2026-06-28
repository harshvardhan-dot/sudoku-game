const sudoku = document.getElementById('sudoku');
const cells = [];

function createGrid() {
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.setAttribute('maxlength', '1');
        cell.setAttribute('inputmode', 'numeric');
        cell.setAttribute('pattern', '[1-9]');
        cell.type = 'text';
        cell.addEventListener('input', () => {
            cell.value = cell.value.replace(/[^1-9]/g, '');
        });
        sudoku.appendChild(cell);
        cells.push(cell);
    }
}

createGrid();

const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function getGrid() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
        grid[row] = [];
        for (let col = 0; col < 9; col++) {
            grid[row][col] = cells[row * 9 + col].value.trim();
        }
    }
    return grid;
}

function hasDuplicates(arr) {
    const values = arr.filter(val => val !== '');
    return new Set(values).size !== values.length;
}

function validateSudoku() {
    const grid = getGrid();

    for (let row = 0; row < 9; row++) {
        if (grid[row].some(val => val === '')) {
            return 'Please fill all cells with numbers 1-9 before checking.';
        }
        if (hasDuplicates(grid[row])) {
            return `Error in row ${row + 1}`;
        }
    }

    for (let col = 0; col < 9; col++) {
        const column = [];
        for (let row = 0; row < 9; row++) {
            column.push(grid[row][col]);
        }
        if (hasDuplicates(column)) {
            return `Error in column ${col + 1}`;
        }
    }

    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const box = [];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    box.push(grid[boxRow * 3 + row][boxCol * 3 + col]);
                }
            }
            if (hasDuplicates(box)) {
                return `Error in 3x3 box starting at row ${boxRow * 3 + 1}, col ${boxCol * 3 + 1}`;
            }
        }
    }

    return 'Sudoku is valid!';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function fillRandomCells() {
    cells.forEach(cell => {
        cell.value = '';
        cell.disabled = false;
        cell.style.backgroundColor = '#fff';
    });

    const indices = Array.from({ length: 81 }, (_, index) => index);
    shuffle(indices);
    const clueIndices = indices.slice(0, 20);

    clueIndices.forEach(index => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        cells[index].value = solution[row][col];
        cells[index].disabled = true;
        cells[index].style.backgroundColor = '#f0f0f0';
    });
}

fillRandomCells();

document.getElementById('check').addEventListener('click', () => {
    alert(validateSudoku());
});

document.getElementById('reset').addEventListener('click', () => {
    fillRandomCells();
});
