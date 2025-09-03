// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC04uvqD0clTnru6vCxWUI1Ukm638UApSc",
  authDomain: "cartly-7ae17.firebaseapp.com",
  projectId: "cartly-7ae17",
  storageBucket: "cartly-7ae17.firebasestorage.app",
  messagingSenderId: "531901044801",
  appId: "1:531901044801:web:6958c6068e543b8b6f8ec0",
  measurementId: "G-EF25F5WFMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app)
export default app;