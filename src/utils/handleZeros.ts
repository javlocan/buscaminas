import { getNeighbours } from "./getNeighbours";

import { Board } from "../interfaces";
export const handleZeros = (board: Board, id: number) => {
  const queue: number[] = []; // Create a queue to store the cells to be updated
  // Las siguientes funciones se definen dentro porque no se van a reciclar
  // y así hay que pasarles menos props
  const enqueue = (id: number) => {
    if (!queue.includes(id)) {
      queue.push(id);
    }
  };

  const processQueue = () => {
    while (queue.length > 0) {
      const currentIndex = queue.shift()!; //Pide el index y lo quita de la cola

      if (
        board.cells[currentIndex].value === 0 &&
        board.cells[currentIndex].status !== "UP"
      ) {
        board.cells[currentIndex].status = "UP";
        board.cellsLeft--;

        const neighbours = getNeighbours(
          board.settings.rows,
          board.settings.cols,
          currentIndex
        );
        for (const neighbour of neighbours) {
          enqueue(neighbour);
        }
      } else {
        if (board.cells[currentIndex].status !== "UP") {
          board.cells[currentIndex].status = "UP";
          board.cellsLeft--;
        }
      }
    }
  };
  enqueue(id);
  processQueue();

  return { ...board };
};
