import { BoardAction, Settings } from "../interfaces";
import { Modal } from "./Modal";

interface Props {
  settings: Settings;
  boardState: string;

  dispatch: React.Dispatch<BoardAction>;
}
export const AllModals = (props: Props) => {
  const { boardState, settings, dispatch } = props;

  const handleSettings = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const settings = newSettings(form.size.value, form.difficulty.value);

    dispatch({
      type: "RESET",
      settings: settings,
    });
    return;
  };
  switch (boardState) {
    case "SETTINGS":
      return (
        <Modal dispatch={dispatch}>
          <form
            className="form"
            onSubmit={(e) => {
              handleSettings(e);
            }}
          >
            <div className="options--container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p>Diff</p>
                <label className="number-label">
                  ez
                  <input
                    className="number-input"
                    type="radio"
                    id="ez"
                    name="difficulty"
                    value="ez"
                  />
                </label>
                <label className="number-label">
                  easy
                  <input
                    className="number-input"
                    type="radio"
                    id="easy"
                    name="difficulty"
                    value="easy"
                  />
                </label>
                <label className="number-label">
                  normal
                  <input
                    className="number-input"
                    type="radio"
                    id="normal"
                    name="difficulty"
                    value="normal"
                  />
                </label>
                <label className="number-label">
                  hard
                  <input
                    className="number-input"
                    type="radio"
                    id="hard"
                    name="difficulty"
                    value="hard"
                  />
                </label>
                <label className="number-label">
                  insane
                  <input
                    className="number-input"
                    type="radio"
                    id="insane"
                    name="difficulty"
                    value="insane"
                    required
                  />
                </label>
              </div>
              <div>
                <p>Size</p>
                <label className="number-label">
                  <input
                    className="number-input"
                    type="radio"
                    id="tiny"
                    name="size"
                    value="tiny"
                  />
                  tiny
                </label>
                <label className="number-label">
                  <input
                    className="number-input"
                    type="radio"
                    id="small"
                    name="size"
                    value="small"
                  />
                  small
                </label>
                <label className="number-label">
                  <input
                    className="number-input"
                    type="radio"
                    id="medium"
                    name="size"
                    value="medium"
                  />
                  medium
                </label>
                <label className="number-label">
                  <input
                    className="number-input"
                    type="radio"
                    id="large"
                    name="size"
                    value="large"
                  />
                  large
                </label>
                <label className="number-label">
                  <input
                    className="number-input"
                    type="radio"
                    id="huge"
                    name="size"
                    value="huge"
                    required
                  />
                  huge
                </label>
              </div>
            </div>
            <button type="submit">Save and play!</button>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "RESET",
                  settings: { rows: 10, cols: 20, mines: 20 },
                })
              }
            >
              Reset to default
            </button>
          </form>
        </Modal>
      );
    case "LOST":
      return (
        <Modal dispatch={dispatch}>
          <p>You lost!</p>

          <button
            onClick={() => dispatch({ type: "RESET", settings: settings })}
          >
            Restart
          </button>
        </Modal>
      );
  }
};

const newSettings = (size: string, difficulty: string): Settings => {
  const SIZE: Record<string, Record<string, number>> = {
    tiny: { rows: 8, cols: 8 },
    small: { rows: 10, cols: 20 },
    medium: { rows: 16, cols: 30 },
    large: { rows: 30, cols: 16 },
    huge: { rows: 30, cols: 30 },
  };
  const n = SIZE[size].rows * SIZE[size].cols;
  console.log(n);
  const DIFFICULTY: Record<string, number> = {
    ez: Math.floor(n * 0.08),
    easy: Math.floor(n * 0.12),
    normal: Math.floor(n * 0.15),
    hard: Math.floor(n * 0.2),
    insane: Math.floor(n * 0.25),
  };
  return {
    rows: SIZE[size].rows,
    cols: SIZE[size].cols,
    mines: DIFFICULTY[difficulty],
  };
};
