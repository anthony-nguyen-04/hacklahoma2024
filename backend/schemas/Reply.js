const mongoose = require('mongoose')
const { Schema } = mongoose

const Player = require('./Player')

module.exports = new Schema({
    _id: Number,
    content: String,
    author: Player
}, {
    timestamps: true
})
