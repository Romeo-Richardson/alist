// React
import React from 'react'
import { useEffect, useState, useRef } from 'react';

// React Router DOM
import { useNavigate } from 'react-router-dom'

// React Query 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch Calls
import { getUsers } from '../helper/crud';
import { sendTodo } from '../helper/crud';
import { handleTodo } from '../helper/crud';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayName } from '../redux/diplayNameSlice';


// Style imports
import { MainContent } from '../styles/MainContent';
import { MainHeader } from '../styles/MainHeader';
import { TodoInput } from '../styles/TodoInput';
import { TodoItem } from '../styles/TodoItem';
import { MainContentFooter } from '../styles/MainContentFooter';
import { IconContainer } from '../styles/IconContainer';
import { SaveTodoIcon } from '../styles/SaveTodoIcon';
import { TopBanner } from '../styles/TopBanner';
import { LogoutIconContainer } from '../styles/LogoutIconContainer';





// Image Imports
import { DynamicText } from '../styles/DynamicText';
import IconMoon from '../components/IconMoon';
import IconCheck from '../components/IconCheck';
import IconSun from '../components/IconSun';
import IconCross from '../components/IconCross';
import LogoutIcon from './LogoutIcon';



const Main = ({ updateStyles }) => {
    // States
    const [todoInput, setTodoInput] = useState('')
    const [todoID, setTodoID] = useState(0)
    const [showCompleted, setShowCompleted] = useState(false)
    const [itemsLeft, setItemsLeft] = useState(0)
    const [position, setPosition] = useState('0px')

    // States for Conditional Styling
    const [activeColor, setActiveColor] = useState('hsl(220, 98%, 61%)')
    const [completedColor, setCompletedColor] = useState('white')

    // React Router DOM Navigate
    const navigate = useNavigate()

    // Redux Local State
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.reduceTheme.theme)
    const styles = useSelector((state) => state.reduceStyles.styles)
    const displayName = useSelector((state) => state.reduceDisplayName.displayName)

    // React Query Server State
    const {
        data: users,
        isFetched
    } = useQuery({ queryKey: ['users'], queryFn: getUsers })

    const queryClient = useQueryClient()

    // Listens for Todo Posting, optimistically updating UI and queues rerender
    const mutateUsers = useMutation({
        mutationFn: sendTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onMutate: async (newTodo) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })
            const previous = queryClient.getQueryData(['users'])
            const prevIndex = previous.indexOf(users.filter((user) => {
                return user._id === sessionStorage.getItem('UserID')
            })[0])
            previous[prevIndex].todos.push(newTodo.todos[newTodo.todos.length - 1])
            queryClient.setQueryData(['users'], previous)
            const currentUser = users.filter((user) => {
                return user._id === sessionStorage.getItem('UserID')
            })[0]
            const userIndex = users.indexOf(currentUser)
            setItemsLeft(users[userIndex].todos.filter((todo) => {
                return todo.status !== 'Completed'
            }).length)
        }
    })

    // Listens for modifications to optimistically update UI
    const modifyTodos = useMutation({
        mutationFn: handleTodo,
        onMutate: async () => {
            await queryClient.cancelQueries(['users'])
            queryClient.setQueryData(['users'], users)
            const currentUser = users.filter((user) => {
                return user._id === sessionStorage.getItem('UserID')
            })[0]
            const userIndex = users.indexOf(currentUser)
            setItemsLeft(users[userIndex].todos.filter((todo) => {
                return todo.status !== 'Completed'
            }).length)
        }
    })

    // Logic

    // Handles CRUD Operations
    const crud = {
        // Handle's posting Todo to DB
        postTodo: () => {
            const todoData = {
                _id: sessionStorage.getItem('UserID'),
                todos: [
                    ...users.filter((user) => {
                        return user._id === sessionStorage.getItem('UserID')
                    })[0].todos,
                    {
                        todoID: Math.random(),
                        todo: todoInput,
                        status: 'Active'
                    }]
            }
            mutateUsers.mutate(todoData, {
                onSuccess: () => { console.log('Mutate') },
                onSettled: () => { console.log('Mutate') }
            })
        }, // Handles deleting Todo from DB
        deleteTodo: (id) => {
            setTodoID(id)
            const currentUser = users.filter((user) => {
                return user._id === sessionStorage.getItem('UserID')
            })[0]
            const locateTodo = currentUser.todos.filter((todo) => {
                return todo.todoID === id
            })[0]
            const todoIndex = currentUser.todos.indexOf(locateTodo)
            const userIndex = users.indexOf(currentUser)
            users[userIndex].todos.splice(todoIndex, 1)
            const todoData = {
                _id: currentUser._id,
                newTodos: users[userIndex].todos
            }
            modifyTodos.mutate(todoData)
        }
    }

    // Changes status of Todo from Active to Completed
    const markCompleted = (id) => {
        const currentUser = users.filter((user) => {
            return user._id === sessionStorage.getItem('UserID')
        })[0]
        const locateTodo = currentUser.todos.filter((todo) => {
            return todo.todoID === Number(id)
        })[0]
        const userIndex = users.indexOf(currentUser)
        const todoIndex = users[userIndex].todos.indexOf(locateTodo)
        users[userIndex].todos[todoIndex].status = 'Completed'
        const todoData = {
            _id: currentUser._id,
            newTodos: users[userIndex].todos
        }
        modifyTodos.mutate(todoData)
    }

    // Clears all completed Todos
    const clearCompleted = () => {
        const currentUser = users.filter((user) => {
            return user._id === sessionStorage.getItem('UserID')
        })[0]
        const userIndex = users.indexOf(currentUser)
        const filterTodos = users[userIndex].todos.filter((todo) => {
            return todo.status !== 'Completed'
        })
        users[userIndex].todos = filterTodos
        const todoData = {
            _id: currentUser._id,
            newTodos: users[userIndex].todos
        }
        modifyTodos.mutate(todoData)
    }

    // Handles clearing Data on Logout, sun/moon icon positioning, and Items left count on mount.
    useEffect(() => {
        if (!sessionStorage.getItem('UserID')) {
            navigate('/')
            alert('Logged out, please log in.')
        }
        setPosition('-100px')
        if (users) {
            const currentUser = users.filter((user) => {
                return user._id === sessionStorage.getItem('UserID')
            })[0]
            const userIndex = users.indexOf(currentUser)
            setItemsLeft(users[userIndex].todos.filter((todo) => {
                return todo.status !== 'Completed'
            }).length)
            dispatch(setDisplayName(currentUser.username.toUpperCase()))
        }
    }, [])


    // Handles color for active/completed text in footer while maintaining onHover color change
    useEffect(() => {
        if (styles) {
            setCompletedColor(styles.textColor)
        }
    }, [styles])

    // Handles clearing input upon posting Todo
    const inputRef = useRef()

    return (
        <>
            <TopBanner>
                <DynamicText size={'36px'} weight={'800'} textColor={'white'}>{displayName}</DynamicText>
                {theme === 'Dark' ?
                    <IconMoon updateStyles={updateStyles} position={position}></IconMoon> :
                    <IconSun updateStyles={updateStyles} position={position}></IconSun>}
                <LogoutIconContainer>
                    <LogoutIcon></LogoutIcon>
                </LogoutIconContainer>
            </TopBanner>
            <MainHeader jc={'space-between'} bg={styles.primaryColor}>
                <IconContainer>
                    <SaveTodoIcon
                        cursor={'pointer'}
                        hoverBG={'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'}
                        onClick={() => {
                            crud.postTodo()
                            inputRef.current.value = ''
                        }}></SaveTodoIcon>
                </IconContainer>
                <TodoInput placeholder='Add Todo' ref={inputRef} maxLength={45} textColor={styles.textColor} onChange={(e) => setTodoInput(e.target.value)}></TodoInput>
            </MainHeader>
            <MainContent bg={styles.primaryColor}>
                {showCompleted ?
                    users?.filter((user) => {
                        return user._id === sessionStorage.getItem('UserID')
                    })[0].todos.filter((item) => {
                        return item.status === 'Completed'
                    }).map((todo, key) => {
                        return (
                            <TodoItem key={key}>
                                <SaveTodoIcon left={'23px'}>
                                    <IconCheck styles={styles}></IconCheck>
                                </SaveTodoIcon>
                                <DynamicText textColor={styles.textColor}>{todo.todo}</DynamicText>
                                <IconCross todoID={todo.todoID} fnc={() => { crud.deleteTodo(todo.todoID) }}></IconCross>
                            </TodoItem>
                        )
                    }) :
                    users?.filter((user) => {
                        return user._id === sessionStorage.getItem('UserID')
                    })[0].todos.filter((item) => {
                        return item.status === 'Active'
                    }).map((todo, key) => {
                        return (
                            <TodoItem key={key}>
                                <SaveTodoIcon
                                    left={'23px'}
                                    cursor={'pointer'}
                                    hoverBG={'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'}
                                    id={todo.todoID}
                                    onClick={(e) => {
                                        markCompleted(e.target.id)
                                    }}></SaveTodoIcon>
                                <DynamicText textColor={styles.textColor}>{todo.todo}</DynamicText>
                                <IconCross
                                    todoID={todo.todoID}
                                    fnc={() => {
                                        crud.deleteTodo(todo.todoID)
                                    }}></IconCross>
                            </TodoItem>
                        )
                    })}
            </MainContent>
            <MainContentFooter bg={styles.primaryColor}>
                <DynamicText textColor={styles.textColor} size={'12px'}>Items left: {itemsLeft}</DynamicText>
                <DynamicText
                    textColor={activeColor}
                    size={'12px'}
                    hoverColor={'hsl(220, 98%, 61%)'}
                    cursor={'pointer'}
                    onClick={() => {
                        setShowCompleted(false)
                        setActiveColor('hsl(220, 98%, 61%)')
                        setCompletedColor(styles.textColor)
                    }}>Active</DynamicText>
                <DynamicText
                    textColor={completedColor}
                    size={'12px'}
                    hoverColor={'hsl(220, 98%, 61%)'}
                    cursor={'pointer'}
                    onClick={() => {
                        setShowCompleted(true)
                        setActiveColor(styles.textColor)
                        setCompletedColor('hsl(220, 98%, 61%)')
                    }}>Completed</DynamicText>
                <DynamicText
                    textColor={styles.textColor}
                    size={'12px'}
                    hoverColor={'hsl(220, 98%, 61%)'}
                    cursor={'pointer'}
                    onClick={clearCompleted}>Clear Completed</DynamicText>
            </MainContentFooter>
        </>
    )
}

export default Main