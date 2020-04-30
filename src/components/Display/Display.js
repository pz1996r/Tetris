
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createNewBoard } from '../../actions/createNewBoard';
import { pauseGame } from '../../actions/pauseGame';
import { playGame } from '../../actions/playGame';
import { setGameOverFlag } from '../../actions/setGameOverFlag';

import playIcon from '../../utils/play.svg';
import pauseIcon from '../../utils/pause.svg';

const Buttons = styled.div`
    display:flex;
`;

const Icon = styled.div`
    margin-left: 10px;
    background-image:${({ img }) => (`url(${img})`)};
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const DisplayWrapper = styled.div`
    font-size:16px; 
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    width:100%;
`;

const Display = ({ score, pause, gameOverFlag, rows, columns,
    setGameOverFlagStatus, createNewBoard, pauseGame, playGame }) => (
        <>
            <DisplayWrapper>
                <p>Score: {score}</p>
                <Buttons>
                    {pause ? <Icon img={playIcon} onClick={() => { playGame(); if (gameOverFlag) { setGameOverFlagStatus(false); createNewBoard(rows, columns) } }} /> : <Icon img={pauseIcon} onClick={() => { pauseGame() }} />}
                </Buttons>
            </DisplayWrapper>
        </>
    )

const mapStateToProps = state => ({
    score: state.board.score,
    pause: state.boardSettings.pause,
    gameOverFlag: state.board.gameOverFlag,
    rows: state.boardSettings.rows,
    columns: state.boardSettings.columns,
})

const mapDispatchToProps = {
    playGame,
    pauseGame,
    createNewBoard,
    setGameOverFlagStatus: setGameOverFlag,
}
export default connect(mapStateToProps, mapDispatchToProps)(Display);