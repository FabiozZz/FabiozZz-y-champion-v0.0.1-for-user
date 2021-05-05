import React, {useEffect, useState} from 'react';
import {Input} from "../../utils/input/Input";
import './auth.css';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import api from '../../exampleApi/APIJWT';
import {userLogIn} from "../../actions/userActions";
import {toast, Toaster} from "react-hot-toast";
import {NavLink} from "react-router-dom";

export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    //данные пользователя для входа в систему
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //переключатель загрузки страницы
    const [isLoading, setIsLoading] = useState(false);

    //вызывается каждый раз при обновлении isLoading и смотрит показывать индикатор или нет
    useEffect(()=>{
        if (isLoading) {
            toast.loading('loading')
        }else{
            toast.remove();
        }
    },[isLoading])

    //прослушивает кнопку отправки формы,
    //устанавливает и снимает индикатор загрузки,
    // получает пользователя и диспатчит в редакс
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await api.login({email, password});
        if (res.data.user) {
            setIsLoading(false)
            toast.success('Success',{duration:2000})
            dispatch(userLogIn(res.data.user));
            history.push('/');
        }else{
            setIsLoading(false)
            toast.error('Error',{duration:2000})
        }
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
                    <div className={'auth__title'}>Авторизация</div>
                    <form className={'auth__body'}>
                        <Input type={'text'} value={email} setValue={setEmail} placeholder={'Введите email ...'}/>
                        <Input type={'password'} value={password} setValue={setPassword}
                               placeholder={'Введите пароль ...'}/>
                        <NavLink to={'/forget'}>Забыли пароль</NavLink>
                        <button onClick={handleOnSubmit} className={'auth__btn'}>Войти</button>
                    </form>
                </div>
            }
        </>
    );
};

