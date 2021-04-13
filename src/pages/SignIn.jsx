import React from 'react'
import { useHistory } from 'react-router-dom'


import firebase from '../firebase';

import { StyledFirebaseAuth } from 'react-firebaseui'


var db = firebase.firestore();
const auth =firebase.auth();




export default function Signin(props) {
  const history = useHistory()

  const loginSuccess = (auth)=>{
  
    const { photoURL, displayName, uid } = auth;
    if (!photoURL) {
      auth.updateProfile({
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/biblewithfriends-a6ea4.appspot.com/o/profle%20image.png?alt=media&token=0738c27f-153c-45e5-8d6b-57b066426b19'
      })
    }
    
    db.collection("users").doc(uid).get().then((doc) => {
    if (doc.exists) {
      history.push('/')
    } else {
      console.log( displayName)
        // doc.data() will be undefined in this case
        db.collection("users").doc(uid).set({
            name: displayName,
            photoURL: photoURL || "https://firebasestorage.googleapis.com/v0/b/biblewithfriends-a6ea4.appspot.com/o/profle%20image.png?alt=media&token=0738c27f-153c-45e5-8d6b-57b066426b19",
            VIP: [],
            followers: 0,
            search: displayName.toLowerCase()
        })
        .then(()=>{
          history.push('/')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    }).catch((error) => {
    console.log("Error getting document:", error);
    });
    
    }

    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: (auth) => {
            loginSuccess(auth.user)
              return false
          }
        },
        
        
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
  
      ]
    };





    return (

        <div className = "sign-in">
        <h1>Bible With Friends</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </div>
    )
}
