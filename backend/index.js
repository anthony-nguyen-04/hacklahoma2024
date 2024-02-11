const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const config = require('../config.json')
const PORT = config.PORTS.BACKEND || 3000

mongoose.connect(`mongodb://${config.DATABASE.IP}:27017/${config.DATABASE.DATABASE}`, {
    user: config.DATABASE.USER,
    pass: config.DATABASE.PASSWORD,
    authSource: 'runitback'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/download', express.static(path.join(__dirname, 'game')))

// danger is my middle name
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const auth = require('./routes/auth')
const forum = require('./routes/forum')
const game = require('./routes/game')

app.use(cors({origin: true, credentials: true}));
app.use('/times', game)
app.use('/forum', forum)
app.use('/', auth)

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    res.status(500).send({ error: err })
})

app.use((req, res, next) => {
    res.status(404).send('couldn\'t find a resource matching that path')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
