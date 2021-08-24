import React from 'react'

export const PageNotFound = ({darkMode}) => {
    return (
        <>
        <img className={`bg-${darkMode?"secondary":"white"}`} width="100%" src="/assets/svg/404.svg" style={{height: "85vh"}} alt="404 not found"/>
        <h3 className={`bg-${darkMode?"secondary":"white"} text-${darkMode?"light":"dark"} m-0`} style={{width: "100%",padding: "10px",fontFamily: "'Roboto slab',serif",fontStyle: "italic",fontSize : "inherit",textAlign: "center"}}>Sorry The page at url
            <span style={{fontStyle:"normal",fontWeight: "bold"}}>  {window.location.href}  </span>
            does not exists
            </h3>
        </>
    )
}
