import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogData } from '../../model/BlogClass';
import ShareUtils from '../utils/ShareUtils';

export const BlogView = ({ darkMode, setProgress }) => {
    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    const backGround = `bg-${darkMode ? "secondary" : "white"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`

    const fetchData = async (id,setProgress) => {
        setProgress(20)
        let doc = await getBlogData(id)
        setProgress(60)
        if (doc.exists) {
            let json = doc.data()
            // json.text = renderAll(json.text)
            document.title = json.title + " - Cool Developer Bangla";
            setBlog(json)
            document.getElementById('blogTextElem').innerHTML = json.text
        }
        else setBlog(null)
        setProgress(100)
    }

    useEffect(() => {
        fetchData(id,setProgress)
    }, [id,setProgress])

    return (
        <>
            {blog != null ?
                <div className="container">
                    <h1 style={{ fontFamily: "'Roboto',serif" }} className={`px-2 pt-2 pb-0 m-0 w-100 fw-bolder text-center  ${backGround} ${textColor}`}>{blog.title}</h1>
                    <hr className={`bg-${darkMode ? "light" : "dark"}`} style={{ padding: "1px" }} />
                    <div className={`px-4  fs-6 p-0 m-0 w-100 text-end fst-italic ${backGround} ${textColor}`} style={{ fontFamily: "'Caveat',serif" }}>&#8212; {new Date(blog.time).toDateString()}</div>
                    <div className={`px-4  fs-5 pt-2 pb-4 m-0 ${backGround} ${textColor}`} id="blogTextElem" style={{ fontFamily: "'Roboto',serif" }}>
                    <ShareUtils url={window.location.href} subject={blog.title.toLocaleUpperCase()} />
                    </div>
                </div>
                : ""}
        </>
    )
}

