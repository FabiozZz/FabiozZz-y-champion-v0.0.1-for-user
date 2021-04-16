import React from 'react';
import './input.css';
import './input.css.map';

export const Input = (props) => {
    const handleChangeValue = (e)=>{
        props.setValue(e.target.value);
    }
    return (
        <input value={props.value} onChange={handleChangeValue} type={props.type} placeholder={props.placeholder}/>
    );
};

