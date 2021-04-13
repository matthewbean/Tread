import React from 'react';
import { Link } from 'react-router-dom'

export default function Books({index, name, selectBook, currentBook}) {
    

    return (
        
            <button className = {'h4 book' + (index === currentBook?  " book-active": "")} onClick = {()=>selectBook(index)}>{name}</button>
       
    )
}
