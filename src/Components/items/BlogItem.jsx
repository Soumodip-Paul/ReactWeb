import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { BlogClass } from '../../model/BlogClass'

export const BlogItem = ({blog,darkTheme}) => {
    return (
        <div style={{fontFamily: 'Roboto Slab'}} className={`${darkTheme.backGround} ${darkTheme.textColor} py-3 px-5 mb-0 mx-5"`}>
            <h2 style={{fontFamily: 'Roboto'}}>{blog.title}</h2>
            <p style={{fontFamily:  "'Roboto Slab',serif"}}>{blog.text.split('.')[0]}.</p>
            <Link to={"/blog/"+blog.link} className={"px-2 btn btn-outline-"+darkTheme.color}>Read More</Link>
            <hr />
        </div>
    )
}

BlogItem.prototype = {
    blog : PropTypes.instanceOf(BlogClass)
}