export function getNeighbours(rows: number, cols: number, cell: number) {
  const addUpCells = [];

  if (cell % cols !== 0) {
    addUpCells.push(cell - 1);
  }
  if (cell % cols !== cols - 1) {
    addUpCells.push(cell + 1);
  }

  if (cell >= cols) {
    addUpCells.push(cell - cols);
    if (cell % cols !== 0) {
      addUpCells.push(cell - cols - 1);
    }
    if (cell % cols !== cols - 1) {
      addUpCells.push(cell - cols + 1);
    }
  }
  if (cell < rows * cols - cols) {
    addUpCells.push(cell + cols);
    if (cell % cols !== 0) {
      addUpCells.push(cell + cols - 1);
    }
    if (cell % cols !== cols - 1) {
      addUpCells.push(cell + cols + 1);
    }
  }

  return addUpCells;
}
