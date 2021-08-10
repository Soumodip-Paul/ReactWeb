import React, {useState} from 'react'
import { Redirect } from 'react-router'
import firebaseApp from '../firebase/base'
import firebase from 'firebase'
import "firebase/auth"

const auth = firebaseApp.auth()


export const Login = ({currentUser}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)

    const submit = (e) => {
        e.preventDefault()
        if(!email||!password) alert("Please fill up the blanks")
        else login(email,password)
    }

    return (
        <>
        {currentUser != null ? <Redirect to="/" /> : null}
        <div className="sign_in my-5" height="100vh">
            <form className="mx-auto my-2 w-50 d-flex" style={{
                minWidth: '200px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '450px'
            }} onSubmit={submit}>
                <img className="mb-4 rounded-circle" src="../assets/image/cool developer.png" alt="" width="96px" height="96px" />
                <h1 className="h3 mb-3 fw-normal">Please Log In</h1>

                <div className="form-floating w-100">
                    <input type="email" className="form-control" id="InputEmail" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="InputEmail">Email address</label>
                </div>
                <div className="form-floating w-100">
                    <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="InputPassword">Password</label>
                </div>

                <div className="checkbox m-3 w-100">
                    <label>
                        <input type="checkbox" value={remember} checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
                    </label>

                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
            </form>
            <div className="w-100 text-center">
                <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin" style={{ maxWidth: '450px', minWidth: '200px' }} onClick={() => googleSignIn()}>Google Sign In</button>
            </div>
        </div>
        </>
    )
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const googleSignIn = () => {
    auth.signInWithPopup(googleAuthProvider)
    .then((result) => {

    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    console.log(token);
    // The signed-in user info.
    console.log(result.user);
    // ...
       
    
}).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    auth.signOut();
    console.log("An Error occured \ncode : "+errorCode+"\nMessage : "+errorMessage+"\nEmail to : "+email+"\nCredentials : "+JSON.stringify(credential))    
})
}

const login = (email,password) => {
    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " "+ errorMessage);
    // ..
  });
}
