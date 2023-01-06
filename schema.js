const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter your name']
    },
    number: {
        type: Number,
        required: [true, 'please enter phone number']
    },
    email: {
        type: String,
        required: [true, 'please enter Email'],
    },
    image: {
        type: String,
        required: [true, 'please enter Image Url'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: true
    },
    add: {
        type: [{
            country: {
                type: String,
                required: [true, 'please enter ypur country']
            },
            city: {
                type: String,
                required: [true, 'please enter your city']
            }
        }]
    },
    token: {
        type: String,
        default: ""
    }
});

//to hash password
schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// to get jwt token 
schema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, "ASSINGMENT", {
        expiresIn: "2d"
    })
}

module.exports = schema;