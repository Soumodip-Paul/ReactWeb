import React,{useState,useEffect} from 'react'

export const ScrollTop = () => {
    const [bottom, setBottom] = useState("-60px")
    useEffect(()=>
    document.addEventListener('scroll',()=>{
        if (window.pageYOffset > 300) setBottom('0px')
        else setBottom('-60px')
    })
    )
    return (
        
        <span  className="m-3 bg-dark text-center rounded-circle material-icons material-icons-outlined text-black p-2 "
        onClick={()=>{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }} style={{position:'fixed',bottom:'0',right: bottom,transition:"all 0.25s ease-in-out",cursor: 'pointer'}}>arrow_upward</span>
        
    )
}
