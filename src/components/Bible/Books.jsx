import React, { useContext } from 'react'
import ApplicationContext from '../../context/application/applicationContext';
import Book from './Book'
export default function Bible(props) {
    const applicationContext = useContext(ApplicationContext);
    const { books, selectBook, currentBook } = applicationContext; 


    return (
        <div className="books">
            {books.map((item, i)=><Book currentBook = {currentBook} name={item.name} selectBook = {selectBook} index = {i}/>)}

        </div>
      
        
    )
}
