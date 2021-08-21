import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../context/alert/alertContext';
import ApplicationContext from '../context/application/applicationContext';
import firebase  from '../firebase';

import Follow from "../components/Follow";

import Dashboard from '../components/Dashboard';
export default function Follows(props) {
    const applicationContext = useContext(ApplicationContext);
    const alertContext = useContext(AlertContext);
    const { follows, setFollows, user } = applicationContext;
    const { setAlert } = alertContext;
    const auth = firebase.auth()
    const db = firebase.firestore()

    const [state, setstate] = useState(false)

    const handleChange = (e)=>{
        setstate(!state)
    }
    const addVIP = (e,newVIP)=>{
        
        if (state) {
            e.preventDefault()
            let duplicate =true;
            user.VIP.forEach((item)=>{
                if( item.id === newVIP.id){
                    duplicate = false;
                }
            })
            if(duplicate && user.VIP.length < 10){
            db.collection('users').doc(auth.currentUser.uid).update({
                VIP: [...user.VIP, newVIP]
            })
        } 
        }
       
    }

    const removeVIP = (e, VIP)=>{

        if (state) {
           e.preventDefault()
           db.collection('users').doc(auth.currentUser.uid).update({
            VIP: user.VIP.filter((item)=> item.id !== VIP)
        })
        } 
    }




    useEffect(() => {
        const loadFollows = () =>{
            let allfollows = [];
        db.collection('users').doc(auth.currentUser.uid).collection('follows').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => { 
                let item = doc.data()          
                item.id = doc.id
                allfollows.push(item);
            })
            setFollows(allfollows)
        }, (error) => {
            console.log(error)
            setAlert("An error has occurred, please try reloading the page.")
        })
       
    }
        loadFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <div className="container">
        <Dashboard />
        <section className="main">
        <h1 className ='h3'>Follows</h1>
        <div className="toggle">
            <label htmlFor="edit-VIP">Edit Favorites list: </label>
            <label className="switch"  >
                <input name ='edit-VIP' value={state} onClick={(e) =>handleChange(e)}  type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>

        <div className = "follows">
        <h2 className ='h4'>Favorites List:</h2>
            <div className="selected">
                {user && user.VIP && user.VIP.map((item)=> <Follow key={item.id} handleClick = {(e) =>removeVIP( e, item.id)}  name ={item.name} photoURL = {item.photoURL} UUID = {item.id}></Follow>) }
            </div>
            <h2 className ='h4'>Full Follow List:</h2>
            <div className="notselected">
                {follows &&  follows.map((item)=><Follow key={item.id} item = {item} handleClick = {(e) =>addVIP(e, item)} name ={item.name} photoURL = {item.photoURL} UUID = {item.id} />)}
            </div>
            
        </div>
        </section>

        </div>
    )
}
