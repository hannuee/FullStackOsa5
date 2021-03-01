import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {

  test('Form sends the filled data for the call back function', () => {

    const mockHandleCreation = jest.fn()

    const component = render(
      <NewBlogForm createBlog={mockHandleCreation} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Uusi blogi' }
    })
    fireEvent.change(author, {
      target: { value: 'Influensseri' }
    })
    fireEvent.change(url, {
      target: { value: 'blogi.fi' }
    })
    fireEvent.submit(form)

    expect(mockHandleCreation.mock.calls).toHaveLength(1)
    expect(mockHandleCreation.mock.calls[0][0].title).toBe('Uusi blogi')
    expect(mockHandleCreation.mock.calls[0][0].author).toBe('Influensseri')
    expect(mockHandleCreation.mock.calls[0][0].url).toBe('blogi.fi')
  })

})