import React, { useState } from 'react'
import firebase from '../../firebase'
import Button from '../Button'
import trash from '../../icons/trash-2.svg'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'

const db = firebase.firestore()
export default function Reply({ owned, parentid, user, text, date, photoURL, id }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
}
const [edit, setedit] = useState({
    toggled: false,
    value: {text}
})

const toggleEdit= ()=>{
    setedit({...edit, toggled: !edit.toggled})
}


const deleteReply = ()=>{
    setedit({...edit, toggled: false})
    var comment = db.collection("comments").doc(parentid);
    var reply = db.collection('replies').doc(id)

return db.runTransaction((transaction) => {

return transaction.get(comment).then((doc) => {
    
    if (!doc.exists) {
        throw "Document does not exist!";
    }
    transaction.delete(reply)
    
    let newRecentReplies = doc.data().recent_replies.filter((item)=>item.id != id)

    transaction.update(comment, {
        recent_replies: newRecentReplies
    })
});
}).then(() => {
    
console.log("Transaction successfully committed!");
}).catch((error) => {
console.log("Transaction failed: ", error);
});
}



    return (
        
        
        <div className="reply comment">
            <div className="user">{user}</div>
            <div className="photo"><img src={photoURL} alt="User photo"/></div>
            <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className="text text-small">{text}</div>
            <div className="comment-icons">
            {owned && <IconButton onClick ={toggleEdit} aria-label ='Edit Comment'> <EditIcon fontSize ='small' /></IconButton>}
            </div>
            {owned && <Button onPress={()=>deleteReply()} className= {"edit warning fab"+( edit.toggled? '':' cliped')} type="submit" ><img src={trash} alt="" srcset=""/></Button>}
        </div>
    )
}