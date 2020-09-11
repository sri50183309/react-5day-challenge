import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBjwhMguAJIE7EmFJs2ZPOJ_b0_mSMD-34",
    authDomain: "challenge-3fe5b.firebaseapp.com",
    databaseURL: "https://challenge-3fe5b.firebaseio.com",
    projectId: "challenge-3fe5b",
    storageBucket: "challenge-3fe5b.appspot.com",
    messagingSenderId: "415228986784",
    appId: "1:415228986784:web:94fbb7808904833a5dd0c5"
  };

  //initialize firebase app here 
  const firebaseapp = firebase.initializeApp(firebaseConfig);

  //initialize database
  const db = firebaseapp.firestore();
  //gives variable to handle all the sign in 
  const auth = firebase.auth();

  //need to use both of above 2 outside of this js
  export {db, auth}