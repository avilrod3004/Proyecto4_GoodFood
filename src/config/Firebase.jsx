import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función de login
export const login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// Función de registro
export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

// Función de cerrar sesión
export const logOut = () => signOut(auth);

/**
 * Guardar o actualizar datos del usuario en Firestore.
 * @param {Object} user - Objeto con los datos del usuario.
 * @returns {Promise<void>}
 */
export const saveUserData = async (user) => {
    const userRef = doc(db, "users", user.uid); // Documento del usuario
    await setDoc(
        userRef,
        {
            userName: user.userName || "",
            picture: user.picture || "",
            biography: user.biography || "",
            website: user.website || "",
            socialAccount1: user.socialAccount1 || "",
            socialAccount2: user.socialAccount2 || "",
            socialAccount3: user.socialAccount3 || "",
            name: user.name || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            favoriteRecipes: user.favoriteRecipes || [],
        },
        { merge: true } // Para no sobrescribir datos existentes
    );
};

/**
 * Obtener datos del usuario desde Firestore.
 * @param {string} uid - UID del usuario.
 * @returns {Promise<Object|null>} Datos del usuario o null si no existen.
 */
export const getUserData = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return null;
    }
};
