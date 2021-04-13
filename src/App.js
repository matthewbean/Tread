import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Bible from './pages/Bible';
import Follows from './pages/Follows';
import Search from './pages/Search';
import Bookmarks from './pages/Bookmarks';
import User from './pages/User';
import Settings from './pages/Settings';

import Loader from './components/Loader';
import Toolbar from './components/routing/Toolbar';
import PrivateRoute from './components/routing/PrivateRoute'
import Alerts from './components/alerts/Alerts';



import ApplicationState from './context/application/ApplicationState';
import SettingsState from './context/settings/SettingsState';
import AlertState from './context/alert/AlertState';







function App() {


  



  return (
    
      <AlertState>
        <SettingsState>
        <ApplicationState>
      <div className="App">
        
       <Router>
       <Toolbar />
        <Alerts />
        <Loader />
      <Switch>
        <PrivateRoute exact path = '/' component = {() => <Home />}/>
        <Route exact path = '/signin' component = {SignIn} />
        <PrivateRoute exact path = '/bible' component = {Bible} />
        <PrivateRoute exact path = '/follows' component = {Follows} />
        <PrivateRoute exact path = '/bookmarks' component = {Bookmarks} />
        <PrivateRoute path = '/search/:id' component = {Search} />
        <PrivateRoute path = '/user/:id' component = {User} />
        <PrivateRoute exact path = '/settings' component = {Settings} />


      </Switch>
      </Router>
    </div>
      </ApplicationState>
      </SettingsState>
    </AlertState>


  );
}

export default App;
