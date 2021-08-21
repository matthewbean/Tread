import React, { useContext, useEffect, useState }  from 'react';
import { Link, useHistory }  from 'react-router-dom';
import ApplicationContext from '../../context/application/applicationContext'
import SearchIcon from '@material-ui/icons/Search';
import Button from '../Button';
import firebase from '../../firebase';
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const auth = firebase.auth();

export default function Toolbar(props) {
    const [state, setstate] = useState({
        search: ""
    })
    
    const { search } = state;
    const applicationContext = useContext(ApplicationContext)
    const{ loggedIn, setLoggedIn } = applicationContext;

    const history = useHistory()
 
    const handleChange = (e)=>{
        setstate({...state, [e.target.name]: e.target.value})
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        history.push(`/search/${search}`)
    }
    

    useEffect(() => {
        // side effects
        const unsubscribe = auth.onAuthStateChanged(user => {
     
            if (user === null) {
                setLoggedIn(false) 
              }else{
                setLoggedIn(true)
              }
          })
        // cleanup
        return () => {
            unsubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const logout = ()=>{
        auth.signOut()
        setLoggedIn(false)
    }

    return (
        <nav>
            <ul>

                 
            {loggedIn?(
            
            <li className="search">
            <form onSubmit = {onSubmit} className ='search-form'>
                        <input type="search" className="search-bar" value = {search} onChange = { handleChange } placeholder="Search" name="search"  required />
                        <Button className ='inline' onPress={()=>0}  type="submit" >
                            <SearchIcon />
                        </Button>
            </form>
                
                </li>):(<>
                <li className = "justify-left">
                    <h1 className = 'h4'>Bible With Friends</h1>
                </li>
                <li className="link"><Link to='/about'>About</Link></li>
                <li className="link"><Link className = ' button login' to='/'>Login</Link></li>
                </>)
                }

                
                {loggedIn  && <li className="link"><IconButton component = {Link} to='/signin' onClick={logout}><ExitToAppIcon /></IconButton></li>}
                
   
            </ul> 
        </nav>
    )
}
