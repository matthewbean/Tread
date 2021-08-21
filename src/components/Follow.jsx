import React from 'react'
import { Link } from 'react-router-dom'

export default function Follow({ name, photoURL, UUID, handleClick }) {
    

    return (
        <Link to = {`/user/${UUID}`} onClick = {(e) =>handleClick(e)} className="follow">
            <img src={photoURL} alt="profile" className="profilepicture"/>
            <p>{name}</p>
        </Link>
    )
}
