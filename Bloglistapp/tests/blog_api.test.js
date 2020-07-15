const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: '1',
        author: ' ',
        url: ' ',
        likes: 3
    },
    {
        title: '2',
        author: ' ',
        url: ' ',
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blog = new Blog(initialBlogs[0])
    await blog.save()

    blog = new Blog(initialBlogs[1])
    await blog.save()
})

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

test('blogs are saved', async () => {
    
    const blog = new Blog({
        title: 'TESTI',
        author: ' ',
        url: ' ',
        likes: 3
      })
    
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.content)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})