import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../../model/BlogClass';
import renderAll from '../utils/TextUtils';

export const BlogView = ({darkMode}) => {
    const [blog, setBlog] = useState(null)
    const {id} = useParams()
    const backGround = `bg-${darkMode?"secondary":"white"}`
    const textColor = `text-${darkMode?"light":"dark"}`
    const headerBackGround = `bg-${darkMode?"dark":"light"}`
    
    useEffect(()=> {
        getBlog(id).then((doc) => {
            if(doc.exists) {
                let json = doc.data()
                json.text = renderAll(json.text)
                setBlog(json)
            }
            else setBlog(null)
        })
    }, [id])

    return (
        <div style={{minHeight:"80.6vh"}} className={backGround}>
        {blog!= null ?  
            <>
            <h1 className={`px-2 pt-2 pb-4 m-0 w-100 text-center ${headerBackGround} ${textColor}`}>{blog.title}</h1>
            <div className="container">
                <p className={`px-4 pt-2 pb-4 m-0 ${backGround} ${textColor}`} dangerouslySetInnerHTML={{__html: blog.text}}></p>
            </div>
            </>
        :""}
        </div>
    )
}

