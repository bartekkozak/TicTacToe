import React, { Component } from "react";
import Square from "./Square/Square";
import classes from "./Board.module.css";

export default class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    winningCombination: []
  };

  squareClickHandler = i => {
    const squares = [...this.state.squares];

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares, xIsNext: !this.state.xIsNext });
  };

  restartGame = () => {
    const emptyBoard = Array(9).fill(null);
    this.setState({
      squares: emptyBoard,
      xIsNext: true,
      winningCombination: []
    });
  };

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const winner = {
          player: squares[a],
          winningCombination: [...lines[i]]
        };
        return winner;
      }
    }
    return null;
  };

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = `Winner ${winner.player}`;
    } else if (!this.state.squares.includes(null)) {
      status = "Draw";
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    let renderSquare = this.state.squares.map((item, index) => {
      let squareHighlight = false;

      if (winner) {
        if (winner.winningCombination.includes(index)) {
          squareHighlight = true;
        }
      }

      return (
        <Square
          value={item}
          squareClickHandler={() => this.squareClickHandler(index)}
          key={index}
          squareHighlight={squareHighlight}
        />
      );
    });

    return (
      <div>
        <div className={classes.BoardStatus}>
          <div className="status">{status}</div>
          {(winner || !this.state.squares.includes(null)) && (
            <button onClick={this.restartGame}>Restart</button>
          )}
        </div>
        <div className={classes.Board}>{renderSquare}</div>
      </div>
    );
  }
}
