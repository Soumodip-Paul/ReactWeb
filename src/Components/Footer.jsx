import React from 'react'
import {  Link  } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="bg-dark p-3 px-5" style={{fontFamily:"'Roboto Slab',serif"}}>
        <p className="m-0 ">&copy; 2017–2021 JUSC, Inc. &middot; <Link to="/privacy-policy" className="text-decoration-none">Privacy</Link> &middot; <Link className="text-decoration-none" to="/terms-and-conditions">Terms</Link></p>
        </footer>
    )
}
