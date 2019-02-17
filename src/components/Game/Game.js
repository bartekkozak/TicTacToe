import React, { Component } from "react";
import classes from "./Game.module.css";
import Board from "../Board/Board";

export default class Game extends Component {
  render() {
    return (
      <div className={classes.Game}>
        <Board />
      </div>
    );
  }
}
