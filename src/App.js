import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setSuccessMessage("Login success")
      setTimeout(() => {setSuccessMessage(null)}, 5000)
    } catch (exception) {
      if (exception.response) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
    }
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({title, author, url})
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

      setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {setSuccessMessage(null)}, 5000)
    } catch (exception) {
      if (exception.response) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
    }
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const Notification = (message, styleName) => {
    if (message === null) {
      return null
    }

    return (
      <div className={styleName}>
        {message}
      </div>
    )
  }


  if (user === null) return (
    <div>
      <h2>Log in to application</h2>
      {Notification(errorMessage, "error")}
      {Notification(successMessage, "success")}
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {Notification(errorMessage, "error")}
      {Notification(successMessage, "success")}
      <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>

      <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <div>
          title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App