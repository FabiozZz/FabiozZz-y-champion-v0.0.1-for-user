import React from 'react';
import './input.css';
import './input.css.map';

export const Input = ({setValue,value,type,placeholder}) => {
    const handleChangeValue = (e)=>{
        setValue(e.target.value);
    }
    return (
        <input value={value} onChange={handleChangeValue} type={type} placeholder={placeholder}/>
    );
};

