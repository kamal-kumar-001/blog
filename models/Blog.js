const mongoose = require('mongoose');
const User = require('./User');
const Category = require('./Category');

const BlogSchema = new mongoose.Schema({
    
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
    metaContent: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('Blog', BlogSchema);
