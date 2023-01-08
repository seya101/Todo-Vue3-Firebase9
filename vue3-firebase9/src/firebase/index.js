
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD2WdzKZpZ_SaO5WYyOe2iR0xBY_pBsJ8",
    authDomain: "vue3-294ed.firebaseapp.com",
    projectId: "vue3-294ed",
    storageBucket: "vue3-294ed.appspot.com",
    messagingSenderId: "238356566628",
    appId: "1:238356566628:web:2a6171e9b521993a5a0571",
    measurementId: "G-5CDWQ9GNT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { 
    db 
}
