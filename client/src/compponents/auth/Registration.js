import React, {useState} from 'react';
import {Input} from "../../utils/input/Input";
import './auth.css';
import sales from '../../utils/sales';
import {regUser} from "../../actions/regUser";
import {Redirect, useHistory} from "react-router";

export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [optionSale,setOptionSale] = useState('')
    const history = useHistory();

    const salesList = sales.map(sale=>(
        <option key={sale.id} value={sale.value}>{sale.value}</option>
    ))
    const handlerOption = (e)=>{
        setOptionSale(e.target.value);
    }
    const handleOnSubmit = async () => {
        const data = {
            email,password,fullName,
            phone,birthDay,optionSale
        }
        await regUser(data)
        history.push('/login');
    };
    return (
        <div className={'auth'}>
            <div className={'auth__title'}>Регистрация</div>
            <div className={'auth__body'}>
                <Input type={'text'} value={fullName} setValue={setFullName} placeholder={'Введите ФИО ...'}/>
                <Input type={'email'} value={email} setValue={setEmail} placeholder={'Введите email ...'}/>
                <Input type={'number'} value={phone} setValue={setPhone}
                       placeholder={'Введите Ваш номер телефона ...'}/>
                <select onChange={handlerOption} className={'auth__select'}>
                    <option selected disabled>Откуда узнали</option>
                    {salesList}
                </select>
                <Input type={'date'} value={birthDay} setValue={setBirthDay} placeholder={'Введите дату рождения ...'}/>
                <Input type={'password'} value={password} setValue={setPassword} placeholder={'Введите пароль ...'}/>
                <button onClick={handleOnSubmit} className={'auth__btn'}>Зарегестрироваться</button>
            </div>
        </div>
    );
};

