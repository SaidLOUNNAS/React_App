import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyCFIuw9abkXsDH185BgJWXJYhsL8yIqE-4",
    authDomain: "test-73046.firebaseapp.com",
    databaseURL: "https://test-73046.firebaseio.com",
    projectId: "test-73046",
    storageBucket: "test-73046.appspot.com",
    messagingSenderId: "522716945011",
    appId: "1:522716945011:web:05462f06bacea78461a806",
    measurementId: "G-V3MJVXGVDE"
};


firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;