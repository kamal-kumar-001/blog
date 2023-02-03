const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});


mongoose.models = {}

export default mongoose.model('Email', EmailSchema);
