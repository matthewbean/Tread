import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../context/alert/alertContext';
import ApplicationContext from '../context/application/applicationContext';
import firebase  from '../firebase';

import Follow from "../components/Follow";
import { Redirect } from 'react-router';
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
            console.log( false)
            let duplicate =true;
            user.VIP.forEach((item)=>{
                if( item.id == newVIP.id){
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
            VIP: user.VIP.filter((item)=> item.id != VIP)
        })
        } 
    }

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


    useEffect(() => {
        loadFollows();
    }, [])
    

    return (
        <>
        <Dashboard />
        <section className="main">
        <h1 className ='h3'>Follows</h1>
        <div className="toggle">
            <label htmlFor="edit-VIP">Edit Favorites list: </label>
            <label class="switch"  >
                <input name ='edit-VIP' value={state} onClick={(e) =>handleChange(e)}  type="checkbox" />
                <span class="slider round"></span>
            </label>
        </div>

        <div className = "follows">
            <div className="selected">
                <h2 className ='h4'>Favorites List:</h2>
                {user && user.VIP && user.VIP.map((item)=> <Follow handleClick = {(e) =>removeVIP( e, item.id)}  name ={item.name} photoURL = {item.photoURL} UUID = {item.id}></Follow>) }
            </div>
            <div className="notselected">
                <h2 className ='h4'>Full Follow List:</h2>
                {follows &&  follows.map((item)=><Follow item = {item} handleClick = {(e) =>addVIP(e, item)} name ={item.name} photoURL = {item.photoURL} UUID = {item.id} />)}
            </div>
            
        </div>
        </section>

        </>
    )
}
