
// import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, remove } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmqIyEmhp3-Gw5bpOt_6hP-uXlUliy458",
  authDomain: "invoice-app-react-a9ade.firebaseapp.com",
  databaseURL: "https://invoice-app-react-a9ade-default-rtdb.firebaseio.com",
  projectId: "invoice-app-react-a9ade",
  storageBucket: "invoice-app-react-a9ade.appspot.com",
  messagingSenderId: "207212651788",
  appId: "1:207212651788:web:9ac644c507432426341529"
};

// const db = firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


export  {db, ref, set, update, remove};







