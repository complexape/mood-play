import styled from 'styled-components';

const StyledButton = styled.h1`
    text-align: center;
    width: fit-content;
    padding: 10px 16px;
    border-radius: 12px;
    margin: 20px 15px;
    font-size: 14px;
    background-color: #FFFFF2;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;

    &:hover {
        background-color: #555555;
        color: #fff;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const Button = ({ onClick, children }) => {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    );
}