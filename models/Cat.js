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
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Cat", catSchema);
