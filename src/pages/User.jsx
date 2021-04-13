import React, { useEffect, useState, useContext } from 'react';

import firebase from '../firebase';
import FeedComment from '../components/FeedComment'
import ApplicationContext from '../context/application/applicationContext';

import Button from '../components/Button'

import follow from '../icons/user-plus.svg'
import unfollow from '../icons/user-minus.svg';
import Vip from '../components/VIP';
import SettingsContext from '../context/settings/settingsContext';
import Loading from '../components/routing/Loading';



const db = firebase.firestore();
const auth = firebase.auth();
export default function User({ match }) {
    const { params } = match
    const applicationContext = useContext(ApplicationContext);
    const { loadFeed, feed, user, loading, setLoading } = applicationContext;
    const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;

    const [state, setstate] = useState({
        userDetails: null,
        
    })
    const [followedstate, setfollowedstate] = useState(
        null
    )
    const { userDetails } = state;
    
    
    

    const getUserData = ()=>{
        setLoading( true)
        db.collection('users')
        .doc(params.id)
        .get()
        .then((item)=>{
            setstate({...state, userDetails: item.data()})
            loadFeed(item.id)
 
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }
    const getFollowed = ()=>{
        let unsubscribe = db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('follows')
        .doc(params.id)
        .onSnapshot((snapshot)=>{
           setfollowedstate(snapshot.exists)
        })
        
        return unsubscribe;
    }


    const removeFollow = ()=>{

        db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('follows')
        .doc(params.id)
        .delete()
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        db.collection('users').doc(auth.currentUser.uid).update({
            VIP: user.VIP.filter((item)=> item.id != params.id)
        })

    } 

    const addFollow = ()=>{
        
        db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('follows')
        .doc(params.id)
        .set({
            name: userDetails.name,
            photoURL: userDetails.photoURL
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }

    



    useEffect(() => {
        // side effects
        getUserData()
        const unsubscribe = getFollowed()

  
        // cleanup
        return () => {
            unsubscribe()
        }
    }, [params.id])
    if (loading) {
        return <Loading />
    }
    return (
        <div className="homepage"> 
        <div className="dashboard">
            {userDetails &&<div className="profile">
                <h1 className="h4">{userDetails.name}</h1>
                <img className = "profilepicture" src={userDetails.photoURL} alt=""/>
                </div>}
                {followedstate != null && followedstate? (
            <Button className = {'h4 clear-button home-link user-link ' + (!settings.darkmode?'filter-button':'')} type="button" onPress ={removeFollow}>
                 <img className = {settings.darkmode? '': 'filter-svg'} src={unfollow} alt=""/> Unfollow
        </Button>):(<Button className = {'h4 clear-button home-link user-link ' + (!settings.darkmode?'filter-button':'')} type="button" onPress ={addFollow}>
                 <img className = {settings.darkmode? '': 'filter-svg'} src={follow} alt=""/> Follow
             </Button>)}
                <h2 className="h3">VIPs</h2>
                <section className="VIP-section">
                    {userDetails && userDetails.VIP.map((item)=> <Vip name = {item.name} photoURL = {item.photoURL} UUID = {item.id} />)}                    
                </section>
            
             

            
        </div>
            {feed &&
            <section className="main">
                {feed && feed.map((item)=><FeedComment translation ={item.translation} chapter ={item.chapter} photoURL = {item.photoURL} book = {item.book} passage ={item.passage} verse= {item.verse} user = {item.handle} date = {item.post_date} text = {item.text} />)}
            </section>}
    </div>
    )
}
