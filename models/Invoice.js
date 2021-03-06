const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lines: [
        {
            title: {
                type: String,
                required: true,
                min: 1,
                max: 255
            },
            description: {
                type: String,
                required: true,
                min: 0,
                max: 255
            },
            amount: {
                type: Number,
                required: true,
                min: 0
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
            total: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);