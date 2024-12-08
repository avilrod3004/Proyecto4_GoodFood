import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Iniciar sesión en Firebase.
 *
 * @param {Object} credentials - Objeto que contiene las credenciales del usuario.
 * @param {string} credentials.email - Correo electrónico del usuario.
 * @param {string} credentials.password - Contraseña del usuario.
 * @returns {Promise<UserCredential>} La promesa de la autenticación del usuario.
 */
export const login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Registrar un nuevo usuario en Firebase.
 *
 * @param {Object} credentials - Objeto que contiene las credenciales del usuario.
 * @param {string} credentials.email - Correo electrónico del usuario.
 * @param {string} credentials.password - Contraseña del usuario.
 * @returns {Promise<UserCredential>} La promesa del registro del usuario.
 */
export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * Cerrar sesión en Firebase.
 *
 * @returns {Promise<void>} La promesa de cierre de sesión del usuario.
 */
export const logOut = () => signOut(auth);

/**
 * Guardar o actualizar los datos del usuario en Firestore.
 *
 * @param {Object} user - Objeto con los datos del usuario a guardar.
 * @param {string} user.uid - El ID único del usuario.
 * @param {string} [user.userName] - El nombre de usuario del usuario.
 * @param {string} [user.picture] - URL de la imagen de perfil del usuario.
 * @param {string} [user.biography] - Biografía del usuario.
 * @param {string} [user.website] - Sitio web del usuario.
 * @param {string} [user.socialAccount1] - Primera cuenta social del usuario.
 * @param {string} [user.socialAccount2] - Segunda cuenta social del usuario.
 * @param {string} [user.socialAccount3] - Tercera cuenta social del usuario.
 * @param {string} [user.name] - Nombre del usuario.
 * @param {string} [user.lastName] - Apellido del usuario.
 * @param {string} [user.phone] - Teléfono del usuario.
 * @param {Array} [user.favoriteRecipes] - Lista de recetas favoritas del usuario.
 * @returns {Promise<void>} La promesa de la operación de guardar o actualizar los datos del usuario.
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
 * Obtener los datos del usuario desde Firestore.
 *
 * @param {string} uid - UID del usuario para buscar los datos en Firestore.
 * @returns {Promise<Object|null>} Los datos del usuario o `null` si no existen.
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
