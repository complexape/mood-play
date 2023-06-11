import React, { useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import { 
    StyledDiv, 
    StyledSvg,
    StyledPathA, 
    StyledPathB, 
    StyledPathC
} from './WaveElements'

const Wave = () => {
    const { mood } = useContext(MoodContext);

    return (
        <>
            <StyledDiv>
                <StyledSvg viewBox="0 0 500 500"
                    preserveAspectRatio="xMinYMin meet"
                    style={{zIndex: -11}}>
                    
                    <StyledPathA 
                        d="M0, 80 C300, 0 400, 300 500, 50 L500, 00 L0, 0 Z"
                        mood={mood}
                    />
                </StyledSvg>
            </StyledDiv>

            <StyledDiv>
                <StyledSvg viewBox="0 0 500 500"
                    preserveAspectRatio="xMinYMin meet"
                    style={{zIndex: -12}}>
                    
                    <StyledPathB 
                        d="M0, 100 C150, 200 350, 0 500, 100 L500, 00 L0, 0 Z"
                        mood={mood}
                    />
                </StyledSvg>
            </StyledDiv>
            
            <StyledDiv>
                <StyledSvg viewBox="0 0 500 500"
                    preserveAspectRatio="xMinYMin meet"
                    style={{zIndex: -13}}>
                    
                    <StyledPathC 
                        d="M0, 100 C150, 300 350, 0 500, 100 L500, 00 L0, 0 Z" 
                        mood={mood}
                    />
                </StyledSvg>
            </StyledDiv>
        </>
    )
}

export default Wave;