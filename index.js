const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
app.use(express.json())
const cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
const UserModel = require('./models/UserModel')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ZirrKing:65937675299041230290728123677583@cluster0.5r4pdz7.mongodb.net/alist?retryWrites=true&w=majority')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('/handleUsers', async (req, res) => {
        const users = await UserModel.find()
        res.json(users)
    })

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })


} else app.get('/', (req, res) => {
    res.send('api running')
})



app.post('/handleUsers', async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()
    res.json(newUser)
})

app.put('/handleUsers', async (req, res) => {
    const id = req.body._id
    const newTodos = req.body.todos
    try {
        UserModel.findById(id, async (err, user) => {
            user.todos = newTodos
            await user.save()
            res.status(200)
            console.log(req.body)
        })
    } catch (error) {
        console.log(error)
        console.log(req.body)
    }
})

app.patch('/handleUsers', async (req, res) => {
    const id = req.body._id
    const newTodos = req.body.newTodos
    UserModel.findByIdAndUpdate(id, { todos: newTodos }, (err, docs) => {
        if (err) {
            console.log(err)
        } else console.log(newTodos)
    })
})

const PORT = process.env.PORT
app.listen(PORT || 3001, () => {
    console.log(process.env.NODE_ENV)
    console.log(PORT)
    if (PORT) {
        console.log(`Server Running on port ${PORT}`)
    } else {
        console.log('Server Running on port 3001')
    }
})