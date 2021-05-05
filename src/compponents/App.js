import React, {useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router";
import {Navbar} from "./navbar/Navbar";
import {Login} from "./auth/Login";
import {Registration} from "./auth/Registration";
import './app.css';
import {Home} from "./Home";
import api from "../exampleApi/APIJWT";
import {userLogIn, userLogOut} from "../actions/userActions";
import {toast, Toaster} from "react-hot-toast";
import {ForgetPassword} from "./auth/forgetPassword/forgetPassword";


function App() {
    const [isloading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector(state=>state.user.isAuth);

    useEffect(()=>{
        if (isloading) {
            toast.loading('Loading ...')
        }else{
            toast.remove();
        }
    },[isloading])
    useEffect(() => {
        if(!isAuth) {
            setIsLoading(true);

            (async () => {
                console.log('go response');
                if (localStorage.getItem('refresh_token')) {
                    console.log('есть токен')
                    try {
                        const user = await api.autoLog();
                        console.log('have request', user)
                        if (await user) {
                            setIsLoading(false);

                            dispatch(userLogIn(user));
                        }else{
                        }
                    } catch (error) {
                        dispatch(userLogOut());
                        console.error(error);
                    }
                }
                setIsLoading(false)
            })();
        }
    }, [isAuth]);
    return (
        <BrowserRouter>
            <Toaster position={'top-center'} toastOptions={
                {
                    style: {
                        margin: '40px',
                        background: '#363636',
                        color: '#fff',
                        zIndex: 1,
                    }
                }
            }/>
            {!isloading&&
            <div className={'app'}>
                <Navbar/>
                <div className="wrap">
                    <Switch>
                        {!isAuth&&
                        <Switch>
                            <Route exact path={'/login'} render={() => <Login/>}/>
                            <Route exact path={'/registration'} render={() => <Registration/>}/>
                            <Route exact path={'/forget'} render={() => <ForgetPassword/>}/>
                        </Switch>
                        }
                        <Route exact path={'/'} render={()=><Home/>}/>
                        <Route exact render={()=><h1>Нет такой страницы, проваливай от седа</h1>}/>
                    </Switch>
                </div>
            </div>
            }
        </BrowserRouter>
    );
};

export default App;
