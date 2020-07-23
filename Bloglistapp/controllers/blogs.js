const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user',{username : 1, name: 1})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })

const generateId = () => {
  const max = 1000
  return Math.floor(Math.random()* Math.floor(max))
}

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log(authorization.substring(7))
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: generateId(),
    user: user
  })
  console.log(blog)

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.body.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({id: request.params.id})
  response.status(204).end()
})

module.exports = blogsRouter