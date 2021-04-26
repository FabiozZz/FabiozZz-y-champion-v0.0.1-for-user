import React from 'react';
import {useSelector} from "react-redux";
import { useHistory} from "react-router";
import api from '../exampleApi/APIJWT';

export const Home = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const token = useSelector(state => state.user.token);
    const history = useHistory();
    if (!isAuth){
        history.push('/login')
    }
    const handleClickOnButton =async ()=>{
        const res = await api.getUsers(token);
        console.log(res);
    }
    return (
        <div>
            <h1>Вы зарегестрированы</h1>
            <button onClick={handleClickOnButton}>Some Text</button>
        </div>
    );
};