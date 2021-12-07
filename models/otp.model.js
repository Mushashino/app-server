const {Schema, model} = require('mongoose');

module.exports.Otp = model('Otp', new Schema({
    number: { type: String, required: true },
    otp: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 1000 }
}, {timestamps: true }));