import React from 'react';
import { Link }from 'react-router-dom'


import firebase from '../firebase'
const db = firebase.firestore();
const auth =  firebase.auth();
export default function Result({ photoURL, name, id }) {


    return (

         <Link to = {`/user/${id}`} className="result">
             <img className ='userphoto' src={photoURL} alt="user photo"/>
             <div className="username">{name}</div>
         </Link>   
       
    )
}
