import React from 'react'

export const PageNotFound = () => {
    return (
        <>
        <img width="100%" src="/assets/svg/404.svg" style={{height: "84vh"}} alt="404 not found"/>
        <h3 style={{width: "100vw",padding: "10px",fontFamily: "'Roboto slab',serif",fontStyle: "italic",fontSize : "inherit",textAlign: "center"}}>Sorry The page at url
            <span style={{fontStyle:"normal",fontWeight: "bold"}}>  {window.location.href}  </span>
            does not exists
            </h3>
        </>
    )
}
