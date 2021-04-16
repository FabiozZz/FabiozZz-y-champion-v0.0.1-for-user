import React from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {userLogOut} from "../../reducers/userRedicer";

export const Navbar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);
    const routes = [
        {path:'/login',title:'Войти'},
        {path:'/registration',title:'Регистрация'},
    ]
    const handleLogOut = () => {
        dispatch(userLogOut());
    };

    return (
        <div className={'navbar'}>
            <div className={'navbar__logo'}><NavLink to={'/'}>Ychampion</NavLink></div>
            <div className="container">
                <div className={'navbar__links'}>
                    <ul>
                        {
                            isAuth?
                            <li onClick={handleLogOut}>Выход</li>
                            :
                            routes.map((rout,index)=>{
                                return (
                                    <li key={index}><NavLink to={rout.path}>{rout.title}</NavLink></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};