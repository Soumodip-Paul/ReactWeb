import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Darkmode } from '../../context/Background'
import Img from '../assets/img.svg'

export const Footer = () => {
    const darkMode = useContext(Darkmode).mode
    const backGround = `bg-${darkMode ? "dark" : "light"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`
    useEffect(() => {
        document.querySelectorAll('footer a.nav-link').forEach((elem, key) => {
            elem.addEventListener('click', e => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        })
    })
    return (
        <footer className={backGround + " p-5 " + textColor} id="footer" style={{ fontFamily: "'Roboto Slab',serif" }}>
            <div className="row">
                <div className="col-6 col-md-2">
                    <h5 className="my-2">Sitemap</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                        <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted">About</Link></li>
                        <li className="nav-item mb-2"><Link to="/terms" className="nav-link p-0 text-muted">Terms</Link></li>
                        <li className="nav-item mb-2"><Link to="/privacy" className="nav-link p-0 text-muted">Privacy</Link></li>
                        <li className="nav-item mb-2"><Link to="/pricing" className="nav-link p-0 text-muted">Pricing</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2">
                    <h5 className="my-2">Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2">
                    <h5 className="my-2">Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About</Link></li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 p-4">
                    <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of whats new and exciting from us.</p>
                        <div className="d-flex w-100 gap-2">
                            <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                            <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                            <button className="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="d-flex justify-content-between flex-md-row flex-column py-4 my-4 border-top">
                <p>
                    <Link to="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                        <img className="bi me-2 rounded-circle" width="40" height="40" src="/android-chrome-192x192.png" alt="cool-developer-logo" />
                    </Link>
                    &copy; 2021 Cool Developer,  All rights reserved.
                </p>
                <ul className="list-unstyled d-flex">
                    <li className="ms-3"><a className="link-dark" href="https://github.com/Soumodip-Paul" target="_blank" rel="noopener noreferrer"><svg className="bi" width="24" height="24"><use xlinkHref={`${Img}#github`} /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="https://twitter.com/soumodippaul6" target="_blank" rel="noopener noreferrer"><svg className="bi" width="24" height="24"><use xlinkHref={`${Img}#twitter`} /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="https://instagram.com/SoumodipPaul64" target="_blank" rel="noopener noreferrer"><svg className="bi" width="24" height="24"><use xlinkHref={`${Img}#instagram`} /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="/" target="_blank" rel="noopener noreferrer"><svg className="bi" width="24" height="24"><use xlinkHref={`${Img}#facebook`} /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="https://www.youtube.com/channel/UCOFwfN-LJ7wGvAOovAwpjxg?sub_confirmation=1" target="_blank" rel="noopener noreferrer"><svg className="bi" width="24" height="24"><use xlinkHref={`${Img}#youtube`} /></svg></a></li>
                </ul>
            </div>
        </footer>
    )
}
