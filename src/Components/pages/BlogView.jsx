import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../../model/BlogClass';
import ShareUtils from '../utils/ShareUtils';
import { renderAll } from '../utils/TextUtils';

export const BlogView = ({ darkMode }) => {
    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    const backGround = `bg-${darkMode ? "secondary" : "white"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`

    useEffect(() => {
        getBlog(id).then((doc) => {
            if (doc.exists) {
                let json = doc.data()
                json.text = renderAll(json.text)
                document.title = json.title + " - Cool Developer Bangla";
                setBlog(json)
            }
            else setBlog(null)
        })
    }, [id])

    return (
        <div style={{ minHeight: "82.3vh" }} className={backGround}>
            {blog != null ?
                <div className="container">
                    <h1 style={{ fontFamily: "'Roboto',serif" }} className={`px-2 pt-2 pb-0 m-0 w-100 fw-bolder text-center  ${backGround} ${textColor}`}>{blog.title}</h1>
                    <hr className={`bg-${darkMode ? "light" : "dark"}`} style={{ padding: "1px" }} />
                    <div className={`px-4  fs-6 p-0 m-0 w-100 text-end fst-italic ${backGround} ${textColor}`} style={{ fontFamily: "'Caveat',serif" }}>&#8212; {new Date(blog.time).toDateString()}</div>
                    <ShareUtils url={window.location.href} subject={blog.title.toLocaleUpperCase()} />
                    <p className={`px-4  fs-5 pt-2 pb-4 m-0 ${backGround} ${textColor}`} style={{ fontFamily: "'Roboto Slab',serif" }} dangerouslySetInnerHTML={{ __html: blog.text }}>
                        {/*Dangerous :dangerouslySetInnerHTML is subject to XSS attack be careful.Will be fixed later*/}
                    </p>
                </div>
                : ""}
        </div>
    )
}

