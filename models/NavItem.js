const mongoose = require('mongoose');

const NavItemSchema = new mongoose.Schema({
    position: {type: Number},
    name: {type: String, required: true, unique: true},
    slug: {type:String, required: true, unique: true},
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('NavItem', NavItemSchema);