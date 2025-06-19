// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAqj-3jqLIIZVV4aIQzXelIsBmaPTR1Rr4",
  authDomain: "my-36c84.firebaseapp.com",
  projectId: "my-36c84",
  storageBucket: "my-36c84.firebasestorage.app",
  messagingSenderId: "1790671539",
  appId: "1:1790671539:web:0752f0fb56ee955a480ec6",
  measurementId: "G-VVWF9VKEPK",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
