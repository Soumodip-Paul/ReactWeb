import React,{useState} from 'react'
import firebaseApp from '../firebase/base'

const auth = firebaseApp.auth()


export const Login = () => {
  const [currentUser, setcurrentUser] = useState(auth.currentUser)
  auth.onAuthStateChanged(user=>{
    setcurrentUser(user);
  })
  return(
    <>{currentUser!=null?
    <><h1>Hello {currentUser.displayName}</h1>
    <button className="btn btn-dark" onClick={()=>auth.signOut()}></button>
    </>:
    <button className="btn btn-dark" onClick={()=>alert("trying for log in")}></button>}
    </>
    );
}
