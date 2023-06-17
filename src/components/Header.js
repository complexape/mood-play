import styled from 'styled-components';
import React, { useContext } from 'react';
import { MoodContext } from '../context/MoodContext';

const StyledHeader = styled.h1`
    text-align: center;
    color: ${(props) => (props.mood.textColor)};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
`;

const Header = ({ children, fontSize }) => {
    const { mood } = useContext(MoodContext);

    return (
        <StyledHeader mood={mood} fontSize={fontSize}>
            {children}
        </StyledHeader>
    );
}

export default Header;