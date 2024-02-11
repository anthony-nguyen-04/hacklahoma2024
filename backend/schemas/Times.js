const mongoose = require('mongoose')
const { Schema } = mongoose

const Player = require('./Player')

module.exports = new Schema({
    _id: Number,
    player: Player,
    splits: [new Schema({
        time: Number,
        level: Number
    })]
}, {
    timestamps: true,
    virtuals: {
        time: {
            get() {
                let elapsed = 0
                for (let split of this.splits) {
                    elapsed += split.time
                }
                return elapsed
            }
        }
    }
})
