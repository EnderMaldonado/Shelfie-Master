const firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyDeWBLgXOejW1NB8ZI5FGHmlaPFDaToZ0k",
  authDomain: "shelfie-master.firebaseapp.com",
  databaseURL: "https://shelfie-master.firebaseio.com",
  projectId: "shelfie-master",
  storageBucket: "shelfie-master.appspot.com",
  messagingSenderId: "471144772901",
  appId: "1:471144772901:web:3468f3d65bf9a4fb5b96cc",
  measurementId: "G-N7H610XZP9"
}

module.exports = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
