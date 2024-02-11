const mongoose = require('mongoose')
const replySchema = require('../schemas/Reply')

module.exports = mongoose.model('Reply', replySchema)
