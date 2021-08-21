import React from 'react'
import firebase from '../../firebase'
import Button from '../Button'
import trash from '../../icons/trash-2.svg'


const db = firebase.firestore()
export default function Reply({ edit, owned, parentid, user, text, date, photoURL, id }) {
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
}




const deleteReply = ()=>{
    
    var comment = db.collection("comments").doc(parentid);
    var reply = db.collection('replies').doc(id)

return db.runTransaction((transaction) => {

return transaction.get(comment).then((doc) => {
    
    if (!doc.exists) {
        // eslint-disable-next-line
        throw 'Document does not exist'
    }
    transaction.delete(reply)
    
    let newRecentReplies = doc.data().recent_replies.filter((item)=>item.id !== id)

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
            <div className="photo"><img src={photoURL} alt="User"/></div>
            <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
            <div className="text text-small">{text}</div>
            <div className="comment-icons">
            
            </div>
            {owned && <Button onPress={()=>deleteReply()} className= {"edit warning fab"+( edit? '':' cliped')} type="submit" ><img src={trash} alt="" srcset=""/></Button>}
        </div>
    )
}