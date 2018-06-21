
import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnUvYNoLak4aUjrUe3S_oIn0xETCAxaWw",
    authDomain: "smoothies-80309.firebaseapp.com",
    databaseURL: "https://smoothies-80309.firebaseio.com",
    projectId: "smoothies-80309",
    storageBucket: "smoothies-80309.appspot.com",
    messagingSenderId: "991841321777"
  };
  const firbaseApp = firebase.initializeApp(config);
//   to get rid of time stamp error in latest version of firebase we need to use this code
firebase.firestore().settings({timestampsInSnapshots: true})
//   export firestore database

export default firbaseApp.firestore()