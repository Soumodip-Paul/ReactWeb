import React from 'react'
import {  Link  } from 'react-router-dom'

export const Footer = ({darkMode}) => {
    const backGround = `bg-${darkMode?"dark":"light"}`
    const textColor = `text-${darkMode?"light":"dark"}`
    return (
        <footer className={backGround + " p-3 px-5"} style={{fontFamily:"'Roboto Slab',serif"}}>
        <p className="m-0 ">&copy; 2017–2021 <Link className={"text-decoration-none "+textColor} to="/">Cool Developer</Link>,
            Inc. &middot; <Link to="/privacy-policy" className="text-decoration-none">Privacy</Link> &middot; <Link className="text-decoration-none" to="/terms-and-conditions">Terms</Link></p>
        </footer>
    )
}
