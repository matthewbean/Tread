import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

import firebase from '../firebase';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import BookIcon from '@material-ui/icons/Book';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import TuneIcon from '@material-ui/icons/Tune';

import Vip from '../components/VIP';



import{useAuthState } from 'react-firebase-hooks/auth';
import ApplicationContext from '../context/application/applicationContext';
import SettingsContext from '../context/settings/settingsContext';
const auth = firebase.auth()
export default function Dashboard({ alwaysHide }) {
    const settingsContext = useContext(SettingsContext)
    const{ settings } = settingsContext;

    const applicationContext = useContext(ApplicationContext)
    const {  loadFeed, feed, user, loading, setLoading } = applicationContext
    const [userDetails] = useAuthState(auth)
    




    const [drawerState, setDrawerState] = useState(false)

    const toggleDrawer = () => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setDrawerState(!drawerState);
    };

    if (alwaysHide) {
        return(
            <>
             <Button className = 'top-left' onClick={toggleDrawer()}><MenuIcon/></Button>
        <Drawer anchor='left' open={drawerState} onClose={toggleDrawer()}>
          <div className="dashboard dashboard-drawer">
                {userDetails &&<div className="profile">
                    <h1 className="h3">{userDetails.displayName}</h1>
                    <img className = "profilepicture" src={userDetails.photoURL} alt=""/>
                    </div>}
                    <ul className="mtop mbottom home-links">
                        <li><Link className = "home-link" to = "/"><HomeIcon /><h4>Home</h4></Link></li>
                        <li><Link className = "home-link" to = "/follows"><PeopleIcon /><h4>Follows</h4></Link></li>
                        <li><Link className = "home-link" to = "/bible"><BookIcon /><h4>Bible</h4></Link></li>
                        <li><Link className = "home-link" to = "/bookmarks"><BookmarksIcon /><h4>Bookmarks</h4></Link></li>
                        <li><Link className = "home-link" to = "/settings"><TuneIcon /><h4>Settings</h4></Link></li>
                    </ul>
                    <h2 className="h4 mtop">Favorites:</h2>
                    <section className="VIP-section">
                        {user && user.VIP && user.VIP.map((item)=> <Vip name = {item.name} photoURL = {item.photoURL} UUID = {item.id} />)}                    
                    </section>
                
            </div>
        </Drawer>
            </>
        )
    }
    return (
        <>
        <Hidden mdUp>
        <Button className = 'top-left' onClick={toggleDrawer()}><MenuIcon/></Button>
        <Drawer anchor='left' open={drawerState} onClose={toggleDrawer()}>
          <div className="dashboard dashboard-drawer">
                {userDetails &&<div className="profile">
                    <h1 className="h3">{userDetails.displayName}</h1>
                    <img className = "profilepicture" src={userDetails.photoURL} alt=""/>
                    </div>}
                    <ul className="mtop mbottom home-links">
                        <li><Link className = "home-link" to = "/"><HomeIcon /><h4>Home</h4></Link></li>
                        <li><Link className = "home-link" to = "/follows"><PeopleIcon /><h4>Follows</h4></Link></li>
                        <li><Link className = "home-link" to = "/bible"><BookIcon /><h4>Bible</h4></Link></li>
                        <li><Link className = "home-link" to = "/bookmarks"><BookmarksIcon /><h4>Bookmarks</h4></Link></li>
                        <li><Link className = "home-link" to = "/settings"><TuneIcon /><h4>Settings</h4></Link></li>
                    </ul>
                    <h2 className="h4 mtop">Favorites:</h2>
                    <section className="VIP-section">
                    {user && user.VIP && user.VIP.map((item)=> <Vip name = {item.name} photoURL = {item.photoURL} UUID = {item.id} />)}                    
                    </section>
                
            </div>
        </Drawer>
        </Hidden>
        <Hidden smDown>
        <div className="dashboard">
                {userDetails &&<div className="profile">
                    <h1 className="h3">{userDetails.displayName}</h1>
                    <img className = "profilepicture" src={userDetails.photoURL} alt=""/>
                    </div>}
                    <ul className="mtop mbottom home-links">
                        <li><Link className = "home-link" to = "/"><HomeIcon /><h4>Home</h4></Link></li>
                        <li><Link className = "home-link" to = "/follows"><PeopleIcon /><h4>Follows</h4></Link></li>
                        <li><Link className = "home-link" to = "/bible"><BookIcon /><h4>Bible</h4></Link></li>
                        <li><Link className = "home-link" to = "/bookmarks"><BookmarksIcon /><h4>Bookmarks</h4></Link></li>
                        <li><Link className = "home-link" to = "/settings"><TuneIcon /><h4>Settings</h4></Link></li>
                    </ul>
                    <h2 className="h4 mtop">Favorites:</h2>
                    <section className="VIP-section">
                        {user && user.VIP && user.VIP.map((item)=> <Vip name = {item.name} photoURL = {item.photoURL} UUID = {item.id} />)}                    
                    </section>
                
            </div>
        </Hidden>
        </>
    )
}
