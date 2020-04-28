/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createNewBoard } from '../../actions/createNewBoard';
import { move } from '../../actions/move';
import { pauseGame } from '../../actions/pauseGame';
import { playGame } from '../../actions/playGame';

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
    /* background: ${({ status }) => (status && status.color ? status.color : '')}; */
    background: ${({ status }) => (status ? 'green' : '')};

    display: block;
    border: 1px solid black;
    box-sizing:border-box;
`;

const TetrisBoard = ({ rows, columns, board, pause, currentBlock, currentShape, shapes, createNewBoard, move, pauseGame, playGame }) => {
    let timer = useRef(false);
    let listener = useRef(false);
    let actualCurrentBlock = useRef(false);
    let actualCurrentShape = useRef(false);
    let actualBoard = useRef(false);
    actualCurrentBlock.current = currentBlock;
    actualCurrentShape.current = currentShape;
    actualBoard.current = board;

    const checkColision = () => {
        // console.log(actualCurrentShape.current, actualCurrentBlock.current, actualBoard.current);
        // y -2

        // const antyCliner = []
        // actualCurrentShape.current.payload.shape.forEach((tab, y) => {
        //     tab.forEach((block, x) => {
        //         if (block !== 0) {
        //             const cordX = actualCurrentBlock.current.x + x - 1;
        //             const cordY = actualCurrentBlock.current.y + y - 1;
        //             if (cordX >= 0 && cordY >= 0) {
        //                 const flag = board[cordY][cordX] !== 0;
        //                 // console.log(flag);
        //                 // flag === 
        //                 // board[cordY][cordX] = 99;
        //                 // antyCliner.push(`[${cordX},${cordY}]`);
        //             }
        //         }
        //     })

        // })

    };

    const makeMove = useCallback((x = 0, y = 1, direction = 'DOWN') => {
        checkColision();
        move(actualCurrentBlock.current.x + x, actualCurrentBlock.current.y + y, actualCurrentShape.current, direction);
    }, [currentBlock, move, shapes])



    const generateRandomShape = () => {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        return randomShape;
    }

    useEffect(() => {
        const shape = generateRandomShape();
        createNewBoard(rows, columns, shape);
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
            {board.map((row, ix) => {
                return row.map((field, iy) => {
                    return (<Block status={field} key={`${{ ix }}/${iy}`} eSize={100 / rows} />);
                })
            })}
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
    currentShape: state.board.currentShape,
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