import React, { useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import {
    Div,
    Select,
    Option
} from './DropdownElements'

const SelectDropdown = (props) => {
    const { options, state, setState, children } = props;
    const { mood } = useContext(MoodContext);

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    return (
        <Div mood={mood}>
            <b>{children}</b>
            <Select value={state} onChange={handleStateChange}>
                {options.map((option, index) => (
                    <Option value={option.value} key={index}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </Div>
    )
}

export default SelectDropdown;