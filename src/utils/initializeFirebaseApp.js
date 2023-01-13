import { initializeApp } from 'firebase/app';

const initializeFirebaseApp = () => {
  return initializeApp({
    apiKey: 'AIzaSyDsiaj15ZalumkuGNVSsQfkBa8XkJJYU9c',
    authDomain: 'my-task-98719.firebaseapp.com',
    projectId: 'my-task-98719',
    storageBucket: 'my-task-98719.appspot.com',
    messagingSenderId: '347968163561',
    appId: '1:347968163561:web:0834cfd2f2ddefdddb2a78',
  });
};

export default initializeFirebaseApp;
