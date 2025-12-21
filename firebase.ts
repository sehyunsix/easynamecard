
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, GoogleAIBackend } from 'firebase/ai';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAidwkx7rNnZyeeHNH1yh073AZZ2i2hmZs",
  authDomain: "easynamecard-8b252.firebaseapp.com",
  projectId: "easynamecard-8b252",
  storageBucket: "easynamecard-8b252.firebasestorage.app",
  messagingSenderId: "1061424361682",
  appId: "1:1061424361682:web:3e60f237c441aea8663d0b",
  measurementId: "G-518KJR5DXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const ai = getAI(app, { backend: new GoogleAIBackend() });

export default app;
