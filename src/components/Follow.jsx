import React from 'react'
import { Link } from 'react-router-dom'

export default function Follow({ name, photoURL, UUID, handleClick }) {
    

    return (
        <Link to = {`/user/${UUID}`} onClick = {(e) =>handleClick(e)} className="follow">
            <img src={photoURL} alt="profile photo" className="profilepicture"/>
            <h4>{name}</h4>
        </Link>
    )
}
