import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const blogFormRef = useRef()

  const handleCreation = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))

      blogFormRef.current.toggleVisibility()

      setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {setSuccessMessage(null)}, 5000)
      return true
    } catch (exception) {
      if (exception.response) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
      return false
    }
  }

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog)
      setBlogs(blogs.filter(blog => blog.id !== response.id).concat(response))

      setSuccessMessage(`blog ${response.title} by ${response.author} got 1 like more`)
      setTimeout(() => {setSuccessMessage(null)}, 5000)
      return true
    } catch (exception) {
      if (exception.response) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
      return false
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

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          createBlog={handleCreation}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />
      )}
    </div>
  )
}

export default App