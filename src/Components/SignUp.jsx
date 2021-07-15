import React ,{useState}from 'react'
import firebaseApp from '../firebase/base'
import firebase from 'firebase'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

const auth = firebaseApp.auth()

export const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    const [currentUser, setcurrentUser] = useState(auth.currentUser)

    auth.onAuthStateChanged(user=>setcurrentUser(user))

    const submit = (e) => {
        e.preventDefault()
        if(!email||!password) alert("Please fill up the blanks")
        else alert("do you want to submit")
    }

    return (
    <>
    {console.log(currentUser)}
    <div className="sign_in my-5" height="100vh">
    <form className="mx-auto my-2 w-50 d-flex" style={{
        minWidth: '200px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '450px'
    }}  onSubmit={submit}>
        <img className="mb-4" src="../assets/image/jusc-logo.png" alt="" width="96px" height="96px"/>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating w-100">
        <input type="email" className="form-control" id="InputEmail" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="InputEmail">Email address</label>
        </div>
        <div className="form-floating w-100">
        <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <label htmlFor="InputPassword">Password</label>
        </div>

        <div className="checkbox m-3 w-100">
        <label>
            <input type="checkbox" value={remember} checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
        </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
    </form>
        <div className="w-100 text-center">
        <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin" style={{maxWidth:'450px',minWidth:'200px'}} onClick={() => googleSignIn()}>Google Sign In</button>
        </div>
        <div className="w-100 text-center">
        <button className="w-50 btn btn-lg btn-success mt-1" style={{maxWidth:'450px',minWidth:'200px'}} onClick={() => updatePassword('password','/')}>Google Sign In</button>
        </div>
    </div>
    {currentUser!= null?<Redirect to="/profile"/>:null}
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

const updatePassword= (password,redirectUrl) => {
    let mUser =   auth.currentUser
    auth.onAuthStateChanged(user => mUser =user)
    if(mUser != null)
        mUser.updatePassword(password).then(() => {
            // Update successful.
            console.log("successful");
            return(<Redirect to={redirectUrl}/>)
            
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    else {}

}
