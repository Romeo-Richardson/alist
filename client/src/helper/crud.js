// Handles CRUD Operations

// Get Request

export const getUsers = () => {
    const fetchUsers = fetch('https://alistportfolio.herokuapp.com/handleUsers').then((res) => res.json())
    return fetchUsers
}

// Post Request, create user
export const createUser = async (newUser) => {
    await fetch('https://alistportfolio.herokuapp.com/handleUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
}

// Put Request, todo items

export const sendTodo = async (todoData) => {
    await fetch('https://alistportfolio.herokuapp.com/handleUsers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
    })
}

// delete todo

export const handleTodo = async (todoData) => {
    await fetch('https://alistportfolio.herokuapp.com/handleUsers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
    })
}

