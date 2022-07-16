// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword,
       signInWithEmailAndPassword, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import{ getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOaZx2TWq8Iwx4nh-HOghNtGZbX6M0r3I",
  authDomain: "shopping-web-db-5584e.firebaseapp.com",
  projectId: "shopping-web-db-5584e",
  storageBucket: "shopping-web-db-5584e.appspot.com",
  messagingSenderId: "803716249548",
  appId: "1:803716249548:web:7c7c47eeb101f342d4cf69"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

const db = new getFirestore();
// add collection and documents
export const addCollectionAndDocuments = async(collectionKey, objectToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) =>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log("done..")
}

// GET CATEGORIES AND DOCUMENTS
export const getCategoriesAndDocuments = async() =>{
  const collectionRef = collection(db,"categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docsSnapshot) =>{
    const {title, items} = docsSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return;
  const userDocRef =  doc(db,"users",userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.exists());

  // if user data does not exist 
  // create/ set the document with data from userAuth in my collection
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })

    }catch(error) {
      
          console.log(error);
    }
  }
  // if user data exists
  // return userDocRef
  return userDocRef;
}
// sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth,email,password);
}

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

 return await signInWithEmailAndPassword(auth,email,password);
}

// sign out user
export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth,callback);
}
