/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createNewBoard } from '../../actions/createNewBoard';
import { move } from '../../actions/move';
import { pauseGame } from '../../actions/pauseGame';
import { playGame } from '../../actions/playGame';
import { rotate } from '../../actions/rotate';

// import btn from '../../utils/btn.png';

// const blockStatus = {
//     FALLING: 'FALLING',
//     FALLING_SQUARE: 'FALLING_SQUARE',
//     LAYING: 'LAYING',
//     EMPTY: 'EMPTY',
// }

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
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

const TetrisBoard = ({ rows, columns, board, pause, currentBlock, currentShape, shapes, score, createNewBoard, move, rotate, pauseGame, playGame }) => {
    let timer = useRef(false);
    let listener = useRef(false);
    let actualCurrentBlock = useRef(false);
    let actualCurrentShape = useRef(false);
    let actualBoard = useRef(false);
    actualCurrentBlock.current = currentBlock;
    actualCurrentShape.current = currentShape;
    actualBoard.current = board;

    const makeMove = useCallback((x = 0, y = 1, direction = 'DOWN') => {
        move(actualCurrentBlock.current.x + x, actualCurrentBlock.current.y + y, actualCurrentShape.current, direction);
    }, [currentBlock, move, shapes])

    const rotateBlock = () => {
        const iShape = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        actualCurrentShape.current.forEach((el, i) => {
            el.forEach((item, j) => {
                iShape[j][actualCurrentShape.current.length - 1 - i] = item;
            })
        })
        console.log(actualCurrentShape.current, iShape);
        rotate(iShape);
    }

    useEffect(() => {
        createNewBoard(rows, columns);
    }, [columns, createNewBoard, rows]);

    useEffect(() => {
        // setting interval for falling down blocks
        timer.current = setInterval(makeMove, 1000);
        // setting listeners for moving and rotating blocks
        listener.current = (e) => {
            switch (e.code) {
                case 'ArrowLeft': makeMove(-1, 0, 'LEFT'); break;
                case 'ArrowRight': makeMove(1, 0, 'RIGHT'); break;
                case 'ArrowDown': makeMove(); break;
                case 'ArrowUp': rotateBlock(); break;
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
        <>
            <h1>{score}</h1>
            <Board>
                {board.map((row, ix) => {
                    return row.map((field, iy) => {
                        return (<Block status={field} key={`${{ ix }}/${iy}`} eSize={100 / rows} />);
                    })
                })}
            </Board >
        </>
    )
}

const mapStateToProps = state => ({
    rows: state.boardSettings.rows,
    columns: state.boardSettings.columns,
    pause: state.boardSettings.pause,
    board: state.board.boardView,
    currentBlock: state.board.currentBlock,
    shapes: state.boardSettings.shapes,
    currentShape: state.board.currentShape,
    score: state.board.score,
})

const mapDispatchToProps = {
    createNewBoard,
    move,
    pauseGame,
    playGame,
    rotate,
}
export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);

/* background-image:${() => (`url(${btn})`)}; */