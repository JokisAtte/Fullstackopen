import React, { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, handleAddLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const[infoVisible, setInfoVisible] = useState(false)

  const handleChange = () => {
    setInfoVisible(!infoVisible)
  }

  if(!infoVisible){
    return (
      <div style = {blogStyle}>
        {blog.title} {blog.author} <button onClick = {handleChange}>View</button>
      </div>
    )
  } else {
    return(
      <div style = {blogStyle}>
        <p>Title: {blog.title} <button onClick = {handleChange}>View</button></p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes} <button onClick = {handleAddLike} id = 'like'>Like</button></p>
        <p>Url: {blog.url}</p>
        <button>Remove</button>
      </div>
    )
  }

}

export default Blog