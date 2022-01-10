import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <Circle bgColor={props.color}/> 
    </button>
  )
}

function Circle(props) {
  return (
    <div className="circle" style={{backgroundColor: props.bgColor}}></div>
  );
}
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(42).fill(null),
          redIsNext: true,
        };
      }
    
    resetBoard = () => {
      this.setState({
        squares: Array(42).fill(null),
        redIsNext: true, })
    }
    
    findBottomSquare(index) {
      // Returns the number square that is the lowest valid move
      // in the same column as the given index.
      // Returns null if there are no valid squares in the column.

      const bottomRow = [35, 36, 37, 38, 39, 40, 41];
      const columnIndex = index % 7;
      let bottomSquare = bottomRow[columnIndex]; // bottom square of the col

      // check from bottom up for an empty square
      while (bottomSquare >= 0) {
        if (!this.state.squares[bottomSquare]) {
          return bottomSquare;
        }
        bottomSquare -= 7;
      }

      // return null if no other square in the column is empty
      return null;
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares)) {
        return;
      }

      const bottomSquare = this.findBottomSquare(i);
      if (bottomSquare !== 0 && !bottomSquare) {
        return;
      }

      squares[bottomSquare] = this.state.redIsNext ? 'Red' : 'Yellow';
      this.setState({
        squares: squares,
        redIsNext: !this.state.redIsNext,
      });
    }

    renderSquare(i) {
      const square = this.state.squares[i];
      let color;
      if (square === 'Red') {
        color = '#F01E22';
      } else if (square === 'Yellow') {
        color = '#FAF055';
      } else {
        color = '#FFFFFF'
      }

      return (
        <Square
        color={color}
        onClick={()=> this.handleClick(i)}/>
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner){
        status = 'Winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.redIsNext ? 'Red' : 'Yellow');
      }
  
      return (
        <div>
          <div className="title">{"Connect 4"}</div>
          <div className="status">{status}</div>
          <button className="reset" onClick={this.resetBoard}>
            Reset
          </button>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function winnerHorizontal(squares) {
    let ind;
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 4; j++){
        ind = j + (7*i);
        if (squares[ind] && squares[ind] === squares[ind+1] && squares[ind] === squares[ind+2] 
          && squares[ind] === squares[ind+3]){
          return squares[ind];
        }
      }
    }
    return null;
  }

  function winnerVertical(squares) {
    const arr = [];
    for(let i = 0; i < 7; i++){
      const sub_arr = [];
      for(let j = i; j < 42; j = j + 7){
        sub_arr.push(j);
      }
      arr.push(sub_arr);
    }
    for (let i = 0; i<arr.length; i++){
      for (let ind = 0; ind < 3; ind++){
        const check = squares[arr[i][ind]];
        if (check && check === squares[arr[i][ind+1]] && check === squares[arr[i][ind+2]] && check === squares[arr[i][ind+3]]){
          return check;
        }
      }
    }
    return null;
  }

  function winnerDiagonal(squares) {
    const notInForward = [0, 1, 2, 7, 8, 14, 27, 33, 34, 39, 40, 41];
    const startingForward = [3, 4, 5, 6, 13, 20];
    const forward_arr = [];

    const notInBackward = [4, 5, 6, 12, 13, 20, 21, 28, 29, 35, 36, 37];
    const startingBackward = [14, 7, 0, 1, 2, 3];
    const backward_arr = [];

    for (let i = 0; i < startingForward.length; i++) {
      const forward_sub_arr = [];
      const backward_sub_arr = [];
      for (let j = startingForward[i]; j < 39; j = j + 6) {
        if (!notInForward.includes(j)) {
          forward_sub_arr.push(j)
        }
      }
      for (let j = startingBackward[i]; j < 42; j = j + 8) {
        if (!notInBackward.includes(j)) {
          backward_sub_arr.push(j)
        }
      }
      forward_arr.push(forward_sub_arr);
      backward_arr.push(backward_sub_arr);
    }
   
    for (let ind = 0; ind < forward_arr.length; ind++) {
      const forward_bound = forward_arr[ind].length - 4;
      const backward_bound = backward_arr[ind].length - 4;
      for (let i = 0; i <= forward_bound; i++) {
        const fcheck = squares[forward_arr[ind][i]];
        if (fcheck && fcheck === squares[forward_arr[ind][i+1]] && fcheck === squares[forward_arr[ind][i+2]] && fcheck === squares[forward_arr[ind][i+3]]){
          
          return fcheck;
        }
      }
      for (let i = 0; i <= backward_bound; i++) {
        const bcheck = squares[backward_arr[ind][i]];
        if (bcheck && bcheck === squares[backward_arr[ind][i+1]] && bcheck === squares[backward_arr[ind][i+2]] && bcheck === squares[backward_arr[ind][i+3]]){
          return bcheck;
        } 
      }
    }
   return null;
  }

  function calculateWinner(squares) {
    let winner;
    if (winnerHorizontal(squares)){
      winner = winnerHorizontal(squares);
    }
    if (winnerVertical(squares)){
      winner = winnerVertical(squares);
    }
    if (winnerDiagonal(squares)) {
      winner = winnerDiagonal(squares);
    }
    return winner;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  