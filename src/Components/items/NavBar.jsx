import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import firebaseApp from '../../firebase/base'
import 'firebase/auth'

const auth = firebaseApp.auth()


export const NavBar = ({showSearch,darkMode,onUpdateTheme}) => {
const [currentUser, setcurrentUser] = useState(auth.currentUser)
auth.onAuthStateChanged(user => {
    setcurrentUser(user)
})
return (
<header>
    <nav className={`navbar navbar-expand-md navbar-${darkMode?"dark":"light"} fixed-top bg-${darkMode?"dark":"light"}`} id="#top" style={{fontFamily: "'Roboto Slab', serif"}}>
    <div className="container-fluid">
        <Link className="navbar-brand" to="/" >
        <img style={{ height: '32px', width: '32px', borderRadius: '50%' }} src="/assets/image/cool developer.png" alt="JUSC" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" activeClassName="active" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/blog">Blogs</NavLink>
            </li>
            <li className="nav-item">
            {currentUser==null?null:<NavLink className="nav-link" activeClassName="active" to={"/user/"+currentUser.uid}>Profile</NavLink>}
            </li>
        </ul>
        <form className={showSearch? "d-flex":"d-none" }>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        {currentUser== null ?<Link className="btn btn-success mx-1" to="/login" >Log In</Link>:
            <div className="dropstart">
            <div className="btn btn-dark text-dark p-0 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={currentUser.photoURL} alt={currentUser.displayName.charAt(0)} 
            style={{
                width: "40px",
                height:"40px",
                borderRadius: "50%",
                cursor: "pointer"
            }}
            />
            </div>
          
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link className="dropdown-item" to={"/user/"+ currentUser.uid}>Profile</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><span className="dropdown-item" onClick={() => auth.signOut()} 
                    style={{cursor: "pointer"}}>
                    Log Out</span></li>
            </ul>
          </div>
            }
        {currentUser== null ?<Link className="btn btn-success mx-1" to="/signup" >Sign In</Link>:
            null }
        <button className={`btn btn-outline-${darkMode?"light":"dark"} mx-1`} onClick={()=>onUpdateTheme(!darkMode)}>{darkMode?"Light":"Dark"}</button>
        </div>
    </div>
    </nav>
</header>
)
}

NavBar.prototype = {
    showSearch : PropTypes.bool.isRequired
}