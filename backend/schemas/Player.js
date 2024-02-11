const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    email: String,
    _id: Number
})
