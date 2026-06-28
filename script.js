
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
            for (let r = 0; r < 9; r++) {
                grid[r] = [];
                for (let c = 0; c < 9; c++) {
                    let val = cells[r * 9 + c].value;
                    grid[r][c] = val ? parseInt(val) : 0;
                }
            }
            return grid;
        }

        
        function hasDuplicates(arr) {
            let nums = arr.filter(n => n !== 0);
            return new Set(nums).size !== nums.length;
        }

        
        function checkSudoku() {
            let grid = getGrid();

            
            for (let r = 0; r < 9; r++) {
                if (hasDuplicates(grid[r])) {
                    alert("Error in row " + (r + 1));
                    return;
                }
            }

        
            for (let c = 0; c < 9; c++) {
                let col = [];
                for (let r = 0; r < 9; r++) col.push(grid[r][c]);
                if (hasDuplicates(col)) {
                    alert(" Error in column " + (c + 1));
                    return;
                }
            }

            
            for (let boxRow = 0; boxRow < 3; boxRow++) {
                for (let boxCol = 0; boxCol < 3; boxCol++) {
                    let box = [];
                    for (let r = 0; r < 3; r++) {
                        for (let c = 0; c < 3; c++) {
                            box.push(grid[boxRow * 3 + r][boxCol * 3 + c]);
                        }
                    }
                    if (hasDuplicates(box)) {
                        alert("❌ Error in 3x3 box at (" + (boxRow + 1) + "," + (boxCol + 1) + ")");
                        return;
                    }
                }
            }

            alert("✅ Sudoku looks valid so far!");
        }

        
        function resetSudoku() {
            cells.forEach(cell => {
                cell.value = "";
                cell.removeAttribute("readonly"); 
            });
        }

        
        document.getElementById('check').addEventListener('click', checkSudoku);
        document.getElementById('reset').addEventListener('click', resetSudoku);