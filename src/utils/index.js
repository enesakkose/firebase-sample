import store from '../store'
import { login } from '../store/auth'
import { auth } from '../firebase'

export const setUserData = () => {
    store.dispatch(login({
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            emailVerified: auth.currentUser.emailVerified,
            photoURL: auth.currentUser.photoURL,
            uid: auth.currentUser.uid
    }))
}