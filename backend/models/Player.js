const mongoose = require('mongoose')
const playerSchema = require('../schemas/Player')

module.exports = mongoose.model('Player', playerSchema)
