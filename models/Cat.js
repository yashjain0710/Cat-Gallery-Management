const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unknown'],
        default: 'Unknown'
    },
    color: {
        type: String
    },
    isAdopted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Cat", catSchema);
