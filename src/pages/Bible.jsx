import React, { useContext, useState, useEffect } from 'react'
import ApplicationContext from '../context/application/applicationContext'
import Sidebar from '../components/Bible/SideBar';
import Select from '../components/Bible/Select'

import firebase from '../firebase'
import AlertContext from '../context/alert/alertContext';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container';

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NoteIcon from '@material-ui/icons/Note';

import SettingsContext from '../context/settings/settingsContext';
import Loading from '../components/routing/Loading';
import Dashboard from '../components/Dashboard';

export default function Bible(props) {
    const applicationContext = useContext(ApplicationContext);
    const { loading, user, clearBibleData, loadUserComments, books, BibleData, currentBook, currentChapter, loadChapter, selectBook, selectChapter, loadComments} = applicationContext; 
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext;
        const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;


    const [drawerState, setDrawerState] = useState(false)

    const toggleDrawer = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setDrawerState(!drawerState);
    };
    

    const [bookmarkState, setBookmarkState] = useState(false)

    let db = firebase.firestore();
    const auth = firebase.auth()

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
        })
    }

    const [commentState, setstate] = useState({
        verse: "",
        comment: "",
        edit: false
    })

    useEffect(() => {
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
            
            if (VIPs.length > 0) {
                const unsubscribe = db.collection("comments")
                .where("book", "==", BibleData.verses[0].book_name)
                .where("chapter", "==", BibleData.verses[0].chapter)
                .where("UUID", "in", VIPs)
                .orderBy("verse")
                .orderBy("post_date", "desc")
                .limit(15)
                .onSnapshot((querySnapshot) => {
                    let comments = []
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        let item = doc.data()
                        item.id = doc.id
                        comments.push(item);
                    })
                    loadComments(comments)
                }, (error) => {
                    console.log(error)
                    setAlert("An error has occurred, please try reloading the page.")
                })
                
                return unsubscribe
            }
            
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
        if(BibleData){
        let Unsubscribe = getComments()
        let UnsubscribeUser = getUserComments()
        let UnsubscribeBookmarks = getBookmarks()
        return () =>{
            if (Unsubscribe) {
                Unsubscribe();   
            }
            
            UnsubscribeUser();
            UnsubscribeBookmarks();
        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
        <Dashboard alwaysHide/>
    
        {BibleData? 
        (
        <>
        <Container>
        <div className="Biblenav">
        <IconButton onClick ={clearBibleData} aria-label ='Return to Chapter Select'><MenuBookIcon fontSize ='large' /></IconButton>
        {bookmarkState?

            <IconButton onClick ={deleteBookmark} className = 'clear-button' aria-label="remove bookmark" ><BookmarkIcon fontSize ='large'/></IconButton>
    :
            <IconButton onClick ={addBookmark} className = 'clear-button' aria-label="bookmark chapter" ><BookmarkBorderIcon fontSize ='large'/></IconButton>
        }
        <Hidden mdUp>
                <IconButton  onClick={(e) =>toggleDrawer(e)}><NoteIcon fontSize ='large'/></IconButton>
        </Hidden>
        </div>
       
        <div className="Biblereader">
            <div className="Biblemain">
                <h1 className = 'mbottom h3 Bibletitle'>
                    <div>
                {BibleData.reference !=="Genesis 1" && <IconButton aria-label="Go to Previous Chapter" onClick ={handlePreviousClick}><ArrowBackIosIcon /></IconButton>}
                </div>
                <div className="reference">
                {BibleData.reference}
                </div>
                <div>
                {BibleData.reference !=="Revelation 22" && <IconButton aria-label="Go to Next Chapter" onClick ={handleNextClick}><ArrowForwardIosIcon>Go to next chapter</ArrowForwardIosIcon></IconButton>}
                </div>
                </h1>
                <div className="reader">
                { BibleData.verses.map((item)=><p style = {{fontSize: `${settings.fontsize}px`}} className = {settings.font}><span className = {"verse" + (item.verse === commentState.verse? ' verse-active': '')} key={`${item.book_id}${item.chapter}${item.verse}`} onClick = { (e) =>{toggleDrawer(e); verseClick(item.verse)}}><sup>{item.verse} </sup>{item.text}</span></p>)}
                </div>
                <small>{BibleData.translation_name}</small>
                </div>
                
                <Hidden mdUp>

        <Drawer anchor='right' open={drawerState} onClose={(e) =>toggleDrawer(e)}>
            <Sidebar  darkmode ={settings.darkmode} toggleEdit ={toggleEdit} edit= {commentState.edit} clearFields = {clearFields} handleChange = {handleChange} state = {commentState}/>
        </Drawer>
        </Hidden>
        <Hidden smDown>
        <Sidebar  darkmode ={settings.darkmode} toggleEdit ={toggleEdit} edit= {commentState.edit} clearFields = {clearFields} handleChange = {handleChange} state = {commentState}/>
        </Hidden>
        
        </div>
        </Container>
        </>
        ):
        (<Select />)}
        </>
        
    )   
}
