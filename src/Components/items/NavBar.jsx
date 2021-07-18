import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import firebaseApp from '../../firebase/base'
import 'firebase/auth'

const auth = firebaseApp.auth()


export const NavBar = () => {
const [currentUser, setcurrentUser] = useState(auth.currentUser)
auth.onAuthStateChanged(user => {
    setcurrentUser(user)
})
return (
<header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="#top">
    <div className="container-fluid">
        <Link className="navbar-brand" to="." >
        <img style={{ height: '32px', width: '32px', borderRadius: '50%' }} src="/assets/image/jusc-logo.png" alt="JUSC" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" activeClassName="active" exact to=".">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/login">{currentUser==null?'Log In':'Log Out'}</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/signup">{currentUser==null?'Sign Up':'Profile'}</NavLink>
            </li>
        </ul>
        <form className="d-none">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
    </div>
    </nav>
</header>
)
}
