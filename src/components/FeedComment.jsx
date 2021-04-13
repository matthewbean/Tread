import React from 'react'

export default function FeedComment({ verse, chapter, translation, user, text, date, photoURL, book, passage }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
}
    return (
        <div className="feed-comment comment">
            <div className="user text-small">{user}</div>
            <div className="photo"><img src={photoURL} alt="User photo"/></div>
            <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className="passage highlight">"{passage}"<div className="text-small highlight">-{book} {chapter}:{verse} {translation && translation.toUpperCase()}</div></div>
            <div className="text text-small">{text}</div>

  
        </div>
        
    )
}
