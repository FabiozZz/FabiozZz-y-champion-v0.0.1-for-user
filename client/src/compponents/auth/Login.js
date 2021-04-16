import React, {useState} from 'react';
import {Input} from "../../utils/input/Input";
import './auth.css';
import {useDispatch} from "react-redux";
import {signUser} from "../../actions/regUser";
import {userLogIn} from "../../reducers/userRedicer";
import {Redirect, useHistory} from "react-router";

export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const handleOnSubmit = async () => {
        const user = await signUser(password, email)
        dispatch(userLogIn(user));
        history.push('/')
    };

    return (
        <div className={'auth'}>
            <div className={'auth__title'}>Авторизация</div>
            <div className={'auth__body'}>
                <Input type={'text'} value={email} setValue={setEmail} placeholder={'Введите email ...'}/>
                <Input type={'password'} value={password} setValue={setPassword} placeholder={'Введите пароль ...'}/>
                <button onClick={handleOnSubmit} className={'auth__btn'}>Войти</button>
            </div>
        </div>
    );
};

