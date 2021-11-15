import { useEffect } from 'react'
import { getUserDetail, uploadUser } from '../../model/User'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const Verify = () => {
    const submit = async () => {
        try {
            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                var email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }
                const result = await firebase.auth().signInWithEmailLink(email, window.location.href)
                window.localStorage.removeItem('emailForSignIn');
                const isUser = await getUserDetail(result.user.uid)
                console.log(isUser, result.user)
                if (!isUser.exists) await uploadUser(result.user)
                alert('Email Verfied')

            }
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        submit()
    }, [])

    return (
        <div className="fs-4" style={{
            minHeight: '82.3vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center"
        }}>
            <span className="spinner-border fs-6" role="status">
                <span className="visually-hidden">Loading...</span>
            </span>&nbsp; Verifying your email...
        </div>
    )
}
