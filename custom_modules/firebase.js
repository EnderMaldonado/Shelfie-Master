const firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyC9ZuJwtpwmyWwmGScqWI0TjGxLp6V6v44",
  authDomain: "macao-9e9e2.firebaseapp.com",
  databaseURL: "https://macao-9e9e2.firebaseio.com",
  projectId: "macao-9e9e2",
  storageBucket: "macao-9e9e2.appspot.com",
  messagingSenderId: "237510003786",
  appId: "1:237510003786:web:f0ec7f70ad57ad1fa1eab3",
  measurementId: "G-G4GJFLDEEC"
}

module.exports = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
