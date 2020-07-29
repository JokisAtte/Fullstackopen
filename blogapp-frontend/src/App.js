import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/login'
import Togglable from './components/Togglable'
import BlogSubmit from './components/BlogSubmitForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormsg, setErrormsg] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs = blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with' , username)
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrormsg('Failed! Wrong username or password :(')
      setTimeout(() => {
        setErrormsg(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out from', username)
    window.localStorage.clear()
    blogService.setToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  //Placeholder likejen lisäykselle. Vielä on ongelmia bäckendissä
  const handleAddLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog)
    //const changedBlog = { ...blog, likes : blog.likes + 1 }
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    console.log('posting a new blog')
    const likes = 0
    try{
      await blogService.create({
        title,author,url, likes
      })
      setErrormsg(`${title} by ${author} posted!`)
      setTimeout(() => {
        setErrormsg(null)
      }, 5000)

      setAuthor('')
      setUrl('')
      setTitle('')
    } catch(exception){
      setErrormsg('Error: New blog didnt post')
      setTimeout(() => {
        setErrormsg(null)
      }, 5000)
    }
    var blogs = await blogService.getAll()
    blogs = blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    setBlogs(blogs)
  }

  const Notification = ({ message }) => {
    if (message === '') {
      return null
    }

    return(
      <div>
        {message}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <div>
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      {user.name} logged in
      <button onClick = {handleLogout}>logout</button>
      <Togglable buttonLabel = 'New blog'>
        <BlogSubmit
          handleCreateNew = {handleCreateNew}
          setTitle = {setTitle}
          setUrl = {setUrl}
          setAuthor = {setAuthor}
          author = {author}
          title = {title}
          url = {url}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleAddLike = {() => handleAddLike(blog.id)}/>
      )}
    </div>
  )

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={errormsg}/>
      {user === null && loginForm()}
      {user !== null && blogForm()}

    </div>
  )
}

export default App