import React, { useContext, useEffect } from 'react';

import FeedComment from '../components/FeedComment';




import ApplicationContext from '../context/application/applicationContext';
import Loading from '../components/routing/Loading';
import Dashboard from '../components/Dashboard';




export default function Home() {
    

    const applicationContext = useContext(ApplicationContext)
    const {  loadFeed, feed, user, loading, setLoading, clearFeed } = applicationContext
    
    useEffect(() => {
        setLoading( true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        function grabFeed(ids){
            
            if (user!== "unknown"){
                loadFeed(ids)
            }
            
        }
        if (!user.feed_follows || user.feed_follows.length<=0){
            setLoading(false)
        } else {
            grabFeed(user.feed_follows)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    

    

    return (  
        loading? <Loading />:
        <div className="homepage"> 
           <Dashboard />
                {feed &&
                <section className="main">
                    {feed && feed.map((item, i)=><FeedComment key = {i} recentReplies = {item.recent_replies} translation ={item.translation} chapter ={item.chapter} photoURL = {item.photoURL} book = {item.book} passage ={item.passage} verse= {item.verse} user = {item.handle} date = {item.post_date} text = {item.text} />)}
                </section>}
        </div>
        
        
    )
}
