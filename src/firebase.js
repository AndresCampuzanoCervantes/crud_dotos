import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAczJODmxcPN2Plz1PoQBek_BZs8Ru9WnY",
    authDomain: "crud-fotos-react.firebaseapp.com",
    projectId: "crud-fotos-react",
    storageBucket: "crud-fotos-react.appspot.com",
    messagingSenderId: "739960946424",
    appId: "1:739960946424:web:c4a99d999e8464740b050d"
  };

  firebase.initializeApp(firebaseConfig);

  export {firebase}