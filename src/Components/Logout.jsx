import React from 'react'
import { Redirect } from 'react-router-dom'
import firebaseApp from '../firebase/base'

const auth = firebaseApp.auth()

export const Logout = ({currentUser}) => {
    return (
        <div className="w-100 text-center m-3">
            {currentUser == null?<Redirect to="/login"/>:<button className="btn btn-lg btn-outline-danger px-4 py-2" onClick={() => auth.signOut()}>Log Out</button>}
        </div>
    )
}
