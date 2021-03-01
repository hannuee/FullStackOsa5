import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not others as default', () => {
    
    const blog = {
        author: 'Sale',
        id: '603ba1b93883751c20607000',
        likes: 10,
        title: 'Pressan Blogi',
        url: 'pressa.fi',
        user: { username: 'SauNii', name: 'Sauli', id: '603ba1483883751c20606fff' }
    }

    const user = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhdU5paSIsImlkIjoiNjAzYmExNDgzODgzNzUxYzIwNjA2ZmZmIiwiaWF0IjoxNjE0NTk1NjYzfQ.rcYbDeQCi5xvDOnBtPOqm9Yo35S-ucI62PbetcvET-s',
        username: 'SauNii',
        name: 'Sauli'
    }

    const mockHandleUpdate = jest.fn()
    const mockHandleDeletion = jest.fn()
    
    const component = render(
        <Blog blog={blog} handleUpdate={mockHandleUpdate} handleDeletion={mockHandleDeletion} loggedUser={user} />
    )
    
    const limitedDiv = component.container.querySelector('.limitedInfo')
    expect(limitedDiv).not.toHaveStyle('display: none')
    expect(limitedDiv).toHaveTextContent('Pressan Blogi')
    expect(limitedDiv).toHaveTextContent('Sale')

    const fullDiv = component.container.querySelector('.fullInfo')
    expect(fullDiv).toHaveStyle('display: none')
})