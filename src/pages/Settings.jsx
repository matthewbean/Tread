import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import firebase from '../firebase'
import SettingsContext from '../context/settings/settingsContext';
import Dashboard from '../components/Dashboard';
import Button from '@material-ui/core/Button';


export default function Settings(props) {
    const settingsContext = useContext(SettingsContext);
    const { settings, setSettings } = settingsContext
    
    const history = useHistory();
    
    const auth = firebase.auth()
    const db = firebase.firestore()

    const [state, setstate] = useState(settingsContext.settings)

    const onSubmit = (e)=>{
        e.preventDefault()

        localStorage.setItem('settings', JSON.stringify(state))
        setSettings( state)
        history.push('/')


    
    }

    const onChange = e=> setstate({ ...state, [e.target.name]: e.target.value });
    const onRadioChange = e=> setstate({ ...state, [e.target.name]: e.target.checked });
    return (
        <>
        <Dashboard />
        <section className="main">
            <h1 className='h3'>Settings</h1>
                <form onSubmit = {(e)=>onSubmit(e)} className="container">
                <div className="toggle">
                    <label htmlFor="darkmode">Dark Mode: </label>
                    <label className="switch"  >
                        <input name ='darkmode' checked={state.darkmode} onChange={(e) =>onRadioChange(e)}  type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="font-select">
                <label htmlFor="font">Bible Font: </label>
                <select id="fonts" name = 'font' value ={state.font} onChange={(e)=>onChange(e)}>
                    <option value="default">Default</option>
                    <option value="georgia">Georgia</option>
                    <option value="verdana">Verdana</option>
                    <option value="monospace">Monospace</option>
                </select>
                </div>
                <label htmlFor="fontSize">Font Size: </label>
                    <input type="range" min="16" max="50" id="myRange" name ='fontsize' value ={state.fontsize} onChange={(e)=>onChange(e)}></input>
                
                <div style = {{fontSize: `${state.fontsize}px`}} className="font-preview"> 
                <p className={state.font}>In the beginning, God created the heavens and the earth.</p></div>
                
                <div className="submission">
                <Button className ='warning h4' variant="contained" color='secondary' component={Link} to={'/'}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>


                
                </div>
                </form>
            </section>
        </>
    )
}
