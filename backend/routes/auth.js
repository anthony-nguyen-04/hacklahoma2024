const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const { JWT_SECRET } = require('../../config.json')

const Player = require('../models/Player')

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
            next()

        req.user = user
        next()
    })
})

router.get('/login', async (req, res) => {
    if (req.user) {
        return res.send(req.user.id)
    }

    const email = req.query.email

    if (!email)
        return res.status(400).send('no email provided')

    const player = await Player.findOne({ email: email }).exec()
    const playerId = crypto.randomBytes(16).toString('hex')

    await Player.create({ _id: playerId, email: email })

    return res.send(playerId)
})

router.get('/userId', (req, res) => {
    if (!req.user)
        return res.sendStatus(404)

    return res.send(req.user.id)
})

module.exports = router