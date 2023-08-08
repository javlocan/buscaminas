import React from "react";

import "../App.css";
import { a, useSpring } from "@react-spring/web";
import { BoardAction } from "../interfaces";

interface Props {
  index: number;
  value: number;
  status: string;
  dispatch: React.Dispatch<BoardAction>;
}

export const Cell: React.FC<Props> = React.memo((props: Props) => {
  const { index, value, status, dispatch } = props;

  const { transform, opacity } = useSpring(cellSpring(status));
  const MineExploding = useSpring(mineSpring);

  if (value === -1 && status === "UP") {
    setTimeout(() => {
      dispatch({ type: "LOSE" });
    }, 500);
  }

  /*   console.log(
    "Cell with id=",
    index,
    "with status ",
    status,
    " has been rendered"
  ); */

  return (
    <div
      id={`cell-${index}`}
      className={`cell ${status}`}
      onClick={() => dispatch({ type: "LEFT_CLICK", id: index, value: value })}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch({ type: "RIGHT_CLICK", id: index });
      }}
    >
      <a.div
        className="c back"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      ></a.div>
      <a.div
        className={`c front ${visual[value]}`}
        style={
          value === -1 && status == "UP"
            ? {
                opacity,
                //transform,
                rotateX: "180deg",
                ...MineExploding,
              }
            : { opacity, transform, rotateX: "180deg" }
        }
      >
        <span>{value > 0 ? value : value === -1 ? "💣" : ""}</span>
      </a.div>
    </div>
  );
});

// -------------- GRAPHIC HANDLERS ------------------

const cellSpring = (status: string) => {
  return {
    opacity: status === "UP" ? 1 : 0,
    transform: `perspective(1000px) rotateX(${status === "UP" ? 180 : 0}deg)`,
    config: {
      mass: 10,
      tension: 400,
      friction: 20,
      clamp: true,
      stiffness: 200,
    },
  };
};

const mineSpring = {
  from: { scale: 1, transform: "rotate(0deg)" },
  to: [
    { scale: 1.1, transform: "rotate(20deg)" },
    { scale: 1.2, transform: "rotate(-20deg)" },
    { scale: 1.3, transform: "rotate(20deg)" },
    { scale: 1.4, transform: "rotate(-20deg)" },
    { scale: 1.5, transform: "rotate(20deg)" },
    { scale: 1.6, transform: "rotate(-20deg)" },
    { scale: 1.7, transform: "rotate(20deg)" },
    { scale: 1.8, transform: "rotate(-20deg)" },
    { scale: 1.9, transform: "rotate(20deg)" },
    { scale: 2, transform: "rotate(-20deg)" },
  ],

  config: {
    mass: 1,
    tension: 900,
    friction: 20,
    clamp: true,
    stiffness: 200,
  },
};

const visual: Record<number, string> = {
  "-1": "mine",
  "0": "zero",
  "1": "number",
  "2": "number",
  "3": "number",
  "4": "number",
  "5": "number",
  "6": "number",
  "7": "number",
  "8": "number",
  "9": "number",
};
