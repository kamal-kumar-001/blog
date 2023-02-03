const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('Page', PageSchema);
