import React, { useContext, useEffect, useState }  from 'react';
import { Link, useHistory }  from 'react-router-dom';
import ApplicationContext from '../../context/application/applicationContext'
import arrowright from '../../icons/arrow-right-circle.svg'
import Button from '../Button';
import firebase from '../../firebase';


const auth = firebase.auth();
const db = firebase.firestore();
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
    }, [])
    const shown = false;
    const logout = ()=>{
        auth.signOut()
        setLoggedIn(false)
    }

    return (
        <nav>
            <ul>
                <li className="search">
                <form onSubmit = {onSubmit}>
                            <input type="text" className="" value = {search} onChange = { handleChange } placeholder="Search" name="search"  required />
                            <Button className ='inline clear-button' onPress={()=>0}  type="submit" >
                                <img src={arrowright} alt="submit button"/>
                            </Button>
                </form>
                    
                    </li>
                <li className="link"><Link to='/'>Home</Link></li>
                <li className="link"><Link to='/about'>About</Link></li>
                { loggedIn  && <li className="link"><Link to='/signin' onClick={logout}>Signout</Link></li>}   
   
            </ul> 
        </nav>
    )
}
