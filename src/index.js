import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i].player}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderRow(chunk_index, row_chunk){

        let row = [];

        for(let i=0; i < row_chunk.length; i++){
            row.push(this.renderSquare(row_chunk[i]));
        }

        return (
            <div key={chunk_index} className="board-row">
                {row}
            </div>
        );
    }

    render() {

        let board = [];
        const square_keys = this.props.squares.map((value, index) => {
            return index;
        });
        const chunks = chunkArray(square_keys, this.props.board_width);

        for(let i=0; i < chunks.length; i++){

            board.push(this.renderRow(i, chunks[i]));

        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.board_width = 4;
        this.square_count = Math.pow(this.board_width, 2);
        this.center = ( this.boardHasCenter() ) ? Math.round(this.square_count / 2) - 1 : false;
        this.corners = this.getCorners();
        this.diag_square_indexes = this.getDiagSquareIndexes();

        this.state = {
            history: [
                {
                    squares: create_square_data_set(this.board_width),
                    player: null,
                    position: null
                }
            ],
            stepNumber: 0,
            current_player: 'O',
            current_position: null,
            xIsNext: true,
        };

    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = JSON.parse(JSON.stringify(current.squares));

        /**
         * Prevents unnecessary square click events
         */
        if (this.getWinner(squares)|| squares[i].player) {
            return;
        }

        squares[i].player = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    player: squares[i].player,
                    position: Object.assign(squares[i].position, {index: i})
                }
            ]),
            stepNumber: history.length,
            current_player: squares[i].player,
            current_position: Object.assign(squares[i].position, {index: i}),
            xIsNext: !this.state.xIsNext
        });

    }

    /**
     * Helps reduce diagonal win checks
     *
     * @returns {boolean}
     */
    boardHasCenter(){
        return (this.board_width % 2 === 1)
    }


    /**
     * Gets the index value of each corner of the square/board
     */
    getCorners(){

        //corner 1
        let corners = [0];
        //corner 2
        corners.push(this.board_width - 1);
        //corner 3
        corners.push((this.square_count - 1) - (this.board_width -1));
        //corner 4
        corners.push(this.square_count - 1);

        return corners;

    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    getWinner( current_squares ){

        const current_player = this.state.current_player;
        const player_data_set = current_squares.filter( ( value, index, arr ) => {
            return (value.player === current_player);
        });

        //player has enough moves to win
        if(player_data_set.length >= this.board_width){

            //check row wins
            const row = player_data_set.filter( ( value, index, arr ) => {
                return (value.position.row === this.state.current_position.row);
            });
            if(row.length === this.board_width){
                return this.state.current_player;
            }

            //check col wins
            const column = player_data_set.filter( ( value, index, arr ) => {
                return (value.position.column === this.state.current_position.column)
            });
            if(column.length === this.board_width){
                return this.state.current_player;
            }

            //Check diagonal wins
            //Bail early if player does not have center OR at least 2 corners
            if(
                ( this.center && !this.currentPlayerOwnsCenter(current_squares) ) ||
                !this.currentPlayerHasEnoughCorners(current_squares)

            ){
                return false;
            }

            //Run diagonal win check
            for(let d = 0; d < this.diag_square_indexes.length; d++){

                let result = [];

                for(let i = 0; i < this.diag_square_indexes[d].length; i++){

                    const square_index = this.diag_square_indexes[d][i];

                    if(
                        typeof current_squares[square_index] !== 'undefined' &&
                        current_squares[square_index].hasOwnProperty('player') &&
                        current_squares[square_index].player === this.state.current_player
                    ){
                        result.push(square_index);
                    }

                }

                if(result.length === this.board_width){
                    return this.state.current_player;
                }

            }

        }

        return false;

    }

    currentPlayerOwnsCenter(current_squares){

        return (
            this.center &&
            Number.isInteger(this.center) &&
            current_squares[this.center].player === this.state.current_player
        )

    }


    /**
     * Checks if current player has at least 2 corners in the same line
     *
     * @param squares
     * @returns {Array}
     */
    currentPlayerHasEnoughCorners(squares){

        const current_player = this.state.current_player;

        return (
            ( squares[this.corners[0]].player === current_player && squares[this.corners[3]].player === current_player ) ||
            ( squares[this.corners[1]].player === current_player && squares[this.corners[2]].player === current_player )
        );

    }


    /**
     * Gets the square's diagonal indexes
     *
     * @returns {[null,null]}
     */
    getDiagSquareIndexes(){

        let diag_one = [];
        let diag_two = [];
        let result = [diag_one, diag_two];

        for(let i = 0; i <= (this.square_count - 1); i += this.board_width + 1){
            diag_one.push(i);
        }

        for(let d = this.board_width - 1; d <= (this.square_count - this.board_width); d += this.board_width - 1){
            diag_two.push(d);
        }

        return result;

    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.getWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Player ${step.player}: ( row: ${step.position.row}, column: ${step.position.column} )` :
                'START';
            return (
                <li key={move}>
                    <button className='history-btns' onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        //

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        board_width={this.board_width}
                        square_count={this.square_count}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <h3>Go to a move</h3>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

/**
 * Splits an array into chunks given a size
 *
 * @param arr
 * @param chunk_size
 * @returns {Array}
 */
function chunkArray( arr, chunk_size){

    let chunk;
    let chunks = [];

    for (let i = 0; i < arr.length; i += chunk_size) {
        chunk = arr.slice(i, i + chunk_size);
        chunks.push(chunk);
    }

    return chunks;
}


/**
 * Creates the initial board's data structure
 *
 * @param square_length
 * @returns {Array}
 */
function create_square_data_set(square_length){

    let data_set	= [];
    let row = 1;
    let column = 1;

    for ( let x = 0; x < square_length; x++ ) {
        for ( let i = 0; i < square_length; i++ ) {

            data_set.push({
                position: {
                    row: row,
                    column: column,
                },
                player: null
            });
            column ++;
        }
        row ++;
        column = 1;
    }

    return data_set;

}