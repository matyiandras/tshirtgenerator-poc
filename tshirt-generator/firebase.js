// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAABM61JG5u9jMX85G-VFsiapAPbLbXrVk",
  authDomain: "tshirt-generator-poc.firebaseapp.com",
  databaseURL: "https://tshirt-generator-poc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tshirt-generator-poc",
  storageBucket: "tshirt-generator-poc.appspot.com",
  messagingSenderId: "837405133415",
  appId: "1:837405133415:web:c734a294fc4567318c62c2",
  measurementId: "G-MPV554MQCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const storage = getStorage(app);