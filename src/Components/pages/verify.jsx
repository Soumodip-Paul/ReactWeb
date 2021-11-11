import { useEffect } from 'react'
import { getUserDetail, uploadUser } from '../../model/User'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const Verify = () => {
    const submit = async () => {
        try {
            // Confirm the link is a sign-in with email link.
            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                // Additional state parameters can also be passed via URL.
                // This can be used to continue the user's intended action before triggering
                // the sign-in operation.
                // Get the email if available. This should be available if the user completes
                // the flow on the same device where they started it.
                var email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    // User opened the link on a different device. To prevent session fixation
                    // attacks, ask the user to provide the associated email again. For example:
                    email = window.prompt('Please provide your email for confirmation');
                }
                // The client SDK will parse the code from the link for you.
                const result = await firebase.auth().signInWithEmailLink(email, window.location.href)
                window.localStorage.removeItem('emailForSignIn');
                alert('Email Verfied')
                const isUser = await getUserDetail(result.user.uid)
                if (!isUser) await uploadUser(result.user)
                window.location.replace('/')

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
