import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqwHoQvuay-6EcV56LlvW7CYsnx-b5Lrg",
  authDomain: "uts-lab-3f13b.firebaseapp.com",
  projectId: "uts-lab-3f13b",
  storageBucket: "uts-lab-3f13b.appspot.com",
  messagingSenderId: "919193469489",
  appId: "1:919193469489:web:0ac5f6026986fa64d54b10",
  measurementId: "G-68R386QRGG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
