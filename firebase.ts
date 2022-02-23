import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0NSmK0XFdH0dqOvJX7BpvSiDtbGGH-TI",
    authDomain: "chat-assesment.firebaseapp.com",
    projectId: "chat-assesment",
    storageBucket: "chat-assesment.appspot.com",
    messagingSenderId: "156605167613",
    appId: "1:156605167613:web:02850ca1c8b77999c24b94",
    measurementId: "G-0XTQGF1R0W"
};
  

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth };