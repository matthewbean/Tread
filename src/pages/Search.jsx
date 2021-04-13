import React, { useContext, useEffect, useState } from 'react';
import ApplicationContext from '../context/application/applicationContext';

import Result from '../components/Result'
import firebase from '../firebase'
import Loading from '../components/routing/Loading';
import Dashboard from '../components/Dashboard';
export default function Search({ match }) {
    const { params } = match
    const applicationContext = useContext(ApplicationContext)
    const { loading, setLoading } = applicationContext;
    const [state, setstate] = useState({
        results: null
    })
    const { results } = state;

    const db = firebase.firestore();
    useEffect(() => {
        setLoading( true)
        db.collection('users')
        .where('search', '>=', params.id.toLowerCase()).where('search', '<=', params.id.toLowerCase() + '\uf8ff')
        .get()
        .then((querySnapshot) => {
            let users = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let item = doc.data()
                item.id = doc.id
                users.push(item);
                setLoading( false)
            })
            setstate({...state, results: users})
        }, (error) => {
            console.log(error)
            // setAlert("An error has occurred, please try reloading the page.")
        })
        
    }, [params.id])

    return (
        <>{loading? <Loading />:(
            <>
            <Dashboard />
        <section className = 'main'>
            <h1>Results</h1>
            { results && results.map((item)=><Result id = {item.id} photoURL ={item.photoURL} name ={item.name} />)}
        </section>
        </>)}
            
        </>
    )
}
