const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const Times = require('../models/Times')
const Player = require('../models/Player')

const { JWT_SECRET } = require('../../config.json')

router.get('*', (req, res, next) => {
    req.token = req.query.jwt
    next()
})

router.post('*', (req, res, next) => {
    req.token = req.body.jwt
    next()
})

router.use((req, res, next) => {
    if (!req.token)
        return res.status(400).send('no jwt provided')

    jwt.verify(req.token, JWT_SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send('jwt was signed improperly')

        const user = await Player.findOne({ email: decoded.email }).exec()
        if (!user)
            return res.status(404).send('no user with that email')

        req.user = user
        next()
    })
})

router.get('/', async (req, res) => {
    const userId = req.query.userId
    const level = req.query.level
    const filter = {}

    if (userId) {
        const player = await Player.findOne({ _id: userId }).exec()
        if (player)
            filter.player = player
    }

    const times = await Times.find(filter)
    const found = []

    if (level) {
        for (let time of times) {
            found.push({
                player: time.player,
                time: time.splits.filter(split => split.level == level).reduce((sum, a) => sum + a, 0)
            })
        }
    } else {
        for (let time of times) {
            found.push({
                player: time.player,
                time: time.time
            })
        }
    }

    return res.send(found)
})

router.post('/', async (req, res) => {
    // FIXME: potentially different in final project
    let levels = [1, 2, 3, 4, 5]

    const splits = req.body.splits

    if (!splits)
        return res.status(400).send('missing userId or splits')

    if (splits.length !== levels.length)
        return res.status(400).send('too many or too few levels complete')

    for (let split of splits) {
        levels.splice(levels.indexOf(split.level))
    }

    if (levels.length !== 0)
        return res.status(400).send('not all levels complete')

    await Times.create({ player: req.user, splits: splits })

    return res.sendStatus(200)
})

module.exports = router