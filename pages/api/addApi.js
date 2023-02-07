import connectDb from '../../middleware/mongoose';
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import Product from '../../models/Shop/Product';
import NavItem from '../../models/NavItem';
import bcrypt from 'bcrypt';
// import multer from 'multer';
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

const handler = async (req, res) => {
  
    if (req.method === 'POST') {
  const { collection  } = req.query;
  // const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
  
  // const file = req.file;
  // if (!file) {
  //   return res.status(400).json({ message: 'No file provided' });
  // }
  
  let createdDoc;
      switch (collection) {
        case 'blogs':
          createdDoc = await new Blog({ title: req.body.title, slug: req.body.slug, metaContent: req.body.metaContent, content: req.body.content, img: req.body.img, user: req.body.user, category: req.body.category, }).save();
          break;
        case 'users':
          createdDoc = await new User({img: req.body.img, name: req.body.name, email: req.body.email, password: await bcrypt.hash(req.body.password, 10), }).save();
          break;
        case 'categories':
          createdDoc = await new Category({ name: req.body.name, slug: req.body.slug }).save();
          break;
        case 'products':
          createdDoc = await new Product({ title: req.body.title, slug: req.body.slug, content: req.body.content, img: req.body.img, price: req.body.price, }).save();
          break;
        case 'navItems':
          createdDoc = await new NavItem({ position: req.body.position, name: req.body.name, slug: req.body.slug, }).save();
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      if (!createdDoc) {
        return res.status(400).json({ message: 'Failed to create document' });
      }

      return res.status(201).json({ message: 'Created successfully', data: createdDoc });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
      }
};

export default connectDb(handler);

// let createdDoc;
// switch (collection) {
//   case 'blogs':
//     createdDoc = await new Blog({
//       title: req.body.title,
//       slug: req.body.slug,
//       metaContent: req.body.metaContent,
//       content: req.body.content,
//       img: file.filename,
//       user: req.body.user,
//       category: req.body.category,
//     }).save();
//     break;
//   case 'users':
//     createdDoc = await new User({
//       img: file.filename,
//       name: req.body.name,
//       email: req.body.email,
//       password: await bcrypt.hash(req.body.password, 10),
//     }).save();
//     break;
//   case 'categories':
//     createdDoc = await new Category({ name: req.body.name, slug: req.body.slug }).save();
//     break;
//   case 'products':
//     createdDoc = await new Product({
//       title: req.body.title,
//       slug: req.body.slug,
//       content: req.body.content,
//       img: file.filename,
//       price: req.body.price,
//     }).save();
//     break;
//   default:
//     return res.status(400).json({ message: 'Invalid collection name' });
// }

// if (!createdDoc) {
//   return res.status(400).json({ message: 'Failed to create document' });
// }

// return res.status(201).json({ message: 'Created successfully', data: createdDoc });
// } else {
// return res.status(405).json({ message: 'Method not allowed' });
// }
// };

// // export default connectDb(upload.single('img'))(handler);
// const uploadHandler = (req, res, next) => {
//   upload.single('img')(req, res, (err) => {
//       if (err) {
//           return res.status(400).json({ message: 'Image upload failed' });
//       }
//       next();
//   });
// };

// export default connectDb(uploadHandler(handler));



