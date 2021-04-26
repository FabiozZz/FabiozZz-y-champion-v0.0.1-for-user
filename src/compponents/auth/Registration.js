import React, {useEffect, useState} from 'react';
import {Input} from "../../utils/input/Input";
import './auth.css';
import sales from '../../utils/sales';
import {useHistory} from "react-router";
import api from '../../exampleApi/APIJWT';
import {toast,Toaster} from "react-hot-toast";


export const Registration = () => {

    const [isLoading,setIsLoading] = useState(false);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const [phone, setPhone] = useState('');

    const [birthDay, setBirthDay] = useState('');

    const [optionSale,setOptionSale] = useState('')

    const history = useHistory();

    const salesList = sales.map((sale,index)=>(
        <option key={index} value={sale.id}>{sale.value}</option>
    ))
    const handlerOption = (e)=>{
        setOptionSale(e.target.value);
    }
    useEffect(()=>{
        if (isLoading) {
            toast.loading('loading')
        }else{
            toast.remove();
        }
    },[isLoading])
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newUser = {
            email,password,name,surName,patronymic,
            phone,birthDay,optionSale
        };
        const {data} = await api.register(newUser);
        console.log(data)
        // await api.register(data).then(resp=> {
        setIsLoading(false)
        //     Toast.success('',2000,()=>{
        history.push('/login')
        //     })
        // }).catch(er=>{
        //     setIsLoading(false);
        //     console.log(er);
        // })
    };
    return (
        <>
            <Toaster position={'top-center'} toastOptions={
                {style: {
                        margin: '40px',
                        background: '#363636',
                        color: '#fff',
                        zIndex: 1,
                    }
                }
            }/>
            {!isLoading&&

            <div className={'auth'}>

                <form action={'/some/action'}>
                    <div className={'auth__title'}>Регистрация</div>
                    <div className={'auth__body'}>
                        <Input type={'text'} value={surName} setValue={setSurName} placeholder={'Фамилия ...'}/>
                        <Input type={'text'} value={name} setValue={setName} placeholder={'Имя ...'}/>
                        <Input type={'text'} value={patronymic} setValue={setPatronymic} placeholder={'Отчество ...'}/>
                        <Input type={'email'} value={email} setValue={setEmail} placeholder={'Eemail ...'}/>
                        <Input type={'number'} value={phone} setValue={setPhone}
                               placeholder={'Номер телефона ...'}/>
                        <select onChange={handlerOption} defaultValue={'Откуда узнали'} className={'auth__select'}>
                            <option disabled>Откуда узнали</option>
                            {salesList}
                        </select>
                        <label htmlFor="">Введите дату рождения
                            <Input type={'date'} value={birthDay} setValue={setBirthDay}/>
                        </label>
                        <Input type={'password'} value={password} setValue={setPassword}
                               placeholder={'Введите пароль ...'}/>
                        <button type={'submit'} onClick={handleOnSubmit} className={'auth__btn'}>Зарегестрироваться
                        </button>
                    </div>
                </form>
            </div>
            }
        </>
    );
};

