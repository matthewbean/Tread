import React, { useReducer } from 'react';

import{
    SET_SETTINGS

} from '../types'
import SettingsReducer from './SettingsReducer';
import SettingsContext from './settingsContext'

const AlertState = props=>{


        const initialState = {
            darkmode: false,
            font: "'Poppins', sans-serif",
            fontsize: 16
        };
    
   
    const [state, dispatch] = useReducer(SettingsReducer, initialState);

//set settings
const setSettings = (newState)=>{
    dispatch({type: SET_SETTINGS, payload: newState})
}


    
    return (
        <SettingsContext.Provider 
            value = {{
                settings: state,
                setSettings
            }}   
            >
            
            {props.children}
        </SettingsContext.Provider>
    )

};

export default AlertState;