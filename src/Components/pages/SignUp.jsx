import { useState } from 'react'
import Icons from '../assets/img.svg'
import firebaseApp from '../../firebase/base'
import firebase from 'firebase/app'
import 'firebase/auth'

const auth = firebaseApp.auth()

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: process.env.REACT_APP_REDIRECT || 'http://localhost:3000/verify',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'cooldeveloperbangla.ga'
};

export const SignUp = ({ currentUser }) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const submit = (e) => {
        e.preventDefault()
        if (!email || !password) alert("Please fill up the blanks")
        else createUser(email, password)
    }

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

    const googleSignIn = async () => {
        try {
            await  auth.signInWithPopup(googleAuthProvider)
        } catch (error) {
            console.error(error)
        }
    }

    const createUser = async (email, password) => {
        try {
            document.getElementById('closeSignIn').click()
            const userCredential = await auth.createUserWithEmailAndPassword(email,password) 
            await userCredential.user.updateProfile({displayName: name,photoURL: 'https://firebasestorage.googleapis.com/v0/b/cool-developer-blog.appspot.com/o/person_black_24dp.svg?alt=media&token=d082b7ff-f61d-45f3-a9cf-4aa5bacb556f'})
            auth.signOut()
            await auth.sendSignInLinkToEmail(email, actionCodeSettings)
            window.localStorage.setItem('emailForSignIn', email);
            setName('')
            setEmail('')
            setPassword('')
            alert('Email sent to your email address')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        !currentUser && <>
        <div className="modal rounded-5 shadow fade no-scroll" tabIndex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-5 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0">Sign up for free</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignIn"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form onSubmit={submit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control rounded-4" id="inputName" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                <label htmlFor="inputName">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="Password" value={password} onChange={e => {
                                    setPassword(e.target.value)
                                }}/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
                            <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                            <hr className="my-4" />
                            <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                            {/* <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#twitter`} /></svg>
                                Sign up with Twitter
                            </button>
                            <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#facebook`} /></svg>
                                Sign up with Facebook
                            </button>
                            <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#github`} /></svg>
                                Sign up with GitHub
                            </button> */}
                            <button className="w-100 py-2 mb-2 btn btn-outline-success rounded-4" type="button" onClick={e => googleSignIn()}>
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#google`} /></svg>
                                Sign up with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export const SignInButton = ({currentUser}) => {
    return (
        !currentUser && 
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSignin">
            Sign In
        </button>
    )
}