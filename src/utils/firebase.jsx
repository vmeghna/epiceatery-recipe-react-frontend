import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBED7IxbpE8iIRdosTtJChFdC4yeSvBebM",
  authDomain: "epiceatery-5e696.firebaseapp.com",
  projectId: "epiceatery-5e696",
  storageBucket: "epiceatery-5e696.appspot.com",
  messagingSenderId: "309274298394",
  appId: "1:309274298394:web:d195ba8b0d307b9c00e9a3",
};

const app = initializeApp(firebaseConfig);

//Authentication
const appAuth = getAuth(app);
//Sign in with Google

const googleProvider = new GoogleAuthProvider();

const signInWithGooglePopup = async () =>
  await signInWithPopup(appAuth, googleProvider);

//for User normal SignUP and Sign In using Email and password
//For Sign Up
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(appAuth, email, password);
};
//For Sign In
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(appAuth, email, password);
};

//firestore DB
const appDB = getFirestore(app);
//here additionalInformation ={} this is a optional argument
const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(appDB, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating User", err.message);
    }
  }
  return userDocRef;
};

const storageDB = getStorage(app);

export {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  appDB,
  app,
  storageDB,
};
