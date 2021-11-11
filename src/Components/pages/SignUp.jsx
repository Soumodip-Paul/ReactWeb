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
            await userCredential.user.updateProfile({displayName: name})
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
    /*return (
        <div className={`m-0 p-5 ${backGround} ${textColor}`} style={{ height: "82.3vh" }}>
            {currentUser != null && !isSigning ? <Redirect to={"/user/" + currentUser.uid} /> : null}
            <div className="sign_in ">
                <form className="mx-auto w-50 d-flex" style={{
                    minWidth: '200px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '450px'
                }} onSubmit={submit}>
                    <img className="rounded-circle" src="../assets/image/cool developer.png" alt="" width="96px" height="96px" />
                    {providerEmail != null && providerEmail.length !== 0 ? <h5 className="mb-4">Continue as <em className="text-primary">{providerEmail}</em></h5> : <h1 className="h3 mb-3 fw-normal">Please sign in</h1>}

                    <div className="form-floating w-100">
                        <input type="email" className="form-control" id="InputEmail" style={{ display: displayEmail }} placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="InputEmail" className={darkMode ? "text-dark" : ""}>Email address</label>
                    </div>
                    <div className="form-floating w-100">
                        <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="InputPassword" className={darkMode ? "text-dark" : ""}>Password</label>
                    </div>

                    <div className="checkbox m-3 w-100">
                        <label>
                            <input type="checkbox" value={remember} checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
                        </label>
                    </div>
                    {!gSignIn2 ? <button className="w-100 btn btn-lg btn-primary" id="emailSignIn" type="submit">Sign Up</button> : null}
                </form>
                <div className="w-100 text-center">
                    {gSignIn2 ? <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin2" style={{ maxWidth: '450px', minWidth: '200px' }} onClick={() => updatePassword(currentUser, password)}>Confirm</button> :
                        <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin" style={{ maxWidth: '450px', minWidth: '200px' }} onClick={() => googleSignIn()}>Sign In By Google</button>
                    }
                </div>
            </div>
        </div>
    )*/
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
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSignin">
            Sign In
        </button>
    )
}