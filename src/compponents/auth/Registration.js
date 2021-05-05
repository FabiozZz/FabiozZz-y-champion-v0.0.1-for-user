import React, {useEffect, useState} from 'react';
import {Input} from "../../utils/input/Input";
import './auth.css';
import {useHistory} from "react-router";
import api from '../../exampleApi/APIJWT';
import {toast,Toaster} from "react-hot-toast";


export const Registration = () => {
    const history = useHistory();

    //переключатель индикатора загрузки
    const [isLoading,setIsLoading] = useState(false);

    //данные пользователя
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dotSales, setDotSales] = useState('');
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDay, setBirthDay] = useState('');

    //следит за переключателем и в зависимости от значения показывает или скрывает индикатор
    useEffect(()=>{
        if (isLoading) {
            toast.loading('loading')
        }else{
            toast.remove();
        }
    },[isLoading])

    //прослушивает кнопку отправки на сервер данных от пользователя,
    //переключает индикатор загрузки
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newUser = {
            email,password,name,surName,patronymic,
            dotSales,
            phone,birthDay
        };
        const {data} = await api.register(newUser);
        setIsLoading(false)
        history.push('/login')
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
                        <Input type={'text'} value={dotSales} setValue={setDotSales} placeholder={'Откуда о нас узнали ...'}/>
                        <Input type={'email'} value={email} setValue={setEmail} placeholder={'Eemail ...'}/>
                        <Input type={'number'} value={phone} setValue={setPhone}
                               placeholder={'Номер телефона ...'}/>
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

