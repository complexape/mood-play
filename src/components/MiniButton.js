import styled from 'styled-components';

const StyledButton = styled.button`
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin: auto;
    font-size: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 4px 7px;
    border: none;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    background-color: #FFFFF2;
    color: #555555;
    user-select: none;
    
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0 8px 15px;
        transform: translateY(-1px);
        background-color: #555555;
        color: #FFFFF2;
    }

    &.disabled {
        pointer-events: none;
        opacity: 0.9;
    }
`;

const MiniButton = ({ onClick, toggle, children, buttonDisabled }) => {
    return (
        <StyledButton onClick={onClick} toggle={toggle} className={buttonDisabled ? "disabled" : ""}>
            {children}
        </StyledButton>
    );
}

export default MiniButton;