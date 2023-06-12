import styled from 'styled-components';

const StyledButton = styled.h1`
    text-align: center;
    width: fit-content;
    padding: 10px 16px;
    border-radius: 12px;
    margin: 20px 15px;
    font-size: 18px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    background-color: ${(props) => (props.toggle ? '#555555' : '#FFFFF2')};
    color:  ${(props) => (!props.toggle ? '#555555' : '#FFFFF2')};
    user-select: none;
    
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0 8px 15px;
        transform: translateY(-1px);
    }

    &.disabled {
        pointer-events: none;
        opacity: 0.9;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Button = ({ onClick, toggle, children, buttonDisabled }) => {
    return (
        <StyledButton onClick={onClick} toggle={toggle} className={buttonDisabled ? "disabled" : ""}>
            {children}
        </StyledButton>
    );
}