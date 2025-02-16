// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD83IhMvd9OlD8x3RqkuOp7Fk7WNqM-ynw",
  authDomain: "inventory-management-e3474.firebaseapp.com",
  projectId: "inventory-management-e3474",
  storageBucket: "inventory-management-e3474.firebasestorage.app",
  messagingSenderId: "297552023528",
  appId: "1:297552023528:web:aa8aaa3bb8456693ebde5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
export { db,auth};