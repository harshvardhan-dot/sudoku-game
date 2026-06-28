const sudoku = document.getElementById('sudoku');
const cells = [];

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function isValidPlacement(grid, row, col, value) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === value || grid[i][col] === value) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (grid[r][c] === value) {
                return false;
            }
        }
    }

    return true;
}

function solveGrid(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (const value of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
                    if (isValidPlacement(grid, row, col, value)) {
                        grid[row][col] = value;
                        if (solveGrid(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function createSolvedGrid() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let box = 0; box < 3; box++) {
        const values = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let index = 0;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                grid[box * 3 + r][box * 3 + c] = values[index++];
            }
        }
    }

    if (!solveGrid(grid)) {
        return createSolvedGrid();
    }

    return grid;
}

function createRandomPuzzle() {
    const solvedGrid = createSolvedGrid();
    const puzzle = solvedGrid.map((row) => [...row]);

    const positions = shuffleArray([...Array(81).keys()]);
    const cellsToRemove = 40 + Math.floor(Math.random() * 10);

    for (let i = 0; i < cellsToRemove; i++) {
        const index = positions[i];
        const row = Math.floor(index / 9);
        const col = index % 9;
        puzzle[row][col] = 0;
    }

    return puzzle;
}

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
    const nums = arr.filter((n) => n !== 0);
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
    renderSudoku(createRandomPuzzle());
}

renderSudoku(createRandomPuzzle());

document.getElementById('check').addEventListener('click', checkSudoku);
document.getElementById('reset').addEventListener('click', resetSudoku);

