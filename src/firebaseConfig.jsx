import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD652gEGvlmr4q5vNq1pphQ--WEA_4XJdQ',
    authDomain: 'orderplus-d5b21.firebaseapp.com',
    projectId: 'orderplus-d5b21',
    storageBucket: 'orderplus-d5b21.appspot.com',
    messagingSenderId: '629461451548',
    appId: '1:629461451548:web:e674a1f872c3bdf50970d9',
};

const app = initializeApp(firebaseConfig);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
};

export const firestore = getFirestore(app);
