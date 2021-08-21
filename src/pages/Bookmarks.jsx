import React, { useContext, useEffect, useState } from 'react'
import firebase from '../firebase';
import ApplicationContext from '../context/application/applicationContext';
import Bookmark from '../components/Bookmark';
import SettingsContext from '../context/settings/settingsContext';
import Dashboard from '../components/Dashboard';
export default function Bible(props) {

const settingsContext = useContext(SettingsContext)
const{ settings } = settingsContext;

const applicationContext = useContext(ApplicationContext);
const { loadChapter, setLoading } = applicationContext;

    const [bookmarkState, setstate] = useState([])
    let db = firebase.firestore();
    let user = firebase.auth();


    const deleteBookmark = (id)=>{
        db.collection('bookmarks')
        .doc(id)
        .delete()
        .then(()=>{
            console.log('Document Deleted: ' +id)
        })
    }

useEffect(() => {
    // side effects
    const getBookmarks = ()=>{
        const unsubscribe = db.collection('bookmarks')
         .where('UUID', '==', user.currentUser.uid)
         .onSnapshot((querySnapshot) => {
             let bookmarks = []
             querySnapshot.forEach((doc) => {
                 let bookmark = doc.data();
                 bookmark.id = doc.id
                 bookmarks.push(bookmark);
             });
            setstate(bookmarks)
         }, (error) => {
             console.log(error)
         })
         return unsubscribe;
 
     }
    let unsubscribe =  getBookmarks()

    // cleanup
    return () => {
    unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


    return (
        <>
        <Dashboard />
        <section className="main bookmarks">
            {bookmarkState.map((item)=><Bookmark key={item.id} setLoading = {setLoading} darkmode ={settings.darkmode} loadChapter = {loadChapter} edit = {true} deleteBookmark = {deleteBookmark} book = {item.book} chapter = {item.chapter} date = {item.post_date} id = {item.id} />)}
        </section>
        </>
      
        
    )
}
