const mongoose = require('mongoose');
// const User = require('./user');
// const Category = require('./Category');

const ProductSchema = new mongoose.Schema({
    
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
    price: {
        type: String,
        required: true
    },
    
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('Product', ProductSchema);
