import React from "react";
import classes from "./Square.module.css";

const Square = props => {
  return (
    <button
      className={[
        classes.Square,
        props.squareHighlight && classes.SquareHighlight
      ].join(" ")}
      onClick={() => props.squareClickHandler()}
    >
      {props.value}
    </button>
  );
};

export default Square;
