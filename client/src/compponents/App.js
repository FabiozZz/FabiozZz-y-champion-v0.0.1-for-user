import React from 'react'
import {BrowserRouter} from "react-router-dom";
import { useSelector} from "react-redux";
import {Route, Switch} from "react-router";
import {Navbar} from "./navbar/Navbar";
import {Login} from "./auth/Login";
import {Registration} from "./auth/Registration";
import './app.css';
import {Home} from "./Home";


function App() {
    const isAuth = useSelector(state=>state.user.isAuth);

    return (
        <BrowserRouter>
            <div className={'app'}>
                <Navbar/>
                <div className="wrap">
                    {!isAuth &&
                    <Switch>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/registration'} render={() => <Registration/>}/>
                        <Route exact path={'/'} render={()=><Home/>}/>

                    </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
