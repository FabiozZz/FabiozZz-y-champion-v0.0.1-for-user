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


function App() {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector(state=>state.user.isAuth);
    const history = useHistory()
    const [loadCount,setLoadCount] = useState(0);
    useEffect(()=>{
        if (loading) {
        }else{
        }
    },[loading])
    // useEffect(() => {
    //     if(!isAuth) {
    //
    //         (async () => {
    //         console.log('go response');
    //         setLoading(true);
    //         // let accessToken = localStorage.getItem("token");
    //         if (localStorage.getItem('refresh_token')) {
    //             console.log('есть токен')
    //             try {
    //                 const user = await api.autoLog();
    //                 console.log('have request', user)
    //                 if (await user) {
    //                     setLoading(false);
    //
    //                     dispatch(userLogIn(user));
    //                 }else{
    //                     setLoading(false);
    //                 }
    //
    //             } catch (error) {
    //                 setLoading(false)
    //                 dispatch(userLogOut());
    //                 console.error(error);
    //                 history.push('/login');
    //             }
    //         }else{
    //             console.log('нет токена')
    //             setLoadCount(false)
    //             console.log(1)
    //         }
    //     })();
    //     }else{
    //         return ()=>{}
    //     }
    // }, [isAuth]);
    return (
        <BrowserRouter>
            <div className={'app'}>
                <Navbar/>
                <div className="wrap">
                    <Switch>
                        {!isAuth ?
                            <>
                                <Route exact path={'/login'} render={() => <Login/>}/>
                                <Route exact path={'/registration'} render={() => <Registration/>}/>
                            </>:
                            <>
                                <Route exact path={'/'} render={()=><Home/>}/>
                            </>
                        }
                        <Route render={()=><h1>нет такой страницы</h1>}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
