import React from 'react';
import { Link }from 'react-router-dom'


export default function Result({ photoURL, name, id }) {


    return (

         <Link to = {`/user/${id}`} className="result">
             <img className ='userphoto' src={photoURL} alt="user"/>
             <div className="username">{name}</div>
         </Link>   
       
    )
}
