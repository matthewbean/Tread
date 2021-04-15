import React from 'react'
import Button from '../Button'
import trash from '../../icons/trash-2.svg'

export default function Comment({ edit, deleteComment, currentVerse, verse, user, text, date, photoURL, id }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
}

    return (
        
        <div className="comment">
            <div className="user">{user}</div>
            <Button onPress={()=>deleteComment(id)} className= {"edit warning fab"+( edit? '':' cliped')} type="submit" ><img src={trash} alt="" srcset=""/></Button>
            <div className="photo"><img src={photoURL} alt="User photo"/></div>
            <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className={"verse text-small"+ (currentVerse === verse? ' highlight': '')}>Verse: {verse}</div>
            <div className="text text-small">{text}</div>
        </div>
        
    )
}
