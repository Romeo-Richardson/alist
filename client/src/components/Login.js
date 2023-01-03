// React
import React from 'react'
import { useState } from 'react';

// React Router DOM
import { useNavigate } from 'react-router-dom'

// Fetch Calls
import { createUser } from '../helper/crud';


// React Query
import { useMutation, useQueryClient } from '@tanstack/react-query'


// Redux
import { useSelector } from 'react-redux'

// Styles
import { MainContent } from '../styles/MainContent';
import { MainHeader } from '../styles/MainHeader';
import { DynamicText } from '../styles/DynamicText';
import { CustomInput } from '../styles/CustomInput';
import { MainContentButton } from '../styles/MainContentButton';
import { TopBanner } from '../styles/TopBanner';


import IconMoon from './IconMoon';
import IconSun from './IconSun';

const Login = ({ updateStyles, users }) => {
    // Standard States
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [userCreated, setUserCreated] = useState(false)

    // Router Navigate Init
    const navigate = useNavigate()

    // Redux Local States
    const theme = useSelector((state) => state.reduceTheme.theme)
    const styles = useSelector((state) => state.reduceStyles.styles)

    // React Query Server States
    const queryClient = useQueryClient()
    const { mutate: createUserMutation } = useMutation(createUser, {
        onMutate: () => {
            setUserCreated(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })

    // Handles User Registeration into the DB
    const register = () => {
        const newUser = {
            username: usernameInput,
            password: passwordInput,
            todos: []
        }
        if (users.some((item) => {
            return item.username === usernameInput
        })) {
            alert('User already exists, please login')
        } else if (usernameInput === '') {
            alert('Enter a valid username')
        } else if (passwordInput === '') {
            alert('Enter a valid password')
        } else {
            createUserMutation(newUser)
        }
    }

    // Handles Login Functionality
    const login = () => {
        if (!users.some((item) => {
            return item.username === usernameInput
        })) {
            alert('Username does not exist')
        } else if (usernameInput === '') {
            alert('Enter a valid username')
        } else if (passwordInput === '') {
            alert('Enter a valid password')
        } else if (!users.filter((item) => {
            return item.username === usernameInput
        })[0].password.includes(passwordInput)) {
            alert('Invalid Password')
        } else {
            const grabUserID = users.filter((item) => {
                return item.username === usernameInput
            })
            sessionStorage.setItem('UserID', grabUserID[0]._id)
            navigate('/main')
        }
    }

    return (
        <>
            <TopBanner>
                <DynamicText size={'36px'} weight={'800'} textColor={'white'}>A - L I S T</DynamicText>
                {theme === 'Dark' ?
                    <IconMoon updateStyles={updateStyles}></IconMoon> :
                    <IconSun updateStyles={updateStyles}></IconSun>}
            </TopBanner>
            <MainHeader jc={'center'} bg={styles.primaryColor}>
                <DynamicText textColor={styles.textColor}>Welcome to the A-List, please login or register.</DynamicText>
            </MainHeader>
            <MainContent ai={'center'} jc={'space-around'} pt={'25px'} pb={'25px'} bg={styles.primaryColor}>
                <CustomInput placeholder='Username' maxLength={50} onChange={(e) => setUsernameInput(e.target.value)}></CustomInput>
                <CustomInput placeholder='Password' maxLength={50} type={'password'} onChange={(e) => setPasswordInput(e.target.value)}></CustomInput>
                <MainContentButton bg={'hsl(220, 98%, 61%)'} onClick={login}>Login</MainContentButton>
                <MainContentButton bg={'hsl(220, 98%, 61%)'} onClick={register}>Register</MainContentButton>
                {userCreated ?
                    <p style={{ color: 'green', position: 'absolute', bottom: '1px' }}>Registration Successful, please login.</p>
                    : <></>}
            </MainContent>
        </>
    )
}

export default Login