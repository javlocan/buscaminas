import React from "react";
import { BoardAction } from "../interfaces";

interface Props {
  children: React.ReactNode;
  open: boolean;
  dispatch: React.Dispatch<BoardAction>;
}
export const Modal = React.memo((props: Props) => {
  const { open, children, dispatch } = props;
  return (
    <div
      className="modal"
      style={{
        visibility: open ? "visible" : "hidden",
        opacity: open ? "1" : "0",
      }}
      onClick={() => dispatch({ type: "RESUME" })}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});
