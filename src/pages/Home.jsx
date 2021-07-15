import React, { useContext, useEffect } from 'react';

import FeedComment from '../components/FeedComment';
import firebase from '../firebase';



import{useAuthState } from 'react-firebase-hooks/auth';
import ApplicationContext from '../context/application/applicationContext';
import SettingsContext from '../context/settings/settingsContext';
import Loading from '../components/routing/Loading';
import Dashboard from '../components/Dashboard';

const auth =firebase.auth();


export default function Home() {
    const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;

    const applicationContext = useContext(ApplicationContext)
    const {  loadFeed, feed, user, loading, setLoading } = applicationContext
    const [userDetails] = useAuthState(auth)

    useEffect(() => {
        setLoading( true)
        loadFeed(userDetails.uid)
    }, [])
    

    return (  
        loading? <Loading />:
        <div className="homepage"> 
           <Dashboard />
                {feed &&
                <section className="main">
                    {feed && feed.map((item)=><FeedComment replies = {item.recent_replies} translation ={item.translation} chapter ={item.chapter} photoURL = {item.photoURL} book = {item.book} passage ={item.passage} verse= {item.verse} user = {item.handle} date = {item.post_date} text = {item.text} />)}
                </section>}
        </div>
        
        
    )
}
