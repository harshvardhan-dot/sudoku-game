const sudoku = document.getElementById('sudoku');
const cells = [];


for (let i = 0; i < 81; i++) {
    const cell = document.createElement('input');
    cell.setAttribute('maxlength', '1'); 
    sudoku.appendChild(cell);
    cells.push(cell);
}


function getGrid() {
    let grid = [];
    for (let row = 0; row < 9; row++) {
        grid[row] = [];
        for (let col = 0; col < 9; col++) {
            grid[row][col] = cells[row * 9 + col].value;
        }
    }
    return grid;
}


function hasDuplicates(arr) {
    const nums = arr.filter(val => val !== "");
    return new Set(nums).size !== nums.length;
}


function validateSudoku() {
    const grid = getGrid();

    for (let row = 0; row < 9; row++) {
        if (hasDuplicates(grid[row])) {
            return `Error in row ${row + 1}`;
        }
    }

    
    for (let col = 0; col < 9; col++) {
        let column = [];
        for (let row = 0; row < 9; row++) {
            column.push(grid[row][col]);
        }
        if (hasDuplicates(column)) {
            return `Error in column ${col + 1}`;
        }
    }


    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            let box = [];
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

    return "Sudoku is valid!";
}

function fillRandomCells() {
    cells.forEach(cell => {
        cell.value = "";
        cell.disabled = false;
        cell.style.backgroundColor = "#fff";
    });

    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * 81);
        const randomValue = Math.floor(Math.random() * 9) + 1;
        cells[randomIndex].value = randomValue;
        cells[randomIndex].disabled = true; 
        cells[randomIndex].style.backgroundColor = "#f0f0f0"; 
    }
}
fillRandomCells();

document.getElementById('check').addEventListener('click', () => {
    alert(validateSudoku());
});

document.getElementById('reset').addEventListener('click', () => {
    fillRandomCells(); 
});
