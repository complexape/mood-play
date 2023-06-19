import React, {useContext} from 'react'
import styled from 'styled-components';
import { MoodContext } from '../../context/MoodContext';
import { EMOTIONS } from '../../constants';

const Button = styled.button`
    font-size: 40px;
    background: none;
    border: none;
    margin: 20px 5px 20px 5px;
    transition: transform 0.3s ease-in-out;
    &:hover {
        ${(props) => (props.disabled ? '' : 'transform: scale(1.2);')};
    }

    &:disabled {
        opacity: 0.8;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    color: ${(props) => (props.mood.textColor)};
`;

const MoodSelect = () => {
    const { mood, changeMood } = useContext(MoodContext);

    return (
        <Div mood={mood}>
            {Object.values(EMOTIONS).map((emotion) => (
                <Button
                    onClick={() => changeMood(emotion.value)}
                    disabled={emotion.value === mood.value}
                    key={emotion.value}
                >
                    {/* extra the emotion's emoji */}
                    {emotion.display.split(' ')[1]}
                </Button>
            ))}
        </Div>
    )
}

export default MoodSelect;