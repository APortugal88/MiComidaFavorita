import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBF3GCMwGxOrE-joRzSXd6sSRWYATQIs4I",
    authDomain: "micomidafavorita-7a16b.firebaseapp.com",
    projectId: "micomidafavorita-7a16b",
    storageBucket: "micomidafavorita-7a16b.firebasestorage.app",
    messagingSenderId: "725186410240",
    appId: "1:725186410240:web:a25ed03a1d83fe6c2ee5e5",
    measurementId: "G-QHR60SK75X"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);