import React from 'react'
import { Link } from 'react-router-dom'

export default function Vip({ name, photoURL, UUID }) {
    

    return (
        <Link to ={`/user/${UUID}`} className="follow follow-list-item">
            
            <img src={photoURL} alt="profile" className="profilepicture"/>
            <h4 className ='text-small'>{name}</h4>
        </Link>
    )
}