import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBKOY2jq3Fs5DSkaZEFj1R-yow2JLQ4os4",
    authDomain: "wineapp-dd642.firebaseapp.com",
    projectId: "wineapp-dd642",
    storageBucket: "wineapp-dd642.appspot.com",
    messagingSenderId: "829878053442",
    appId: "1:829878053442:web:57c0dca2146c46c442dbdb",
    measurementId: "G-9F84Y788H6"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
