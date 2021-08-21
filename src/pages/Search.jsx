import React, { useContext, useEffect, useState } from 'react';
import ApplicationContext from '../context/application/applicationContext';

import Result from '../components/Result'
import firebase from '../firebase'
import Loading from '../components/routing/Loading';
import Dashboard from '../components/Dashboard';
export default function Search({ match }) {
    const { params } = match
    const applicationContext = useContext(ApplicationContext)
    const { loading } = applicationContext;
    const [state, setstate] = useState({
        results: null
    })
    const { results } = state;

    useEffect(() => {
        const db = firebase.firestore();
        applicationContext.setLoading( true)
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
                applicationContext.setLoading( false)
            })
            setstate({...state, results: users})
        }, (error) => {
            console.log(error)
            
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
