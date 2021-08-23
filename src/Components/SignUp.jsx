import React ,{useState}from 'react'
import firebaseApp from '../firebase/base'
import firebase from 'firebase'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'
import { uploadUser } from '../model/User'

const auth = firebaseApp.auth()
const userRef =firebaseApp.firestore().collection("user")

export const SignUp = ({currentUser,darkMode}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    const [displayEmail, setdisplayEmail] = useState("block")
    const [gSignIn2, setgSignIn2] = useState(false)
    const [providerEmail, setproviderEmail] = useState("")
    const [isSigning, setisSigning] = useState(false)
    const backGround = `bg-${darkMode?"secondary":"white"}`
    const textColor = `text-${darkMode?"light":"dark"}`
    
    auth.onAuthStateChanged(user=> {
        if(user==null){
            // setRemember(true)
            // setdisplayEmail("block")
            // setgSignIn2(false)
            // setproviderEmail("")
            // setisSigning(false)
        }
    })

    const submit = (e) => {
        e.preventDefault()
        if(!email||!password) alert("Please fill up the blanks")
        else createUser(email,password)
    }

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const googleSignIn = () => {
    auth.signInWithPopup(googleAuthProvider)
    .then((result) => {

    //var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = credential.accessToken;
    // console.log(token);
    // The signed-in user info.
    console.log(result.user);
    const user = result.user;
    setisSigning(true)
    // ...
    userRef
        .doc(user.uid)
        .get()
        .then(doc => {
            if(doc.exists) {
                auth.signOut()
                alert("User already exists")
                return
            }
            else {
                setproviderEmail(user.email)
                setdisplayEmail("none")
                setgSignIn2(true)
            }
        })
        .catch(error => {
            auth.signOut()
            console.log(error);
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

const updatePassword = (currentUser,password) => {
    currentUser.updatePassword(password)
    .then(() =>{
        uploadUser(currentUser)
        setisSigning(false)
    }
    )
    .catch(error => {
        auth.signOut()
        alert(error.message);
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
return (
    <div className={`m-0 p-5 ${backGround} ${textColor}`} style={{height:"82.3vh"}}>
    {currentUser!= null && !isSigning?<Redirect to={"/user/"+currentUser.uid}/>:null}
    <div className="sign_in ">
    <form className="mx-auto w-50 d-flex" style={{
        minWidth: '200px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '450px'
    }}  onSubmit={submit}>
        <img className="rounded-circle" src="../assets/image/cool developer.png" alt="" width="96px" height="96px"/>
        {providerEmail != null && providerEmail.length !== 0? <h5 className="mb-4">Continue as <em className="text-primary">{providerEmail}</em></h5>: <h1 className="h3 mb-3 fw-normal">Please sign in</h1>}

        <div className="form-floating w-100">
        <input type="email" className="form-control" id="InputEmail" style={{display: displayEmail}} placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="InputEmail" className={darkMode?"text-dark":""}>Email address</label>
        </div>
        <div className="form-floating w-100">
        <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <label htmlFor="InputPassword" className={darkMode?"text-dark":""}>Password</label>
        </div>

        <div className="checkbox m-3 w-100">
        <label>
            <input type="checkbox" value={remember} checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
        </label>
        </div>
        {!gSignIn2?<button className="w-100 btn btn-lg btn-primary" id="emailSignIn" type="submit">Sign Up</button>:null}
    </form>
        <div className="w-100 text-center">
        {gSignIn2?<button className="w-50 btn btn-lg btn-success mt-1" id="gSignin2" style={{maxWidth:'450px',minWidth:'200px'}} onClick={() =>updatePassword(currentUser,password)}>Confirm</button>:
        <button className="w-50 btn btn-lg btn-success mt-1" id="gSignin" style={{maxWidth:'450px',minWidth:'200px'}} onClick={() =>  googleSignIn()}>Sign In By Google</button>
}
</div>
    </div>
    </div>
    )
}