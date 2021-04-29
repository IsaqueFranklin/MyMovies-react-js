import firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import React from 'react';

const firebaseConfig = {
  
};
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();