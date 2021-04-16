import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router";

export const Home = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    if (!isAuth){
        return <Redirect to={'/login'}/>
    }
    return (
        <div>
          Вы вошли
        </div>
    );
};