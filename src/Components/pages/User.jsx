import { useState } from 'react'
import { useParams } from 'react-router-dom'
import firebaseApp from '../../firebase/base';
import 'firebase/auth'

const auth = firebaseApp.auth()

export const User = () => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })
    const { id } = useParams();
    return (
        <h2>you are { currentUser && ( id === currentUser.uid )? "in your own profile": "in another profile"}</h2>
    )
}
