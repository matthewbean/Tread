import React, { useState } from 'react'
import Reply from '../components/Bible/Reply'
import ButtonMaterial from '@material-ui/core/Button'
export default function FeedComment({  recentReplies, verse, chapter, translation, user, text, date, photoURL, book, passage }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
    
}
const [state, setstate] = useState(
    {
        replies:[],
        replyText: '',
        replyActive: true,
        commentsLoaded: 2
        
    }

    )
    const  loadMoreComments = ()=>{
        setstate({...state, commentsLoaded: state.commentsLoaded+5})
    }


    return (
        <div className="comment-replies comment-replies-home">
        <div className="feed-comment comment">
            <div className="user text-small">{user}</div>
            <div className="photo"><img src={photoURL} alt="User"/></div>
            <div className="date text-small">{date && `${postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className="passage highlight">"{passage}"<div className="text-small highlight">-{book} {chapter}:{verse} {translation && translation.toUpperCase()}</div></div>
            <div className="text text-small">{text}</div>
        </div>
        {recentReplies.length > state.commentsLoaded && <ButtonMaterial className = 'load-more' size="small" color="secondary" onClick={loadMoreComments}>See More Comments</ButtonMaterial>}
        {recentReplies && recentReplies.length > 0 &&<div className="replies">
            {recentReplies.map((item, i)=>(i<state.commentsLoaded && <Reply  parentid = {item.id} owned= {false} edit={item.edit} deleteComment={()=>0} user={item.handle} text={item.text} date={item.post_date} photoURL={item.photoURL} id={item.id} />))}
        </div>}
        </div>
        
    )
}
