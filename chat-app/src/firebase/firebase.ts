import { initializeApp } from "firebase/app";
import {computed, onUnmounted, ref} from "vue";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { getFirestore, collection, doc, addDoc, getDocs, serverTimestamp, query, where, limit, orderBy, onSnapshot } from "firebase/firestore";

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


const db = getFirestore(app);
export function useMessage() {
    const sendMessage = async (channel: string, uid: string, displayName: string, photoURL: string, message: string) => {
        await addDoc(collection(db, "messages"), {
            channel: channel,
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
            text: message,
            createdAt: serverTimestamp()
        });
    }

    const subscribeMessages = async (channel: string) => {
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, where("channel", "==", channel), orderBy("createdAt"), limit(50));

        const messages = ref([]);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // @ts-ignore
            messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        onUnmounted(unsubscribe)

        return messages
    }

    return { sendMessage, subscribeMessages }
}

export function useChannel() {
    const getChannels = async (group: string) => {
        const channelsRef = collection(db, "channels");
        const q = query(channelsRef, where("group", "==", group), orderBy("order"));
        const channelsSnap = await getDocs(q);

        return channelsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }

    const subscribeChannels = async (group: string) => {
        const channelsRef = collection(db, "channels");
        const q = query(channelsRef, where("group", "==", group), orderBy("order"));

        const channels = ref([]);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // @ts-ignore
            channels.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        onUnmounted(unsubscribe)

        return channels
    }

    return { getChannels, subscribeChannels }
}

export function useGroup() {
    const getGroups = async () => {
        const groupsRef = collection(db, "groups");
        const groupsSnap = await getDocs(groupsRef);

        return groupsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }

    const subscribeGroups = async () => {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef);

        const groups = ref([]);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // @ts-ignore
            groups.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        onUnmounted(unsubscribe)

        return groups
    }

    return { getGroups, subscribeGroups }
}