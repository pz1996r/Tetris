/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createNewBoard } from '../../actions/createNewBoard';
import { move } from '../../actions/move';
import { pauseGame } from '../../actions/pauseGame';
import { playGame } from '../../actions/playGame';

import btn from '../../utils/btn.png';

const blockStatus = {
    FALLING: 'FALLING',
    FALLING_SQUARE: 'FALLING_SQUARE',
    LAYING: 'LAYING',
    EMPTY: 'EMPTY',
}

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    background: #424755;
`;

const Block = styled.div`
    padding-bottom: ${({ eSize }) => (eSize + '%')};
    width: ${({ eSize }) => (eSize + '%')};
    /* background: ${({ status }) => (status && status.color ? status.color : '')}; */
    background: ${({ status }) => (status ? 'green' : '')};

    display: block;
    border: 1px solid black;
    box-sizing:border-box;
`;

const TetrisBoard = ({ rows, columns, board, pause, currentBlock, shapes, createNewBoard, move, pauseGame, playGame }) => {
    let timer = useRef(false);
    let listener = useRef(false);
    let actualCurrentBlock = useRef(false);
    actualCurrentBlock.current = currentBlock;

    const makeMove = useCallback((x = 0, y = 1) => {
        move(actualCurrentBlock.current.x + x, actualCurrentBlock.current.y + y, shapes[0]);
    }, [currentBlock, move, shapes])

    useEffect(() => {
        createNewBoard(rows, columns);
    }, [columns, createNewBoard, rows]);

    useEffect(() => {
        // setting interval for falling down blocks
        timer.current = setInterval(makeMove, 1000);
        // setting listeners for moving and rotating blocks
        listener.current = (e) => {
            switch (e.code) {
                case 'ArrowLeft': makeMove(-1, 0); console.log(currentBlock, 'switch'); break;
                case 'ArrowRight': makeMove(1, 0); console.log(currentBlock, 'switch'); break;
                case 'ArrowDown': makeMove(); console.log(currentBlock, 'switch'); break;
                default: break;
            }
        };

        document.addEventListener('keydown', listener.current);
        return () => {
            clearInterval(timer.current);
            document.removeEventListener('keydown', listener.current);
        }
    }, []);

    return (
        <Board>
            {
                board.map((row, ix) => {
                    return row.map((field, iy) => {
                        return (<Block status={field} key={`${{ ix }}/${iy}`} eSize={100 / rows} />);
                    })
                })
            }
        </Board >
    )
}

const mapStateToProps = state => ({
    rows: state.boardSettings.rows,
    columns: state.boardSettings.columns,
    pause: state.boardSettings.pause,
    board: state.board.boardView,
    currentBlock: state.board.currentBlock,
    shapes: state.boardSettings.shapes,
})

const mapDispatchToProps = {
    createNewBoard,
    move,
    pauseGame,
    playGame
}
export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);

// klocek przyjmuje wartość odpowiadającą za kolor, 
/* background-image:${() => (`url(${btn})`)}; */