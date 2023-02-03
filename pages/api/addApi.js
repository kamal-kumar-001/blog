import connectDb from '../../middleware/mongoose';
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import Product from '../../models/Shop/Product';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method === 'POST') {
  const { collection  } = req.query;
  // const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
  let createdDoc;
      switch (collection) {
        case 'blogs':
          createdDoc = await new Blog({ title: req.body.title, slug: req.body.slug, metaContent: req.body.metaContent, content: req.body.content, img: req.body.img, user: req.body.user, category: req.body.category, }).save();
          break;
        case 'users':
          createdDoc = await new User({ name: req.body.name, email: req.body.email, password: await bcrypt.hash(req.body.password, 10), }).save();
          break;
        case 'categories':
          createdDoc = await new Category({ name: req.body.name, slug: req.body.slug }).save();
          break;
        case 'products':
          createdDoc = await new Product({ title: req.body.title, slug: req.body.slug, content: req.body.content, img: req.body.img, price: req.body.price, }).save();
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



