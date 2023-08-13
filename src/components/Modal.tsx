import React from "react";
import { BoardAction } from "../interfaces";

interface Props {
  children: React.ReactNode;

  dispatch: React.Dispatch<BoardAction>;
}
export const Modal = React.memo((props: Props) => {
  const { children, dispatch } = props;
  return (
    <div className="modal" onClick={() => dispatch({ type: "RESUME" })}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});
