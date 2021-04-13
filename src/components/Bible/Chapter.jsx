import React from 'react'
import {Link} from 'react-router-dom'
export default function Chapter({ chapter, setLoading, loadChapter, selectChapter, bookTitle }) {
    
const handleClick = ( chapter, url)=>{
    setLoading(true)
    selectChapter(chapter)

    loadChapter(url)
}
    return (
        <div className="chapter-container">
        <Link className = 'h4 chapter' to='/Bible' onClick={() =>handleClick( chapter, `${bookTitle}${chapter}`)}>{chapter}</Link>
    </div>
    )
}
