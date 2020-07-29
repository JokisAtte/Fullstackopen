import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'TestiTesti',
    author: 'jouu',
    url: 'Tän ei pitäs näkyy'
  }

  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog id = {blog.id} blog={blog} handleAddLike ={mockHandler} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'TestiTesti'
    )
    expect(component.container).not.toHaveTextContent(
      'Tän ei pitäs näkyy'
    )
  })

  test('Clicking "View" shows all info', async () => {

    const view = component.getByText('View')
    fireEvent.click(view)
    expect(component.container).toHaveTextContent(
      'TestiTesti'
    )
    expect(component.container).toHaveTextContent(
      'Tän ei pitäs näkyy'
    )
  })

  test('Clicking "like" twice calls the function twice', async() => {
    const view = component.getByText('View')
    fireEvent.click(view)
    const like = component.getByText('Like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



