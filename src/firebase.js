import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, query, where } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification, updatePassword } from 'firebase/auth'
import toast from "react-hot-toast";
import store from './store'
import { setTodos } from "./store/todos";
import { login as handleLogin, logout as handleLogout } from "./store/auth";
import { setUserData } from "./utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID
};





const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app)

export const register = async(email, password) => {
   try{
    const { user } = await createUserWithEmailAndPassword(auth,email,password)

    return user
   } catch(error) {
     toast.error(error.message)
   } 
}

export const login = async(email, password) => {
  try{
   const { user } = await signInWithEmailAndPassword(auth,email,password)

   return user
  } catch(error) {
    toast.error(error.message)
  } 
}

export const logout = async() => {
  try{
    await signOut(auth)

   return true
  } catch(error) {
    toast.error(error.message)
  } 
}

export const update = async(data) => {
  try {
    await updateProfile(auth.currentUser, data)
    toast.success('Profil güncellendi')
    return true
  } catch(error) {
    toast.error(error.message)
  }
}

export const resetPassword = async(password) => {
  try {
    await updatePassword(auth.currentUser, password)
    toast.success('şifre güncellendi')
    return true
  } catch(error) {
    toast.error(error.message)
  }
}

export const emailVerified = async() => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`doğrulama mailiniz ${auth.currentUser.email} adresine gönderildi`)
  } catch(error) {
    toast.error(error.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if(user) {
    setUserData()


    onSnapshot(query(collection(db, 'todos'), where('uid', '==', auth.currentUser.uid)), (doc) => {
      store.dispatch(
        setTodos(doc.docs.reduce((todos, todo) => [...todos, {...todo.data(), id: todo.id}], []))
      )
  });

  } else {
    store.dispatch(handleLogout())
  }
})

export const addTodo = async(data) => {
  try{
    const result = await addDoc(collection(db, 'todos'), data)
    return result.id
 } catch(error) {
  toast.error(error.message)
 } 
  
  
  
}

export const deleteTodo = async(id) => {
  try{
     await deleteDoc(doc(db, 'todos', id))
  } catch(error) {
    toast.error(error.message)
  }
  
 
}



export default app