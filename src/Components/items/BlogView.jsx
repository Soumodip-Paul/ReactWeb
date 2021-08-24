import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../../model/BlogClass';
import renderAll from '../utils/TextUtils';

export const BlogView = ({darkMode}) => {
    const [blog, setBlog] = useState(null)
    const {id} = useParams()
    const backGround = `bg-${darkMode?"secondary":"white"}`
    const textColor = `text-${darkMode?"light":"dark"}`
    
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
        <div style={{minHeight:"82.3vh"}}>
        {blog!= null ?  
            <>
            <h1 className={`p-2 m-0 w-100 text-center ${backGround} ${textColor}`}>{blog.title}</h1>
            <p className={`px-4 pt-2 pb-4 m-0 ${backGround} ${textColor}`} dangerouslySetInnerHTML={{__html: blog.text}}></p>
            </>
        :""}
        </div>
    )
}

