import React, { useContext } from 'react'
import ApplicationContext from '../../context/application/applicationContext'
import AlertContext from '../../context/alert/alertContext'
import Comment from './Comment';
import Button from '../Button';
import firebase from '../../firebase';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import IconButton from '@material-ui/core/IconButton'
import { useTransition, animated } from "react-spring";

export default function Sidebar({ darkmode, clearFields, handleChange, state, toggleEdit }) {
    const applicationContext = useContext(ApplicationContext)
    const { comments, userComments, BibleData, submitComment } = applicationContext
    const { comment, verse, edit } = state;
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext;
    

    const auth =firebase.auth();
    const db = firebase.firestore();
    
        //Extract data from user
    const { currentUser } = auth;
    const { photoURL, displayName, uid } = currentUser

    const deleteComment = (id)=>{
        
        db.collection("comments").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
    const onSubmit = (e)=>{
        e.preventDefault()
        if(comment !== "" && verse > 0 && verse <= BibleData.verses.length){
        submitComment(BibleData.translation_id, BibleData.verses[verse-1].text, comment, BibleData.verses[0].book_name, BibleData.verses[0].chapter, verse, displayName, uid, photoURL)
        clearFields()
    }else{
        setAlert("This is a warning", "alert")
    }
    }
   
    const transitions = useTransition(userComments, item => item.id, {
        enter: { opacity: 1, maxHeight: '3000px', overflow: 'hidden'},
        leave: item => async (next, cancel) => {
            await next({opacity: 0, overflow: 'hidden'})
            await next({maxHeight: '0px', overflow: 'hidden'})
          },
        from: {opacity: 0, maxHeight: '0px', overflow: 'hidden'}
        })
    
    
    

    return (
        
        <div className="sidebar">
            <h2 className = "h3 mbottom">Comments:</h2>
            
            <div className="sidebarmain">
            <h2 className ='h5 mbottom'>Add your own comment:</h2>
            <form onSubmit = {onSubmit} className="addComment relative">
            <IconButton className = 'clear-button right' aria-label ='clear commentary area' type="button" onClick ={clearFields}>
                <BackspaceOutlinedIcon />
            </IconButton>
            <div class="form__group field">
                <input type="number" class="highlight form__field" value = {verse} onChange = { handleChange } placeholder="verse number" name="verse"  required />
                <label htmlFor="name" class="form__label">Verse Number:</label>
            </div>
            <div class="form__group field">
                <textarea  class="form__field" placeholder = "Add your own comment" name = "comment" value = {comment} onChange = { handleChange }  required />
                <label htmlFor="name" class="form__label">Comment:</label>
            </div>
                

                   
                <Button onPress={()=>0} className= "submit h5" type="submit" >Submit</Button>
            </form>
            <div className="edit-container">
                <h3 className ='h5 mbottom'>Your Comments:</h3>
                {userComments.length > 0 && <Button onPress={toggleEdit} className= "absolute-right" type="submit" >edit</Button>}
                {transitions && transitions.map(({ item, props, key }) =><animated.div key={key} style={props}><Comment recentReplies = {item.recent_replies} currentUser ={auth.currentUser} owned ={true} edit ={edit} id ={item.id} deleteComment ={deleteComment} replies ={item.replies} currentVerse = {verse} photoURL = {item.photoURL} verse= {item.verse} user = {item.handle} date = {item.post_date} text = {item.text} /></animated.div>)}
            </div>
            <h3 className = 'h5 mbottom'>Other's Comments:</h3>
            {comments && comments.map((item)=><Comment key={item.id} id = {item.id} recentReplies = {item.recent_replies} owned ={false} photoURL = {item.photoURL} currentUser ={auth.currentUser} verse= {item.verse} user = {item.handle} date = {item.post_date} text = {item.text} />)}
            </div>
        </div>
    )
}
