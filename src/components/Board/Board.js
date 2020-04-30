import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Board = styled.div`
display: flex;
flex-wrap: wrap;
width:100%;
background: #424755;
`;

const Block = styled.div`
padding-bottom: ${({ eSize }) => (eSize + '%')};
width: ${({ eSize }) => (eSize + '%')};
background: ${({ status }) => (status ? status.color : '')};
display: block;
border: 1px solid black;
box-sizing:border-box;
`;

const TetrisBoard = ({ board, rows }) => (
    <Board>
        {board.map((row, ix) => {
            return row.map((field, iy) => {
                return (<Block status={field} key={`${{ ix }}/${iy}`} eSize={100 / rows} />);
            })
        })}
    </Board >
);


const mapStateToProps = state => ({
    board: state.board.boardView,
    rows: state.boardSettings.rows,
})

export default connect(mapStateToProps, null)(TetrisBoard);