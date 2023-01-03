const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    todos: {
        type: Array
    }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel