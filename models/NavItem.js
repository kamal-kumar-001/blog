// const mongoose = require('mongoose');

// const NavItemSchema = new mongoose.Schema({
//     position: {type: Number},
//     name: {type: String, required: true, unique: true},
//     slug: {type:String, unique: true},
//     subItems: {type:String, required: true, unique: true},
// }, {timestamps: true});

// mongoose.models = {}
// export default mongoose.model('NavItem', NavItemSchema);

// const mongoose = require('mongoose');

// const SubItemSchema = new mongoose.Schema({
//     name: { type: String,  },
//     slug: { type: String,   },
// });

// const NavItemSchema = new mongoose.Schema({
//     position: { type: Number },
//     name: { type: String, required: true, unique: true },
//     slug: { type: String, unique: true },
//     subitems: [SubItemSchema],
// }, { timestamps: true });

// mongoose.models = {};
// const NavItem = mongoose.model('NavItem', NavItemSchema);

// export default NavItem;



// const mongoose = require('mongoose');

// const SubItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 3,
//   },
//   slug: {
//     type: String,
//     required: true,
// },
// // unique: true,
// // match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
// });

// const SubItemSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minlength: 3,
//     },
//     slug: {
//       type: String,
//       required: false,
//       unique: true,
//       sparse: true
//     },
//   });

// const NavItemSchema = new mongoose.Schema({
//   position: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 3,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
// },
// // match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
// //   subitems: [SubItemSchema],
// // subitems: {
// //     type: [SubItemSchema],
// //     default: []
// //   },
// subitems: [
//     {
//       name: {
//         type: String,
//         required: true,
//         minlength: 3,
//       },
//       slug: {
//         type: String,
//         required: false,
//         index: true,
//         unique: true,
//         sparse: true
//       }
//     }
//   ]
// }, { timestamps: true });

// NavItemSchema.index({ name: 1, slug: 1 }, { unique: true });

// mongoose.models = {};
// const NavItem = mongoose.model('NavItem', NavItemSchema);

// export default NavItem;




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

