const mongoose = require('mongoose')
const threadSchema = require('../schemas/Thread')

module.exports = mongoose.model('Thread', threadSchema)
