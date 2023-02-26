import connectDb from '../../middleware/mongoose';
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import NavItem from '../../models/NavItem';
import bcrypt from 'bcrypt';
import Page from '../../models/Page';

const handler = async (req, res) => {
  
    if (req.method === 'POST') {
  const { collection  } = req.query;  
  let updateDoc;
      switch (collection) {
        case 'blogs':
          updateDoc = await new Blog({ title: req.body.title, slug: req.body.slug, metaContent: req.body.metaContent, content: req.body.content, img: req.body.img, user: req.body.user, category: req.body.category, }).save();
          break;
        case 'pages':
          updateDoc = await Page.findByIdAndUpdate(req.body._id, req.body);
          break;
        case 'users':
          updateDoc = await new User({img: req.body.img, name: req.body.name, email: req.body.email, password: await bcrypt.hash(req.body.password, 10), }).save();
          break;
        case 'categories':
          updateDoc = await new Category({ name: req.body.name, slug: req.body.slug }).save();
          break;
        case 'navItems':
          updateDoc = await new NavItem({ position: req.body.position, name: req.body.name, slug: req.body.slug, }).save();
          break;
        default:
          return res.status(400).json({ message: 'Invalid collection name' });
      }

      if (!updateDoc) {
        return res.status(400).json({ message: 'Failed to update document' });
      }

      return res.status(201).json({ message: 'Updated successfully', data: updateDoc });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
      }
};

export default connectDb(handler);