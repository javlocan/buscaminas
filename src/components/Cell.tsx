import React, { useEffect } from "react";

interface Props {
  index: number;
  value: number;
  show: boolean;
  handleClick: (index: number) => void;
}

export const Cell: React.FC<Props> = React.memo((props: Props) => {
  const { index, value, show, handleClick } = props;

  useEffect(() => {
    console.log("Cell with id=", index, " has been rendered");
  }, [show, index]);

  return (
    <div className="cell" id={`${index}`} onClick={() => handleClick(index)}>
      {show ? value : ""}
    </div>
  );
});
