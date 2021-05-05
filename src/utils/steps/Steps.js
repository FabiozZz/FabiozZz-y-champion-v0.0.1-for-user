import React, {useState} from 'react';
import wrapActionCreators from "react-redux/lib/utils/wrapActionCreators";

export const Steps = ({step})=> {
    const step1 = 'activeStep'

    return (
        <div className={`auth__steps`}>
            <div className={`auth__steps__wrapper ${step>=1&&step1}`}>
                <span id={'circleStep'} className={'auth__steps__wrapper__circle'}>1</span><span>Шаг 1</span>
            </div>
            <div className={`auth__steps__wrapper ${step>=2&&step1}`}>
                <span id={'circleStep'} className={'auth__steps__wrapper__circle'}>2</span><span>Шаг 2</span>
            </div>
            <div className={`auth__steps__wrapper ${step>=3&&step1}`}>
                <span id={'circleStep'} className={'auth__steps__wrapper__circle'}>3</span><span>Шаг 3</span>
            </div>
        </div>
    );
}