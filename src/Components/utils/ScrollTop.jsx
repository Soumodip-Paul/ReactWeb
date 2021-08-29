import React, { useState, useEffect } from 'react'

export const ScrollTop = ({ darkMode }) => {
    const [right, setright] = useState("-60px")
    useEffect(() =>
        document.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) setright('0px')
            else setright('-60px')
        })
    )
    const backGround = `bg-${darkMode ? "dark" : "light"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`
    return (

        <span className={"m-3 mb-2 text-center rounded-circle material-icons material-icons-outlined p-2 " + backGround + " " + textColor}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }} style={{ position: 'fixed', bottom: '0', right: right, transition: "all 0.25s ease-in-out", cursor: 'pointer' }}>arrow_upward</span>

    )
}
