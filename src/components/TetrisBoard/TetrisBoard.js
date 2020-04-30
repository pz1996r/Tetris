/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import GameView from '../GameView/GameView';

import { createNewBoard } from '../../actions/createNewBoard';
import { move } from '../../actions/move';
import { rotate } from '../../actions/rotate';

const TetrisBoard = ({ rows, columns, board, pause, currentBlock, currentShape, shapes, createNewBoard, move, rotate }) => {
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
        if (!pause) {
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
        } else {
            timer.current && clearInterval(timer.current);
            listener.current && document.removeEventListener('keydown', listener.current);
        }

        return () => {
            timer.current && clearInterval(timer.current);
            listener.current && document.removeEventListener('keydown', listener.current);
        }
    }, [pause]);

    return (<GameView />)
}

const mapStateToProps = state => ({
    rows: state.boardSettings.rows,
    columns: state.boardSettings.columns,
    pause: state.boardSettings.pause,
    board: state.board.boardView,
    currentBlock: state.board.currentBlock,
    shapes: state.boardSettings.shapes,
    currentShape: state.board.currentShape,
})

const mapDispatchToProps = {
    createNewBoard,
    move,
    rotate,
}
export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);