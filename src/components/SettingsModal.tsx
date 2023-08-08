import { BoardAction, Settings } from "../interfaces";
import { Modal } from "./Modal";

interface Props {
  settings: Settings;
  boardState: string;
  dispatch: React.Dispatch<BoardAction>;
}
export const SettingsModal = (props: Props) => {
  const { boardState, settings, dispatch } = props;

  const handleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const settings = {
      rows: Number(form.rows.value),
      cols: Number(form.cols.value),
      mines: Number(form.mines.value),
    };
    console.log(settings);
    dispatch({
      type: "RESET",
      settings: settings,
    });
    return;
  };
  return (
    <Modal open={boardState === "PAUSED"} dispatch={dispatch}>
      <form
        className="form"
        onSubmit={(e) => {
          handleSettings(e);
        }}
      >
        <p>SETTINGS</p>
        <label className="number-label">
          ROWS
          <input
            className="number-input"
            type="number"
            id="rows"
            name="rows"
            min="10"
            max="100"
            defaultValue={settings.rows}
          />
        </label>
        <label className="number-label">
          COLS
          <input
            className="number-input"
            type="number"
            id="cols"
            name="cols"
            min="20"
            max="200"
            defaultValue={settings.cols}
          />
        </label>
        <label className="number-label">
          MINES
          <input
            className="number-input"
            type="number"
            id="mines"
            name="mines"
            min="10"
            max="100"
            defaultValue={settings.mines}
          />
        </label>
        <button type="submit">Save and reset</button>
      </form>
    </Modal>
  );
};
