const mongoose = require('mongoose')
const timesSchema = require('../schemas/Times')

module.exports = mongoose.model('Times', timesSchema)
