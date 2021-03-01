import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    if (await createBlog({ title, author, url })) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <div>
        title: <input type="text" value={title} id='title' name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        author: <input type="text" value={author} id='author' name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        url: <input type="text" value={url} id='url' name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit" id='create'>create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm