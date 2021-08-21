import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from '../../firebase'
import{useAuthState } from 'react-firebase-hooks/auth';
import ApplicationContext from '../../context/application/applicationContext';
import Loading from './Loading';
const PrivateRoute = ({ component: Component, ...rest}) => {


    const applicationContext = useContext(ApplicationContext)
    const{ loggedIn } = applicationContext;
    const auth =firebase.auth();

    
    const [user] = useAuthState(auth)
    if(loggedIn === "unknown" || user === 'unknown'){
        return(
            <Loading />
        )
    }

    return (
        <Route { ...rest } render = {props =>   loggedIn? (
            <Component {...props} />
        ):(
            <Redirect to='/signin' />
        )} />
    )
};

export default PrivateRoute
