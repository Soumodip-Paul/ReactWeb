import { Link, NavLink } from "react-router-dom";
import Dropdown, { DropdownDivider, DropdownItem, DropdownLink } from './Dropdown';
import { SignInButton } from '../pages/SignUp';
import { LoginButton } from '../pages/Login';
import PropTypes from 'prop-types'
import firebaseApp from '../../firebase/base'
import 'firebase/auth'
import { Darkmode } from "../../context/Background";
import {useContext} from 'react'

const auth = firebaseApp.auth()


export const NavBar = ({ showSearch, admin, currentUser }) => {
    const darkMode = useContext(Darkmode).mode
    const updateMode = useContext(Darkmode).setMode
    return (
        <header>
            <nav className={`navbar navbar-expand-md navbar-dark bg-dark`} id="#top" style={{ fontFamily: "'Roboto Slab', serif" }}>
                <div className="container-fluid">
                    {currentUser == null ? <Link className="navbar-brand" to="/" >
                        <img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src="/assets/image/Cool developer.png" alt="JUSC" />
                    </Link> :
                        <div className="dropdown navbar-brand">
                            <div className="p-0" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentUser.photoURL ?
                                    <img src={currentUser.photoURL} alt={currentUser.email.charAt(0)}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                    }}
                                />: 
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    display: 'flex',
                                    borderRadius: "50%",
                                    background: '#789dc1'
                                }} > <span className="m-auto text-light">{ (currentUser.displayName && currentUser.displayName.charAt(0).toLocaleUpperCase()) || currentUser.email.charAt(0).toLocaleUpperCase() }</span></div>
                                }
                            </div>

                            {/* <ul className="dropdown-menu mt-2" style={{ top: '50px' }} aria-labelledby="profileDropdown">
                                <li><Link className="dropdown-item" to={"/user/" + currentUser.uid}>Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><span className="dropdown-item" onClick={() => auth.signOut()}>Log Out</span></li>
                            </ul> */}
                            <Dropdown className="mt-2" style={{ top: '50px' }} areaLabel="profileDropdown">
                                <DropdownLink to={"/user/" + currentUser.uid}>Profile</DropdownLink>
                                <DropdownDivider/>
                                <DropdownItem><span onClick={() => auth.signOut()}>Log Out</span></DropdownItem>
                            </Dropdown>
                        </div>
                    }
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
                                <NavLink className="nav-link" aria-current="page" activeClassName="active" exact to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                {currentUser == null ? null : <NavLink className="nav-link" activeClassName="active" to={"/user/" + currentUser.uid}>Profile</NavLink>}
                            </li>
                            <li className="nav-item">
                                {!admin ? null : <NavLink className="nav-link" activeClassName="active" to={"/create"}>Create</NavLink>}
                            </li>
                        </ul>
                        <form className={showSearch ? "d-flex" : "d-none"}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button className={`btn btn-outline-light mx-1`} onClick={() => updateMode(!darkMode)}>{darkMode ? "Light" : "Dark"}</button>
                        <LoginButton currentUser={currentUser} />
                        <SignInButton currentUser={currentUser} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

NavBar.prototype = {
    showSearch: PropTypes.bool.isRequired
}