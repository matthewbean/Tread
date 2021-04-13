import firebase from 'firebase'
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWfosjD0EqjATEg5afgvmYHFOjqOW-qUM",
  authDomain: "biblewithfriends-a6ea4.firebaseapp.com",
  projectId: "biblewithfriends-a6ea4",
  storageBucket: "biblewithfriends-a6ea4.appspot.com",
  messagingSenderId: "1071615815540",
  appId: "1:1071615815540:web:862aa428407ea770578621",
  measurementId: "G-EB4V6B2S9G"
};
firebase.initializeApp(firebaseConfig);

export default firebase;