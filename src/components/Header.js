import styled from 'styled-components';
import React from 'react'

const StyledHeader = styled.h1`
    text-align: center;
`;

const Header = ({ children }) => {
  return (
    <StyledHeader>
        {children}
    </StyledHeader>
  );
}

export default Header;