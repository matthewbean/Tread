import React from 'react';

export default function Books({index, name, selectBook, currentBook}) {
    

    return (
        
            <button className = {'h4 book' + (index === currentBook?  " book-active": "")} onClick = {()=>selectBook(index)}>{name}</button>
       
    )
}
