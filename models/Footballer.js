const mongoose = require("mongoose");

const footballerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Footballer", footballerSchema);
