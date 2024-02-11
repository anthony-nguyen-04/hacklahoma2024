const mongoose = require('mongoose')
const { Schema } = mongoose

const Player = require('./Player')
const Reply = require('./Reply')

module.exports = new Schema({
    _id: Number,
    title: String,
    content: String,
    author: Player,
    replies: [Reply]
}, {
    timestamps: true
})