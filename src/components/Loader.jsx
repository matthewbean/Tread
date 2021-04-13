import React, { useContext, useEffect } from 'react';
import firebase from '../firebase';
import ApplicationContext from '../context/application/applicationContext'
import SettingsContext from '../context/settings/settingsContext';
const auth = firebase.auth();
const db = firebase.firestore();
export default function Loader(props) {
    const applicationContext = useContext(ApplicationContext)
    const{ loggedIn, setLoggedIn, setUser } = applicationContext;

    const settingsContext = useContext(SettingsContext)
    const{ settings, setSettings } = settingsContext;


    const loadUser = ()=>{
        
        const unsubscribe = db.collection('users')
        .doc(auth.currentUser.uid)
        .onSnapshot((querySnapshot) => {
            setUser(querySnapshot.data())
        }, (error) => {
            console.log(error)
            console.log("An error has occurred, please try reloading the page.")
        })
        return unsubscribe;
    }
    useEffect(() => {
        let root=document.documentElement
        
        if (settings.darkmode) {
            root.style.cssText = "  --main: #1BA098; --toolbar: var(--secondary); --secondary: #12151F; --warning: rgb(255, 59, 45); --highlight: #D4F1F4; --background: #051622; --outline: #2a2f3f; --text: #fff; --highlight-text: #DEB992;  --highlight-background: #172935; --card-color: #12151F; --reader-font: 'Poppins', sans-serif; --scroll-bar: #444; --scroll-track: #727272;"
        }else{
            root.style.cssText = ".svg{display: none;} --main: #1BA098; --toolbar: var(--main); --secondary: #fff; --warning: rgb(255, 59, 45); --highlight: #D4F1F4; --background: #fafafa; --outline: #ccc; --text: #000; --highlight-text: #94622c; --highlight-background: #eee; --card-color: #fff; --reader-font: 'Poppins', sans-serif; --scroll-bar: #999; --scroll-track: #fff;"
            
        }

        
        
    }, [settings])
    useEffect(()=>{
        const localsettings = localStorage.getItem('settings')
if (localsettings) {
    console.log(JSON.parse(localsettings))
    setSettings(JSON.parse(localsettings))
}
    }, [])
    useEffect(() => {
        // side effects
        let unsubscribe = null;
        if (loggedIn === true) {
            unsubscribe = loadUser()
        }
    
        // cleanup
        return () => {
            if (unsubscribe) {
            unsubscribe();
            }
        }
    }, [loggedIn])

    return (
        <>
            
        </>
    )
}
