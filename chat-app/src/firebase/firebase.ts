import { initializeApp } from "firebase/app";
import {computed, onUnmounted, ref} from "vue";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBEtV8rdhW7VbRZwS5PRhwhQY8wOdF9bCI",
    authDomain: "chat-app-1609d.firebaseapp.com",
    projectId: "chat-app-1609d",
    storageBucket: "chat-app-1609d.appspot.com",
    messagingSenderId: "782413661918",
    appId: "1:782413661918:web:e72daa5f4691efe715e44f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export function useAuth() {
    const user = ref(null)
    // @ts-ignore
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
    onUnmounted(unsubscribe)

    const isLogin = computed(() => user.value !== null)

    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithPopup(auth, googleProvider)
    }
    const signOut = () => auth.signOut()

    return { user, isLogin, signIn, signOut }
}