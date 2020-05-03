import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const GameOverWrapper = styled.p`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    font-size: 32px;
`;

const Alert = ({ gameOverFlag }) => (<>{gameOverFlag && <GameOverWrapper> GAME OVER !!!</GameOverWrapper>}</>);

const mapStateToProps = state => ({
    gameOverFlag: state.board.gameOverFlag
})

export default connect(mapStateToProps, null)(Alert);