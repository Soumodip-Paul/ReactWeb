import React,{useState,useEffect} from 'react'

export const ScrollTop = () => {
    const [visibility, setVisibility] = useState('hidden')
    useEffect(()=>
    document.addEventListener('scroll',()=>{
        if (window.pageYOffset > 300) setVisibility('visible')
        else setVisibility('hidden')
    })
    )
    return (
        
        <span  className="m-3 bg-dark text-center rounded-circle material-icons material-icons-outlined text-black p-2 "
        onClick={()=>{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }} style={{position:'fixed',right:'0',bottom: '0',visibility: visibility}}>arrow_upward</span>
        
    )
}
