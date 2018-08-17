import firebase from 'firebase'
export const appName = 'images-collection';

export const firebaseConfig = {
    apiKey: "AIzaSyAEs8PEW8PSbr5Vy1KK9l77jx1z4z7L9QE",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "1084492079479"
};

firebase.initializeApp(firebaseConfig);