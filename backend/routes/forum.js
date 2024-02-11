const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const router = express.Router()

const Player = require('../models/Player')
const Thread = require('../models/Thread')

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

router.post('/new', async (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const id = crypto.randomBytes(16).toString('hex')

    if (!title || !content)
        return res.status(400).send('missing title or content')

    await Thread.create({ title: title, content: content, _id: id, replies: [], author: req.user })

    return res.sendStatus(200)
})

router.post('/:threadId/reply', async (req, res) => {
    const threadId = req.params.threadId
    const content = req.body.content

    if (!content)
        return res.status(400).send('missing content')

    const parent = await Thread.findOne({ _id: threadId }).exec()

    if (!parent)
        return res.status(404).send('unknown thread ID')

    const id = crypto.randomBytes(16).toString('hex')

    parent.replies.push({ _id: id, content: content, author: req.user })
    await parent.save()

    return res.sendStatus(200)
})

router.get('/:threadId', async (req, res) => {
    const threadId = req.params.threadId
    const thread = await Thread.findOne({ _id: threadId }).exec()

    if (!thread)
        return res.sendStatus(404)

    return res.send(thread.toJSON())
})

router.get('/:threadId/:replyId', async (req, res) => {
    const threadId = req.params.threadId
    const replyId = req.params.replyId

    const thread = await Thread.findOne({ _id: threadId }).exec()

    if (!thread)
        return res.sendStatus(404)

    for (let reply of thread.replies) {
        if (reply.id === replyId)
            return res.send(reply.toJSON())
    }

    return res.sendStatus(404)
})

router.get('/', async (req, res) => {
    const threads = await Thread.find({})

    return res.send(threads)
})

module.exports = router
