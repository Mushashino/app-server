const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    number: { type: String, required: true },
    name: { type: String, required: true },
},{timestamps: true });

userSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this._id,
        number: this.number,
        name: this.name,
    }, "aazertyuhjkllmmp", { expiresIn: '7d' });
};

module.exports.User = model('User', userSchema);