const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const { JWT_SECRET } = require('../../config.json')

const Player = require('../models/Player')

router.get('/login', async (req, res) => {
    const email = req.query.email

    if (!email)
        return res.status(400).send('no email provided')

    const player = await Player.findOne({ email: email }).exec()
    let playerId

    if (!player) {
        playerId = crypto.randomBytes(16).toString('hex')
        Player.create({ _id: playerId, email: email })
    } else {
        playerId = player.id
    }

    res.send(playerId)
})

router.get('/userId', (req, res) => {
    const token = req.query.jwt

    if (!token)
        return res.status(400).send('no jwt provided')

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send('jwt was signed improperly')

        const email = decoded.email
        const user = await Player.findOne({ email: email }).exec()

        if (!user)
            return res.status(404).send('no user found with the given email')

        return res.send(user.id)
    })
})

module.exports = router