import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { move } from '../../actions/move';
import { rotate } from '../../actions/rotate';
import { rotateBlock as rotateTetrisBlock } from '../../common/rotateBlock';

import arrowIcon from '../../utils/arrow.svg';
import rotateIcon from '../../utils/rotate.svg';

const ButtonsWrapper = styled.div`
    font-size:16px; 
    display:flex;
    justify-content:center;
    align-items:baseline;
    width:100%;

    @media (min-width: 600px) {
        display:none;
    }
`;

const Icon = styled.div`
    margin-left: 10px;
    background-image:${({ img }) => (`url(${img})`)};
    transform: ${({ rotate }) => (`rotate(${rotate}deg)`)};
    margin: 10px;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const MobileButtons = ({ currentBlock, currentShape, move, rotate }) => {
    let actualCurrentBlock = useRef(false);
    let actualCurrentShape = useRef(false);

    useEffect(() => {
        actualCurrentBlock.current = currentBlock;
        actualCurrentShape.current = currentShape;
    }, [currentBlock, currentShape])

    const rotateBlock = () => {
        rotateTetrisBlock(rotate, actualCurrentShape.current);
    }

    const makeMove = useCallback((x = 0, y = 1, direction = 'DOWN') => {
        move(actualCurrentBlock.current.x + x, actualCurrentBlock.current.y + y, actualCurrentShape.current, direction);
    }, [move])

    return (
        <ButtonsWrapper>
            <Icon img={arrowIcon} onClick={() => { makeMove(-1, 0, 'LEFT') }} />
            <Icon img={arrowIcon} rotate={270} onClick={() => { makeMove() }} />
            <Icon img={rotateIcon} onClick={() => { rotateBlock() }} />
            <Icon img={arrowIcon} rotate={180} onClick={() => { makeMove(1, 0, 'RIGHT') }} />
        </ButtonsWrapper>
    )
}

const mapStateToProps = state => ({
    currentBlock: state.board.currentBlock,
    currentShape: state.board.currentShape,
})

const mapDispatchToProps = {
    move,
    rotate,
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileButtons);