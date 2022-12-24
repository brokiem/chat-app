import { initializeApp } from "firebase/app";
import {computed, watchEffect, ref} from "vue";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { getFirestore, collection, doc, addDoc, deleteDoc, getDocs, serverTimestamp, query, where, limit, orderBy, onSnapshot } from "firebase/firestore";

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
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
    })

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
        const q = query(messagesRef, where("channel", "==", channel), orderBy("createdAt"));

        const messages = ref([]);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // @ts-ignore
            messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsubscribe())
        })

        return messages
    }

    return { sendMessage, subscribeMessages }
}

export function useChannel() {
    const createChannel = async (group: string, title: string, order: number) => {
        await addDoc(collection(db, "channels"), {
            group: group,
            title: title,
            order: order
        });
    }

    const deleteChannel = async (id: string) => {
        await deleteDoc(doc(db, "channels", id));
    }

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
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsubscribe())
        })

        return channels
    }

    return { createChannel, deleteChannel, getChannels, subscribeChannels }
}

export function useGroup() {
    const createGroup = async (owner: string, title: string, iconURL: string) => {
        const doc = await addDoc(collection(db, "groups"), {
            owner: owner,
            title: title,
            iconURL: iconURL,
            createdAt: serverTimestamp()
        });

        await addDoc(collection(db, "channels"), {
            group: doc.id,
            title: "General",
            order: 0
        });
    }

    const getGroups = async () => {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef, orderBy("createdAt"));
        const groupsSnap = await getDocs(q);

        return groupsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }

    const getGroup = async (id: string) => {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef, where("__name__", "==", id));
        const groupsSnap = await getDocs(q);

        return groupsSnap.docs.map((doc) => ({id: doc.id, ...doc.data()}))[0];
    }

    const subscribeGroups = async () => {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef, orderBy("createdAt"));

        const groups = ref([]);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // @ts-ignore
            groups.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsubscribe())
        })

        return groups
    }

    return { createGroup, getGroup, getGroups, subscribeGroups }
}