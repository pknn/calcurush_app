import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const firebaseConfig = {
  apiKey: 'AIzaSyDzos6i1iF3l27mFtcMweBHFW0T5CbGARg',
  authDomain: 'calcurush.firebaseapp.com',
  databaseURL: 'https://calcurush.firebaseio.com',
  projectId: 'calcurush',
  storageBucket: 'calcurush.appspot.com',
  messagingSenderId: '579546376440',
  appId: '1:579546376440:web:00b7344d6f29402e'
}

firebase.initializeApp(firebaseConfig)
