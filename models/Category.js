const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});


mongoose.models = {}

export default mongoose.model('Category', CategorySchema);
