const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
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

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log("uusi post")
  console.log(body)
  const users = await User.find({name : "Atte Jokinen" })
  user = users[0]

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: generateId(),
    user: user
  })

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