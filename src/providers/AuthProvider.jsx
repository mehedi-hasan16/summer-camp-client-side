import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app)
const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //password create user  
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //password login

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout 

    const LogOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //google login 
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    //current user loader
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            //get and set token
            // if (currentUser) {
            //     axios.post('http://localhost:5000/jwt', { email: currentUser.email })
            //         .then(data => {
            //             localStorage.setItem('access-token', data.data.token)
            //         })
            // } else {
            //     localStorage.removeItem('access-token')
            // }



            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }

    }, [])

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const authInfo = {
        user,
        loading,
        googleSignIn,
        createUser,
        signIn,
        LogOut,
        updateUserProfile
    }




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;