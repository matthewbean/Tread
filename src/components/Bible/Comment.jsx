import React, { useEffect, useState } from 'react'
import Button from '../Button'
import trash from '../../icons/trash-2.svg'
import Reply from './Reply'
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton'
import firebase from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import ButtonMaterial from '@material-ui/core/Button'

const db = firebase.firestore()
const auth = firebase.auth()
export default function Comment({ edit, currentUser, owned, deleteComment, recentReplies, currentVerse, verse, user, text, date, photoURL, id }) {

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
        setstate({...state, commentsLoaded: 10})
    }

useEffect(() => {
    // side effects
    setstate({...state, replies: recentReplies.slice(Math.max(recentReplies.length - state.commentsLoaded, 0))})
        // cleanup
    return () => {
        
    }
}, [recentReplies, state.commentsLoaded])

    const handleChange = (e)=>{
        
        setstate({...state, [e.target.name]: e.target.value})
    }
    const submitReply = ()=>{
        let newid =uuidv4()
        let postedDate=firebase.firestore.Timestamp.now()
        const { photoURL, displayName, uid } = currentUser
        let documentData = {
            UUID: uid,
            handle: displayName,
            photoURL: photoURL,
            parent_comment: id,
            text: state.replyText,
            post_date: postedDate
        }
        var comment = db.collection("comments").doc(id);
        var reply = db.collection('replies').doc(newid)


return db.runTransaction((transaction) => {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(comment).then((doc) => {
        
        if (!doc.exists) {
            throw "Document does not exist!";
        }
        transaction.set(reply, documentData)
        documentData.id = newid;
        let newRecentReplies = doc.data().recent_replies
        newRecentReplies = [...newRecentReplies, documentData]
        //set the length of the array to a maximum of 10
        if (newRecentReplies.length>10) {
            newRecentReplies.shift()
        }
        transaction.update(comment, {
            recent_replies: newRecentReplies
        })
    });
}).then(() => {
    setstate({...state, replyText: ''})
    console.log("Transaction successfully committed!");
}).catch((error) => {
    console.log("Transaction failed: ", error);
});
    }





    return (
        <>
        <div className="comment-replies">
        <div className="comment">
            <div className="user">{user}</div>
            <div className="photo"><img src={photoURL} alt="User photo"/></div>
            <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className={"verse text-small"+ (currentVerse === verse? ' highlight': '')}>Verse: {verse}</div>
            <div className="text text-small">{text}</div>
            {owned && <Button onPress={()=>deleteComment(id)} className= {"edit warning fab"+( edit? '':' cliped')} type="submit" ><img src={trash} alt="" srcset=""/></Button>}
        </div>
        {state.replies.length > 0 &&<div className="replies">
            {state.replies.map((item)=><Reply parentid = {id} owned= {item.UUID === currentUser.uid} edit={edit} deleteComment={deleteComment} user={item.handle} text={item.text} date={item.post_date} photoURL={item.photoURL} id={item.id} />)}
        </div>}
        <ButtonMaterial size="small" color="secondary" onClick={loadMoreComments}>See More Comments</ButtonMaterial>
        <div class="form__group field reply-field">
        <textarea className = 'form__field replyText' name="replyText" id="replyText" value ={state.replyText} onChange= {(e)=>handleChange(e)}></textarea>       
                
                <label htmlFor="name" class="form__label">Reply:</label>
                <IconButton onClick ={submitReply}><ReplyIcon /></IconButton>
            </div>
        <div className="">
        
        
        
        </div>

        </div>
        </>
    )
}
