import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAgHnQn9hkMJvGRwuHEIwAdjLxMFTIWF_o",
    authDomain: "soy-transducer-236303.firebaseapp.com",
    databaseURL: "https://soy-transducer-236303.firebaseio.com",
    projectId: "soy-transducer-236303",
    storageBucket: "soy-transducer-236303.appspot.com",
    messagingSenderId: "890374072270"
};

firebase.initializeApp(config);

export default firebase;