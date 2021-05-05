import React, {useEffect, useState} from 'react';
import './forget.css'
import {Steps} from "../../../utils/steps/Steps";
import {Input} from "../../../utils/input/Input";
import {useHistory} from "react-router";
import api from '../../../exampleApi/APIJWT';
import {toast, Toaster} from "react-hot-toast";

export const ForgetPassword = ()=> {
    const history = useHistory();

    //блок для внутреннего стейта

    //кнопка отправки паролей
    const [disableFinish,setDisableFinish] = useState(true);

    //загрузка данных на сервер
    const [isLoading,setIsLoading] = useState(false);

    //пользователь
    const [email,setEmail] = useState('');
    const [codeEmail,setCodeEmail] = useState('');
    const [password,setPassword] = useState({
        pass:'',
        confPass: '',
    });

    //этапы восстановления - по умолчанию первый этап
    const [step,setStep] = useState(1);

    //прослушивание событий ввода
    const handleEmail = (event) => {
        setEmail(event);
    };
    const handleCodeEmail = (e) => {
        setCodeEmail(e);
    };
    const handlePass = (e)=>{
        setPassword(prevState => ({
            ...prevState,
            pass: e
        }))
    }
    const handleConfPass = (e)=>{
        setPassword(prevState => ({
            ...prevState,
            confPass: e
        }))
    }

    //прослушивает последний ввод пароля, если оба пороля совпадают (сам пароль и подтверддение пароля)
    //то последняя кнопка разблокирывается иначе нет возмодности отправить форму
    useEffect(() => {
        if (password.pass === password.confPass) {
            setDisableFinish(false)
        }else{
            setDisableFinish(true)
        }
    },[password]);

    //прослушивание загрузки, пока идет загрузка внутреннее содержимое не доступно
    //показывается индикатор того что идет загрузка
    useEffect(() => {
        if (isLoading) {
            toast.loading();
        }else{
            toast.remove();
        }
    },[isLoading]);

    //прослушивание каждого этапа, в зависимости от того какой этап, данные уходят на разные пути
    const handleNextStep = async (e)=>{
        e.preventDefault();
        setIsLoading(true)
        setStep(prevState => prevState + 1);
        let res = step === 1 ? await api.forgetEmail(email).then(r => {
                setIsLoading(false);
                return r;
            }) :
            await api.forgetCode(codeEmail).then(r => {
                setIsLoading(false);
                return r;
            });
        console.log(res)
    }

    //прослушивание кнопки отмены (возврата на предидущий шаг)
    const handlePrevStep = (e)=>{
        e.preventDefault();
        setStep(prevState => prevState - 1);
    }

    //прослушивание финальной кнопки для отправки данных пользователя
    //само восставновление пароля
    const handleSubmitNewPass = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await api.forgeRefreshPass(password).then(r=>{
            setIsLoading(false);
            history.push('/login');
        });
    };

    //динамичная подмена данных для компонента Input в зависимости от этапа восстановления
    const place = step === 1 ? 'Введите ваш Email ...' : step ===2? 'Введите пароль из письма на почте ...'
        : 'Создайте новый пароль';
    const type = step === 1 ? 'email' : step ===2? 'text': 'password';
    const val = step === 1 ? email : step ===2? codeEmail: 'password';
    const setVal = step === 1 ? handleEmail : handleCodeEmail ;


    return (
        <React.Fragment>
            <Toaster position={'top-center'} toastOptions={
                {style: {
                        margin: '40px',
                        background: '#363636',
                        color: '#fff',
                        zIndex: 1,
                    }
                }
            }/>
            {!isLoading &&
            <form className={'auth'}>
                <h4>{place}</h4>
                <Steps step={step}/>
                {step < 3 ?
                    <Input value={val} setValue={setVal} type={type}/> :
                    <>
                        <Input type={'password'} value={password.pass} placeholder={'Введите новый пароль'}
                               setValue={handlePass}/>
                        <Input type={'password'} value={password.confPass} placeholder={'Повторите новый пароль'}
                               setValue={handleConfPass}/>
                    </>
                }
                <button onClick={handlePrevStep} disabled={step <= 1}
                        className={'auth__btn'}>Prev Step
                </button>
                {step < 3 ?
                    <button onClick={handleNextStep} className={'auth__btn'}>Next Step</button>
                    :
                    <button onClick={handleSubmitNewPass} disabled={disableFinish} className={'auth__btn'}>Finish</button>
                }
            </form>
            }
        </React.Fragment>
    );
}