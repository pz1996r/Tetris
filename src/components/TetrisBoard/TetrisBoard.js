import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createNewBoard } from '../../actions/createNewBoard';

// finalnie pobrać rows i columns z redaxa !!!
// initialboard przechowywujemy w reduxie jako obiekt do manipulacji boardem 

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
`;

const Block = styled.div`
    padding-bottom: ${({ size }) => (size + '%')};
    width: ${({ size }) => (size + '%')};
    background: red;
    display: block;
    border: 1px solid black;
    box-sizing:border-box;
`;
const TetrisBoard = ({ rows, columns, createNewBoard, board }) => {
    useEffect(() => {
        createNewBoard(rows, columns);
    }, [columns, createNewBoard, rows])
    return (
        <Board>
            {
                board.map((row, ix) => {
                    return row.map((field, iy) => {
                        return (<Block key={`${{ ix }}/${iy}`} size={100 / rows} />)
                    })
                })
            }
        </Board>
    )
}

const mapStateToProps = state => ({
    rows: state.boardSettings.rows,
    columns: state.boardSettings.columns,
    board: state.board.boardView,
})

const mapDispatchToProps = {
    createNewBoard
}
export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);

// klocek przyjmuje wartość odpowiadającą za kolor, 