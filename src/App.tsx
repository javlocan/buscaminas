import { useCallback, useEffect, useState } from "react";

import { getBoardArray, getNeighbours } from "./utils";
import { Cell, Modal, Panel } from "./components";

import "./App.css";
import { useStopwatch } from "react-timer-hook";

interface Settings {
  rows: number;
  cols: number;
  mines: number;
}

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    rows: 10,
    cols: 20,
    mines: 20,
  });
  const [openReset, setOpenReset] = useState(false);
  const [freezeClick, setFreezeClick] = useState(false);
  const size = settings.cols * settings.rows;
  const [remainingCount, setRemainingCount] = useState(size - settings.mines);
  const { totalSeconds, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const Storage = window.localStorage;
  const [bestScore, setBestScore] = useState(
    parseInt(Storage.getItem("bestScore") as string) || 888
  );

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (freezeClick) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true
    );
  });

  const [board, setBoard] = useState<number[]>(
    getBoardArray(settings.rows, settings.cols, settings.mines)
  );
  const [booleanBoard, setBooleanBoard] = useState<boolean[]>(
    new Array(size).fill(false)
  );

  useEffect(() => {
    const HTMLBoard = window.document.getElementsByClassName(
      "board"
    )[0] as HTMLElement;
    HTMLBoard.style.gridTemplateColumns = `repeat(${settings.cols}, minmax(50px,1fr))`;
    HTMLBoard.style.gridTemplateRows = `repeat(${settings.rows}, minmax(50px,1fr))`;
  }, [settings, setSettings, setBoard]);

  // Este useEffect controla el contador de celdas restantes

  useEffect(() => {
    if (booleanBoard.every((item) => item === false)) {
      setRemainingCount(size - settings.mines);
    } else {
      let count = 0;
      booleanBoard.forEach((item, i) => {
        if (item === false && board[i] !== -1) {
          count++;
        }
      });
      setRemainingCount(count);
    }
  }, [board, booleanBoard, settings.mines, size]);

  const initializeBoard = useCallback(() => {
    setBooleanBoard(new Array(size).fill(false));

    reset(undefined, false);

    setTimeout(() => {
      setBoard(getBoardArray(settings.rows, settings.cols, settings.mines));
    }, 600);

    //setFreezeClick(false);
  }, [size, reset, settings.rows, settings.cols, settings.mines]);

  // Effect that wins the game
  useEffect(() => {
    if (remainingCount === 0) {
      if (totalSeconds < bestScore) {
        const score = totalSeconds.toString();
        Storage.setItem("bestScore", score);
        setTimeout(() => setBestScore(parseInt(score)), 600);
      }
      setOpenReset(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingCount]);

  const handleClick = useCallback(
    (index: number) => {
      if (!isRunning) {
        start();
      }

      if (remainingCount === 0) {
        initializeBoard();
      }

      const queue: number[] = []; // Create a queue to store the cells to be updated

      // Las siguientes funciones se definen dentro porque no se van a reciclar
      // y así hay que pasarles menos props
      const enqueue = (cellIndex: number) => {
        if (!queue.includes(cellIndex)) {
          queue.push(cellIndex);
        }
      };

      const processQueue = () => {
        while (queue.length > 0) {
          const currentIndex = queue.shift()!; //Pide el index y lo quita de la cola

          if (board[currentIndex] === 0 && !booleanBoard[currentIndex]) {
            booleanBoard[currentIndex] = true;
            const neighbours = getNeighbours(
              settings.rows,
              settings.cols,
              currentIndex
            );
            for (const neighbour of neighbours) {
              enqueue(neighbour);
            }
          } else {
            booleanBoard[currentIndex] = true;
          }
        }

        setBooleanBoard([...booleanBoard]); // Update the booleanBoard state after all cells have been processed
      };

      // AQUÍ OCURRE LA VERDADERA GESTIÓN DE LAS CELDAS

      // Si el valor de la casilla es 0, lo de la cola para las vecinas

      if (board[index] === 0) {
        enqueue(index);
        processQueue();
        setFreezeClick(false);
      } else {
        // El resto de valores y las minas

        // Primero gestionamos las minas

        if (board[index] === -1) {
          booleanBoard[index] = true;
          setBooleanBoard([...booleanBoard]);

          for (let i = 0; i < booleanBoard.length; i++) {
            if (board[i] === -1) {
              booleanBoard[i] = true;
            }
          }

          setTimeout(() => {
            setOpenReset(true);
          }, 1000);
        }

        // Resto de números

        booleanBoard[index] = true;
        setTimeout(() => setBooleanBoard([...booleanBoard]), 500);
      }
    },
    [
      isRunning,
      remainingCount,
      board,
      start,
      initializeBoard,
      booleanBoard,
      settings.rows,
      settings.cols,
    ]
  );

  return (
    <>
      <header>
        <Panel
          settings={settings}
          remainingCount={remainingCount}
          setOpenSettings={setOpenSettings}
          totalSeconds={totalSeconds}
          bestScore={bestScore}
          pause={pause}
        />
        <button
          onClick={() => {
            setRemainingCount(0);
          }}
        >
          Mock win
        </button>
      </header>
      <main className="board">
        {board.map((cellValue, index) => (
          <Cell
            index={index}
            key={index}
            value={cellValue}
            show={booleanBoard[index]}
            handleClick={handleClick}
          />
        ))}
      </main>
      <Modal open={openSettings}>
        <p>SETTINGS</p>

        <button
          onClick={() => {
            initializeBoard();
            setOpenSettings(false);
          }}
        >
          Save and reset
        </button>
        <button
          className="close"
          onClick={() => {
            start();
            setOpenSettings(false);
          }}
        >
          <img src="/cross.png" alt="close" width="20px" />
        </button>
      </Modal>
      <Modal open={openReset}>
        {remainingCount === 0 ? (
          <p>
            You won!<br></br>Your time is {Storage.getItem("bestScore")}
          </p>
        ) : (
          <p>You lost!</p>
        )}
        <button
          onClick={() => {
            initializeBoard(), setOpenReset(false);
          }}
        >
          Restart
        </button>
      </Modal>
    </>
  );
}

export default App;
