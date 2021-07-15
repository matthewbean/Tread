import React from 'react'
import Reply from '../components/Bible/Reply'
export default function FeedComment({ replies, verse, chapter, translation, user, text, date, photoURL, book, passage }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
    
}
    return (
        <div className="comment-replies comment-replies-home">
        <div className="feed-comment comment">
            <div className="user text-small">{user}</div>
            <div className="photo"><img src={photoURL} alt="User photo"/></div>
            <div className="date text-small">{date && `${postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className="passage highlight">"{passage}"<div className="text-small highlight">-{book} {chapter}:{verse} {translation && translation.toUpperCase()}</div></div>
            <div className="text text-small">{text}</div>
        </div>
        {replies.length > 0 &&<div className="replies">
            {replies.map((item)=><Reply parentid = {item.id} owned= {false} edit={item.edit} deleteComment={()=>0} user={item.handle} text={item.text} date={item.post_date} photoURL={item.photoURL} id={item.id} />)}
        </div>}
        </div>
        
    )
}
