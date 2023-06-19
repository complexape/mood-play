import styled from 'styled-components'

export const Div = styled.div`
    display: flex;
    justify-content: center;
    color: ${(props) => props.mood.textColor};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
`;

export const Select = styled.select`
    height: 30px;
    background: white;
    color: gray;
    padding-left: 4px;
    font-size: 16px;
    border: none;
    margin-left: 10px;
`;

export const Option = styled.option`
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
`;