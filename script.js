const sudoku = document.getElementById('sudoku');
const cells = [];

const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function renderSudoku(grid) {
    sudoku.innerHTML = '';
    cells.length = 0;

    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const value = grid[row][col];
        const cell = document.createElement('input');

        cell.type = 'text';
        cell.maxLength = 1;
        cell.classList.add('cell');

        if (value !== 0) {
            cell.value = value;
            cell.readOnly = true;
            cell.classList.add('given');
        } else {
            cell.value = '';
            cell.readOnly = false;
            cell.classList.add('editable');
            cell.addEventListener('input', (event) => {
                const inputValue = event.target.value.replace(/[^1-9]/g, '');
                cell.value = inputValue;
            });
        }

        sudoku.appendChild(cell);
        cells.push(cell);
    }
}

function getGrid() {
    const grid = [];
    for (let r = 0; r < 9; r++) {
        grid[r] = [];
        for (let c = 0; c < 9; c++) {
            const val = cells[r * 9 + c].value;
            grid[r][c] = val ? parseInt(val) : 0;
        }
    }
    return grid;
}

function hasDuplicates(arr) {
    const nums = arr.filter(n => n !== 0);
    return new Set(nums).size !== nums.length;
}

function checkSudoku() {
    const grid = getGrid();

    for (let r = 0; r < 9; r++) {
        if (hasDuplicates(grid[r])) {
            alert(`❌ Error in row ${r + 1}`);
            return;
        }
    }

    for (let c = 0; c < 9; c++) {
        const col = [];
        for (let r = 0; r < 9; r++) col.push(grid[r][c]);
        if (hasDuplicates(col)) {
            alert(`❌ Error in column ${c + 1}`);
            return;
        }
    }

    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const box = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    box.push(grid[boxRow * 3 + r][boxCol * 3 + c]);
                }
            }
            if (hasDuplicates(box)) {
                alert(`❌ Error in 3x3 box (${boxRow + 1}, ${boxCol + 1})`);
                return;
            }
        }
    }

    alert('✅ Sudoku looks valid so far!');
}

function resetSudoku() {
    renderSudoku(initialGrid);
}

renderSudoku(initialGrid);

document.getElementById('check').addEventListener('click', checkSudoku);
document.getElementById('reset').addEventListener('click', resetSudoku);

