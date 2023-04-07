const mongo = require('mongoose');

const bookScema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: mongo.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: true
})

const book = new mongo.model('books', bookScema);

module.exports = { book }