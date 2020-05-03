import React from 'react';
import styled from 'styled-components';

import Display from '../Display/Display';
import Board from '../Board/Board';
import Alert from '../Alert/Alert';
import MobileButtons from '../MobileButtons/MobileButtons';

const StyledGame = styled.div`
    max-width: 300px;
`;

const Game = () => (
    <StyledGame>
        <Alert />
        <Display />
        <Board />
        <MobileButtons />
    </StyledGame>
);

export default Game;