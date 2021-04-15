import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import firebase from '../../firebase';
import applicationReducer from './ApplicationReducer';
import ApplicationContext from './applicationContext';
import AlertContext from '../alert/alertContext';
import {
    SELECT_BOOK,
    LOAD_CHAPTER,
    LOAD_FEED,
    LOAD_COMMENTS,
    SELECT_CHAPTER,
    LOADING_TRUE,
    LOADING_FALSE,
    SET_LOGGEDIN,
    LOAD_USER_COMMENTS,
    SET_USER,
    SET_FOLLOWS,
    ADD_VIP,
    REMOVE_VIP,
    CLEAR_BIBLE_DATA
} from '../types'

const website = 'https://bible-api.com/';
const auth = firebase.auth();
const db = firebase.firestore();

const ApplicationState = props =>{

const initialState = {
    books:[{name :'Genesis', chapters:50},
        {name :'Exodus', chapters:40},
        {name :'Leviticus',chapters:27},
        {name: 'Numbers', chapters:36},
        {name : 'Deuteronomy', chapters:34},
        {name :'Joshua', chapters:24},
        {name :'Judges', chapters:21},
        {name :'Ruth', chapters:4},
        {name :'1 Samuel', chapters:31},
        {name :'2 Samuel', chapters:24},
        {name :'1 Kings', chapters: 22},
        {name :'2 Kings', chapters: 25},
        {name :'1 Chronicles', chapters: 29},
        {name :'2 Chronicles', chapters: 36},
        {name :'Ezra', chapters: 10},
        {name :'Nehemiah', chapters: 13},
        {name :'Esther', chapters: 10},
        {name :'Job', chapters: 42},
        {name :'Psalms', chapters: 150},
        {name :'Proverbs', chapters:31},
        {name :'Ecclesiastes', chapters: 12},
        {name :'Song of Solomon', chapters: 8},
        {name :'Isaiah', chapters: 66},
        {name :'Jeremiah', chapters: 52},
        {name :'Lamentations', chapters: 5},
        {name :'Ezekiel', chapters: 48},
        {name :'Daniel', chapters: 12},
        {name :'Hosea', chapters: 14},
        {name :'Joel', chapters: 3},
        {name :'Amos', chapters: 9}, 
        {name :'Obadiah', chapters: 1},
        {name :'Jonah', chapters: 4},
        {name :'Micah', chapters: 7},
        {name :'Nahum', chapters: 3},
        {name :'Habakkuk', chapters: 3},
        {name :'Zephaniah', chapters: 3},
        {name :'Haggai', chapters: 2},
        {name :'Zechariah', chapters: 14},
        {name :'Malachi', chapters: 4},
        {name:'Matthew', chapters: 28},
        {name: 'Mark', chapters:16},
        {name: 'Luke', chapters:24},
        {name: 'John', chapters:21},
        {name: 'Acts', chapters:28},
        {name: 'Romans', chapters:16},
        {name: '1 Corinthians', chapters:16},
        {name: '2 Corinthians', chapters:13},
        {name: 'Galatians', chapters:6}, 
        {name: 'Ephesians', chapters:6},
        {name: 'Philippians', chapters:4},
        {name: 'Colossians', chapters:4},
        {name: '1 Thessalonians', chapters:5},
        {name: '2 Thessalonians', chapters:4},
        {name: '1 Timothy', chapters:6},
        {name: '2 Timothy', chapters:4},
        {name: 'Titus', chapters:3},
        {name: 'Philemon', chapters:1},
        {name: 'Hebrews', chapters:13},
        {name: 'James', chapters:5},
        {name: '1 Peter', chapters:5},
        {name: '2 Peter', chapters:3},
        {name: '1 John', chapters:5},
        {name: '2 John', chapters:1},
        {name: '3 John', chapters:1},
        {name: 'Jude', chapters:1},
        {name: 'Revelation', chapters:22}
        ],
        currentBook: null,
        currentChapter: null,
        BibleData: null,
        feed: null,
        comments: [],
        userComments: [],
        user: 'unknown',
        loading: false,
        loggedIn: "unknown",
        follows: null,
        VIP: null
    };
    const [state, dispatch] = useReducer(applicationReducer, initialState);
  
    //load book
    const selectBook = (index)=>{
        dispatch({type:SELECT_BOOK, payload: index})
    }
    const selectChapter = (index)=>{
        dispatch({type:SELECT_CHAPTER, payload: index})
    }
    //load chapter
    const loadChapter = async ( query) =>{ 
        try{
            const res = await axios.get(`${website}${query}`);
            dispatch({
                type: LOAD_CHAPTER,
                payload: res.data
            });
        }catch(err){
            console.log(err)
        }
    }
    //clear Bible data
    const clearBibleData = ()=>{
        dispatch({type:CLEAR_BIBLE_DATA})
    }
    //Load posts
    const loadFeed =  (id) =>{ 
    try{
        db.collection("comments")
        .where('UUID', '==', id)
        .limit('20')
        .get()
        .then((querySnapshot) => {
            let feed = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                feed.push(doc.data());
            });
           dispatch({type: LOAD_FEED, payload: feed})
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    catch(err){
        console.log(err)
    }
}
    //Load comments
    const loadComments =  (comments) =>{ 
               dispatch({type: LOAD_COMMENTS, payload: comments})
           
    }
    //Load comments
    const loadUserComments =  (comments) =>{ 
        dispatch({type: LOAD_USER_COMMENTS, payload: comments})
    
    }
    //Post comment
    const submitComment = (translation, passage, comment, book, chapter, verse, displayName, uid, photoURL) =>{
        
        db.collection("comments").doc().set({
            translation: translation,
            passage: passage,
            book: book,
            text: comment,
            chapter: chapter,
            verse: verse,
            handle: displayName, 
            UUID:uid, 
            photoURL: photoURL,
            post_date: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    const setLoading = (value)=>{
        if(value){
            dispatch({ type:LOADING_TRUE})
        }else{
            dispatch({type: LOADING_FALSE})
        }
    }
    const setLoggedIn = (value)=>{
        dispatch({type: SET_LOGGEDIN, payload: value})
    }
    //set follows
    const setFollows = (followers)=>{
        dispatch({type: SET_FOLLOWS, payload: followers})
    }
    //set user
    const setUser = (user)=>{
        dispatch({type: SET_USER, payload: user})    
    }
   
    //add VIP
    const addVIP = (VIP)=>{
        let duplicate =true;
        state.VIP.forEach((item)=>{
            if( item.UUID == VIP.UUID){
                duplicate = false;
            }
        })
        if(duplicate){
        dispatch({type: ADD_VIP, payload: VIP})
        }
    }
    //remove VIP
    const removeVIP = (VIP)=>{
        dispatch({type: REMOVE_VIP, payload: VIP})
    }
    //submit VIP
    const submitVIP = () =>{
        console.log(state.VIP)
        db.collection("users").doc(auth.currentUser.uid).update({
            VIP: state.VIP
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
   
    return(
        <ApplicationContext.Provider
        value = {{
            books: state.books,
            currentBook: state.currentBook,
            currentChapter: state.currentChapter,
            BibleData: state.BibleData,
            feed: state.feed,
            comments: state.comments,
            userComments: state.userComments,
            loading: state.loading,
            loggedIn: state.loggedIn,
            follows: state.follows,
            VIP: state.VIP,
            user: state.user,
            loadChapter,
            clearBibleData,
            selectBook,
            loadFeed,
            setUser,
            loadComments,
            loadUserComments,
            selectChapter,
            submitComment,
            setLoading,
            setLoggedIn,
            setFollows,
            addVIP,
            removeVIP,
            submitVIP
        }}>
            {props.children}
        </ApplicationContext.Provider>

        
    )

}



export default ApplicationState
