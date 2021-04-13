import React, { useContext, useState, useEffect } from 'react'
import ApplicationContext from '../context/application/applicationContext'
import Sidebar from '../components/Bible/SideBar';
import Select from '../components/Bible/Select'
import Button from '../components/Button'
import firebase from '../firebase'
import AlertContext from '../context/alert/alertContext';

import arrowright from '../icons/arrow-right.svg';
import arrowleft from '../icons/arrow-left.svg';
import bookmark from '../icons/bookmark.svg';
import bookmarkfilled from '../icons/bookmark-filled.svg';
import SettingsContext from '../context/settings/settingsContext';
import Loading from '../components/routing/Loading';

export default function Bible(props) {
    const applicationContext = useContext(ApplicationContext);
    const { loading, setLoading, user, clearBibleData, loadUserComments, books, BibleData, currentBook, currentChapter, loadChapter, selectBook, selectChapter, loadComments} = applicationContext; 
    const alertContext = useContext(AlertContext)
    const { setAlert, clearAlerts } = alertContext;
        const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;

    const [bookmarkState, setBookmarkState] = useState(false)

    let db = firebase.firestore();
    const auth = firebase.auth()
    const getUserComments = () =>{
        const unsubscribe = db.collection("comments")
            .where("book", "==", BibleData.verses[0].book_name)
            .where("chapter", "==", BibleData.verses[0].chapter)
            .where("UUID", "==", auth.currentUser.uid)
            .orderBy("verse")
            .orderBy("post_date", "desc")
            .limit(100)
            .onSnapshot((querySnapshot) => {
                let comments = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let item = doc.data()
                    item.id = doc.id
                    console.log( item)
                    comments.push(item);
                })
                loadUserComments(comments)
            }, (error) => {
                console.log(error)
                setAlert("An error has occurred, please try reloading the page.")
            })
            
            return unsubscribe
        }
  
        
    const getComments = () =>{
        const VIPs = user.VIP.map((item)=> item.id)
        console.log( VIPs)
        const unsubscribe = db.collection("comments")
            .where("book", "==", BibleData.verses[0].book_name)
            .where("chapter", "==", BibleData.verses[0].chapter)
            .where("UUID", "in", VIPs)
            .orderBy("verse")
            .orderBy("post_date", "desc")
            .limit(100)
            .onSnapshot((querySnapshot) => {
                let comments = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let item = doc.data()
                    item.id = doc.id
                    console.log( item)
                    comments.push(item);
                })
                loadComments(comments)
            }, (error) => {
                console.log(error)
                setAlert("An error has occurred, please try reloading the page.")
            })
            
            return unsubscribe
        }
    const getBookmarks = () =>{
        const unsubscribe = 
        db.collection('bookmarks')
        .where('UUID', '==', auth.currentUser.uid)
        .where("book", "==", BibleData.verses[0].book_name)
        .where("chapter", "==", BibleData.verses[0].chapter)
        .onSnapshot((querySnapshot) => {
            let comments = []
            querySnapshot.forEach((doc) => {                
                comments.push(doc.data());
            })
            setBookmarkState(comments.length)
        }, (error) => {
            console.log(error)
            setAlert("An error has occurred, please try reloading the page.")
        })
        return unsubscribe
}
    const addBookmark = () =>{
        db.collection("bookmarks").doc(auth.currentUser.uid+BibleData.verses[0].book_name+BibleData.verses[0].chapter).set({
            book: BibleData.verses[0].book_name,
            chapter: BibleData.verses[0].chapter,
            UUID: auth.currentUser.uid,
            post_date: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    const deleteBookmark = ()=>{
        db.collection('bookmarks')
        .doc(auth.currentUser.uid+BibleData.verses[0].book_name+BibleData.verses[0].chapter)
        .delete()
        .then(()=>{
            console.log('Document Deleted')
        })
    }

    const [commentState, setstate] = useState({
        verse: "",
        comment: "",
        edit: false
    })

    useEffect(() => {
        if(BibleData){
        let Unsubscribe = getComments()
        let UnsubscribeUser = getUserComments()
        let UnsubscribeBookmarks = getBookmarks()
        return () =>{
            Unsubscribe();
            UnsubscribeUser();
            UnsubscribeBookmarks();
        }
        }
    }, [BibleData])


  
    const handleChange = (e)=>{
        setstate({...commentState, [e.target.name]: e.target.value})
    }
    const toggleEdit = ()=>{
        setstate({...commentState, edit: !commentState.edit})
    }
    const clearFields = ()=>{
        setstate({...commentState, verse: "", comment: ""})
    }

    const handleNextClick = ()=>{
        clearFields();
        if( currentChapter < books[currentBook].chapters){
            loadChapter(`${books[currentBook].name}${currentChapter+1}`);
            selectChapter(currentChapter+1);
        }else{
            loadChapter(`${books[currentBook+1].name}1`);
            selectChapter(1);
            selectBook(currentBook+1);

        }
    }
    const handlePreviousClick = ()=>{
        clearFields();
        if( currentChapter > 1){
            loadChapter(`${books[currentBook].name}${currentChapter-1}`);
            selectChapter(currentChapter-1);


        }else{
            loadChapter(`${books[currentBook-1].name}${books[currentBook-1].chapters}`);
            selectChapter(books[currentBook-1].chapters);
            selectBook(currentBook-1);
            

        }
    }
    const verseClick = (verse)=>{
        setstate({...commentState, verse: verse +""})
    }
    if (loading) {
        return <Loading />
    }

    return (
    
        BibleData? 
        (
        <>
        <Button onPress ={clearBibleData}>Chapter Select</Button>
        {bookmarkState?
             <Button className = 'clear-button right' type="button" onPress ={deleteBookmark}>
                <img className={settings.darkmode? '': 'filter-svg'} src={bookmarkfilled} alt="remove bookmark"/>
             </Button> :
            <Button className = 'clear-button right' type="button" onPress ={addBookmark}>
                <img className={settings.darkmode? '': 'filter-svg'} src={bookmark} alt="add bookmark"/>
            </Button>}
        <div className="Biblereader">
            <div className="Biblemain">
                <h1 className = 'mbottom h3 Bibletitle'>
                    <div>
                {BibleData.reference !="Genesis 1" && <button onClick ={handlePreviousClick}><img className={settings.darkmode? '': 'filter-svg'} src = {arrowleft} alt = "previous chapter "/></button>}
                </div>
                <div className="reference">
                {BibleData.reference}
                </div>
                <div>
                {BibleData.reference !="Revelation 22" && <button onClick ={handleNextClick}><img className={settings.darkmode? '': 'filter-svg'} src = {arrowright} alt = "next chapter "/></button>}
                </div>
                </h1>
                <div className="reader">
                { BibleData.verses.map((item)=><p style = {{fontSize: `${settings.fontsize}px`}} className = {settings.font}><span className = {"verse" + (item.verse == commentState.verse? ' verse-active': '')} key={`${item.book_id}${item.chapter}${item.verse}`} onClick = { ()=>{verseClick(item.verse)} }><sup>{item.verse} </sup>{item.text}</span></p>)}
                </div>
                <small>{BibleData.translation_name}</small>
                </div>
            
            <Sidebar darkmode ={settings.darkmode} toggleEdit ={toggleEdit} edit= {commentState.edit} clearFields = {clearFields} handleChange = {handleChange} state = {commentState}/>
        </div>
        </>
        ):
        (<Select />)
        
        
    )   
}
