import React, { useState } from 'react'
import firebaseApp from '../../firebase/base'
import Img from '../assets/img.svg'
import "firebase/auth"

const auth = firebaseApp.auth()


export const Login = ({ currentUser }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert2, setAlert] = useState({text: '', opacity: '0'})

    const onSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) alert("Please fill up the blanks")
        else login(email, password, alertLogin)
        setEmail('')
        setPassword('')
    }

    const alertLogin = text => {
        setAlert({text, opacity: '1'})
        setTimeout(() => {
            setAlert({opacity: '0'})
        }, 5000)
    }

    const resetPassword = e => {
        document.getElementById('closeLogin').click()
        auth.sendPasswordResetEmail(prompt("Enter your email address"))
            .then(() => {
                alert('Password reset email sent')
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (!currentUser ?
        <div className="modal rounded-5 shadow fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLoginTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0" id="modalLoginTitle">Login </h2>
                        <button type="button" className="btn-close" id="closeLogin" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={onSubmit} >
                            <div className="form-floating mb-3">
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control rounded-4" id="LoginEmail" placeholder="name@example.com" />
                                <label htmlFor="LoginEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control rounded-4" id="LoginPassword" placeholder="Password" />
                                <label htmlFor="LoginPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Log In</button>
                        </form>
                        <small className="text-muted">Forgot your password? <span className="text-primary"
                            style={{ cursor: 'pointer' }} onClick={resetPassword}>Reset now</span></small>

                        <div className="alert alert-danger d-flex align-items-center mt-2 fw-6" role="alert" style={{opacity: alert2.opacity}}>
                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref={`${Img}#exclamation-triangle-fill`} /></svg>
                            <div>
                                <small>{alert2.text}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> :

        <div className="modal rounded-5 shadow fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLoginTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLoginTitle">Do you want to logout ?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure to Log Out from current session</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" id="closeLogin" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={e => {
                            document.getElementById('closeLogin').click()
                            setTimeout(() => {
                                window.location.replace('/')
                                auth.signOut()
                            }, 300)
                        }}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const login = async (email, password, alertLogin) => {
    try { 
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('closeLogin').click()

    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        if(error.code === "auth/user-not-found") alertLogin("User not Found")
        else if(error.code === "auth/wrong-password") alertLogin("Incorrect Password")
    }
}
export const LoginButton = ({ currentUser }) => {
    return (
        <button type="button" id="LoginButton" className="btn btn-success mx-2 my-1" data-bs-toggle="modal" data-bs-target="#modalLogin">
            {!currentUser ? "Log In" : "Log Out"}
        </button>
    )
}
