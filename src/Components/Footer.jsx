import React from 'react'
import {  Link  } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="bg-dark p-3 px-5" style={{fontFamily:"'Roboto Slab',serif"}}>
        <p className="float-end m-0">
            <Link to="#top">
                <span className="material-icons material-icons-outlined text-white">arrow_upward</span>
            </Link>
        </p>
        <p className="m-0">&copy; 2017–2021 JUSC, Inc. &middot; <Link to="privacy-policy">Privacy</Link> &middot; <Link to="terms-and-conditions">Terms</Link></p>
        </footer>
    )
}
