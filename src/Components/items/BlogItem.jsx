import React from 'react'
import { Link } from 'react-router-dom'

export const BlogItem = ({blog}) => {
    return (
        <div style={{fontFamily: 'Roboto Slab'}} className="bg-white text-dark py-3 px-1 my-1 mx-5">
            <h2 style={{fontFamily: 'Roboto'}}>{blog.title}</h2>
            <p>{blog.text}</p>
            <Link to={blog.link} className="px-2 btn btn-outline-success">Read More</Link>
            <hr />
        </div>
    )
}