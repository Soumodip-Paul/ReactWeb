import React ,{useState}from 'react'
import firebaseApp from '../firebase/base'
import firebase from 'firebase'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'

const auth = firebaseApp.auth()

export const SignUp = ({currentUser}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    

    const submit = (e) => {
        e.preventDefault()
        if(!email||!password) alert("Please fill up the blanks")
        else createUser(email,password)
    }

    return (
    <>
    {currentUser!= null?<Redirect to={"/user/"+currentUser.uid}/>:null}
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
        <button className="w-100 btn btn-lg btn-primary" id="emailSignIn" type="submit">Sign Up</button>
    </form>
        <div className="w-100 text-center">
        <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin" style={{maxWidth:'450px',minWidth:'200px'}} onClick={() => getGSIpassword(password)}>Google Sign In</button>
        </div>
    </div>
    </>
    )
}



const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const googleSignIn = (password) => {
    auth.signInWithPopup(googleAuthProvider)
    .then((result) => {

    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    console.log(token);
    // The signed-in user info.
    console.log(result.user);
    // ...
    result.user.updatePassword(password).catch(error => {
        alert(error.message);
    })
    
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

const getGSIpassword = (password) => {

    document.getElementById("InputEmail").style.display = "none"
    document.getElementById("InputEmail").style.display = "none"
    document.getElementById("gSignin").addEventListener("click",()=>{
        googleSignIn(password)
    })
}
const createUser = (email,password) =>{
auth.createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in 
  var user = userCredential.user;
  console.log(user);
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  // ..
  console.log(errorCode+  " "+ errorMessage);
});
}
