import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';


import follows from '../icons/users.svg';
import bookopen from '../icons/book-open.svg';
import bookmark from '../icons/bookmark.svg';
import settingsicon from '../icons/sliders.svg';

import Vip from '../components/VIP'


import{useAuthState } from 'react-firebase-hooks/auth';
import ApplicationContext from '../context/application/applicationContext';
import SettingsContext from '../context/settings/settingsContext';
const auth = firebase.auth()
export default function Dashboard(props) {
    const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;

    const applicationContext = useContext(ApplicationContext)
    const {  loadFeed, feed, user, loading, setLoading } = applicationContext
    const [userDetails] = useAuthState(auth)

    return (
        <div className="dashboard">
                {userDetails &&<div className="profile">
                    <h1 className="h3">{userDetails.displayName}</h1>
                    <img className = "profilepicture" src={userDetails.photoURL} alt=""/>
                    </div>}
                    <ul className="mtop mbottom home-links">
                        <li><Link className = "home-link" to = "/follows"><img className={settings.darkmode? '': 'filter-svg'} src={follows} alt="" /><h4>Follows</h4></Link></li>
                        <li><Link className = "home-link" to = "/bible"><img className={settings.darkmode? '': 'filter-svg'} src={bookopen} alt="" /><h4>Bible</h4></Link></li>
                        <li><Link className = "home-link" to = "/bookmarks"><img className={settings.darkmode? '': 'filter-svg'} src={bookmark} alt="" /><h4>Bookmarks</h4></Link></li>
                        <li><Link className = "home-link" to = "/settings"><img className={settings.darkmode? '': 'filter-svg'} src={settingsicon} alt="" /><h4>Settings</h4></Link></li>
                    </ul>
                    <h2 className="h4 mtop">Favorites:</h2>
                    <section className="VIP-section">
                        {user && user.VIP && user.VIP.map((item)=> <Vip name = {item.name} photoURL = {item.photoURL} UUID = {item.id} />)}                    
                    </section>
                
            </div>
    )
}
