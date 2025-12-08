import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBy7WiqbjZfPq9iS-OpsNFiAEkNODlc-5M',
    authDomain: 'ima-clothing-db.firebaseapp.com',
    projectId: 'ima-clothing-db',
    storageBucket: 'ima-clothing-db.firebasestorage.app',
    messagingSenderId: '692963415380',
    appId: '1:692963415380:web:3fb705057a8654955ee4c1',
};

// Initialize Firebase
const firabaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log('userDocRef', userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
};
