import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { MoodContext } from '../context/MoodContext';

const Credits = () => {
    const { mood } = useContext(MoodContext);

    return (
        <Div>
            <Link mood={mood}>
                Made by Gordon Z.
            </Link>
            <br></br>
            <Link mood={mood} href='https://github.com/complexape/mood-play' target='_blank'>
                Github repository
            </Link>
        </Div>
    )
}

const Div = styled.div`
    user-select: none;
    padding: 10px;
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    z-index: 15;
`;

const Link = styled.a`
    text-align: center;
    margin: 5px;
    margin-top: 0;
    color: ${(props) => (props.mood.textColor)};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    font-size: 14px;
`;

export default Credits;