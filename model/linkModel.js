const mongoose = require('mongoose')


const linkSchema = new mongoose.Schema(
    {
        link: String,
        shortCode: String,
        date: {
            type: Date,
            default:Date.now
        }
    }
)

linkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.date
    }
})

const Link = mongoose.model('Link', linkSchema)

module.exports = Link