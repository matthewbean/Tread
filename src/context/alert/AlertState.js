import React, { useReducer } from 'react';
import {v1 as uuid} from "uuid"; 
import AlertContext from './alertContext';
import alertReducer from './AlertReducer';
import{
    SET_ALERT,
    REMOVE_ALERT,
    CLEAR_ALERTS

} from '../types'

const AlertState = props=>{
    const initialState = [];
    const [state, dispatch] = useReducer(alertReducer, initialState);

//set alert
    const setAlert = (msg, type, timeout = 5000)=>{
            const id = uuid();
            dispatch({
                type:SET_ALERT,
                payload: { msg, type, id }
            });
            console.log(msg);

    setTimeout(()=> dispatch({type: REMOVE_ALERT, payload:id}), timeout)
    }   

    const clearAlerts = ()=>{dispatch({type: CLEAR_ALERTS})}
    return (
        <AlertContext.Provider 
            value = {{
                alerts: state,
                setAlert,
                clearAlerts,
            }}   
            >
            
            {props.children}
        </AlertContext.Provider>
    )

};

export default AlertState;