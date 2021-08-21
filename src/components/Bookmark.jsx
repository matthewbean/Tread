import React from 'react';
import { Link } from 'react-router-dom';



import BookmarkIcon from '@material-ui/icons/Bookmark';



export default function Bookmark({darkmode, loadChapter, setLoading, edit, deleteBookmark, book, chapter, date, id }) {

const loadBookmark = ()=>{
    setLoading( true)
    loadChapter(`${book}${chapter}`)
}
    let postdate;
if( date){
    postdate = new Date(date.toDate())
}else{
    postdate = new Date()
}

    return (
        <div className="comment-replies">
            <Link to ='/Bible' onClick = {loadBookmark} className="comment bookmark">
                <div className="photo bookmark-photo"><BookmarkIcon fontSize = 'large' /></div>
                <div className="date text-small">{date && `${ postdate.getMonth() +1}/${ postdate.getDate()}/${ postdate.getFullYear()}` }</div>
                <div className='verse h4'>{book}: {chapter}</div>
                {/* <Button onPress={()=>deleteBookmark(id)} className= {"edit warning fab"+( edit? '':' cliped')} type="submit" ><img src={trash} alt="delete"/></Button> */}
            </Link>
        </div>
    )
}