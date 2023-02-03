const mongoose = require('mongoose');

const NavItemSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    slug: {type:String, required: true, unique: true},
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('NavItem', NavItemSchema);