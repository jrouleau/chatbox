import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import * as dbHooks from 'react-firebase-hooks/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const db = Object.assign(firebase.database(), dbHooks);
export const firestore = firebase.firestore();
export const functions = firebase.functions();

if (window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 9000);
  firestore.useEmulator('localhost', 8080);
  functions.useEmulator('localhost', 5001);
}

if (process.env.NODE_ENV === 'development') {
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  global.firebase = firebase;
  global.auth = auth;
  global.db = db;
  global.firestore = firestore;
  global.functions = functions;
}

export default firebase;
