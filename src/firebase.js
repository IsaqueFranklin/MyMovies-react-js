import firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import React from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDjrsmyPExeQCFr33YKF3hLcM-b58RrbsE",
  authDomain: "todoapp-10663.firebaseapp.com",
  databaseURL: "https://todoapp-10663.firebaseio.com",
  projectId: "todoapp-10663",
  storageBucket: "todoapp-10663.appspot.com",
  messagingSenderId: "49063263870",
  appId: "1:49063263870:web:6b7dc6eac9f875fcb1622f"
};
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();