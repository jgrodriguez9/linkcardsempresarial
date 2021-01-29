import firebase from 'firebase/app';
import 'firebase/auth';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyDfWfrP7cpRZbsUJnIbQzOjrYE6rFI5PH8",
    authDomain: "linkme-0.firebaseapp.com",
    databaseURL: "https://linkme-0.firebaseio.com",
    projectId: "linkme-0",
    storageBucket: "linkme-0.appspot.com",
    messagingSenderId: "620745220226",
    appId: "1:620745220226:web:4dddad658475f9995e549b",
    measurementId: "G-3BBMMC1M4R"
});


//test
// export const app = firebase.initializeApp({
//   apiKey: "AIzaSyAWdLP997Ggw4fLBW8oo-kYrb9DtTyq1Ts",
//   authDomain: "anderson-cf66d.firebaseapp.com",
//   databaseURL: "https://anderson-cf66d.firebaseio.com",
//   projectId: "anderson-cf66d",
//   storageBucket: "anderson-cf66d.appspot.com",
//   messagingSenderId: "768352999767",
//   appId: "1:768352999767:web:5f4a31f45618e0b5308612"
//   });

  
export default app;