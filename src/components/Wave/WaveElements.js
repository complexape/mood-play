import styled from 'styled-components';

export const StyledDiv = styled.div`
    display: inline-block;
    position: absolute;
    width: 100%;
    padding-bottom: min(100vh, 100%);
    vertical-align: middle;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: -9;
`;

export const StyledSvg = styled.svg`
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
`;

export const StyledPathA = styled.path`
    stroke: none;
    fill : ${(props) => (props.mood.waveColorA)};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
`;

export const StyledPathB = styled.path`
    stroke: none;
    fill : ${(props) => (props.mood.waveColorB)};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
`;

export const StyledPathC = styled.path`
    stroke: none;
    fill : ${(props) => (props.mood.waveColorC)};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
`;