import React from 'react';
import styled from 'styled-components';

import Display from '../Display/Display';
import Board from '../Board/Board';
import Alert from '../Alert/Alert';

const StyledGame = styled.div`
    max-width: 300px;
`;

const Game = () => (
    <StyledGame>
        <Alert />
        <Display />
        <Board />
    </StyledGame>
);

export default Game;