import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.h1`
    text-align: center;
    width: fit-content;
    padding: 15px 20px;
    border-radius: 12px;
    margin: 10px 5px;
    font-size: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    color: #555555;
    background-color: #FFFFF2;
    user-select: none;
    
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0 8px 15px;
        transform: translateY(-1px);
        background-color: #555555;
        color:  #FFFFF2;
    }
`;

export const StartButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/player')
    }

    return (
        <StyledButton 
            onClick={handleClick}
        >
            Try it out
        </StyledButton>
    );
}