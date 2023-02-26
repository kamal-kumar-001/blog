const mongoose = require('mongoose');

const SubItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  slug: {
    type: String,
    required: false,
    index: true,
    unique: false,
    sparse: true,
  },
});

const NavItemSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  subitems: {
    type: [SubItemSchema],
    default: [],
  },
}, { timestamps: true });

NavItemSchema.index({ name: 1, slug: 1 }, { unique: true });

mongoose.models = {};
const NavItem = mongoose.model('NavItem', NavItemSchema);

export default NavItem;

