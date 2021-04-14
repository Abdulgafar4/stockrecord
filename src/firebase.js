// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXPuCZfRsLsl-AEZibkUwSgUp9-XMaJPg",
  authDomain: "admin-db1b2.firebaseapp.com",
  projectId: "admin-db1b2",
  storageBucket: "admin-db1b2.appspot.com",
  messagingSenderId: "221055391305",
  appId: "1:221055391305:web:88fc40f17e6dc5ef77d198",
  measurementId: "G-X3BQMHY41R",
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;
