import React, { useContext } from 'react';
import styled from 'styled-components';
import { StartButton } from './StartButton';
import { MoodContext } from '../../context/MoodContext';

const Home = () => {
    const { mood } = useContext(MoodContext);

    return (
        <Div>
            <TitleHeader mood={mood}>
                <Span mood={mood}> Play</Span> Music Based on 
                <br></br>
                Your <Span mood={mood}>Mood</Span>
            </TitleHeader>
            <Info mood={mood}>
                An interactive music player that automatically changes music 
                based on your facial mood using AI.   
            </Info>
            <StartButton/>
        </Div>
    )
}

const TitleHeader = styled.h1`
    user-select: none;
    font-size: 70px;
    margin-top: 80px;
    margin-bottom: 20px;
    color: ${(props) => (props.mood.textColor)};
`;

const Info = styled.h2`
    user-select: none;
    margin: 0px 25vw;
    margin-bottom: 80px;
    color: ${(props) => (props.mood.textColor)};
    font-weight: 500;
`;

const Span = styled.span`
    color: ${(props) => (props.mood.textColorAlt)};
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

export default Home;