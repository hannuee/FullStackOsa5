import React, { useState } from 'react'

const Blog = ({blog, handleUpdate, handleDeletion, loggedUser}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await handleUpdate(blog, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) await handleDeletion(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => {
    if (blog.user.username === loggedUser.username) return <button onClick={handleRemove}>remove</button>
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={handleLike}>like</button><br />
        {blog.author}<br />
        {removeButton()}
      </div>
    </div>
  )
}

export default Blog
