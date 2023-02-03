const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    isAdmin: {type:Boolean },
    password: {type:String, required: true },
    // img: {type:String },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('User', UserSchema);