import React, { useContext } from 'react'
import ApplicationContext from '../../context/application/applicationContext';
import Chapter from './Chapter';
export default function Bible(props) {
    const applicationContext = useContext(ApplicationContext);
    const { currentBook, books, loadChapter, selectChapter, setLoading, loadComments } = applicationContext; 
    let elements = [] 
    if (currentBook !== null) {
        const bookTitle = books[currentBook].name
        for (let i = 0; i < books[currentBook].chapters; i++) {
            elements.push(<Chapter setLoading = {setLoading} loadComments = {loadComments} selectChapter = {selectChapter} bookTitle = {bookTitle} loadChapter = {loadChapter} chapter = {i+1}/>)
            
        }
    }


    return (
        {currentBook} &&<div className="chapters">
            {elements}
        </div>
      
        
    )
}
