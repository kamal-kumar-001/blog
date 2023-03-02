
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import connectDb from '../../middleware/mongoose';
import Page from '../../models/Page';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { collection, id } = req.query;

    let deletedDoc;

    switch (collection) {
      case 'blogs':
        deletedDoc = await Blog.findByIdAndDelete(id);
        break;
      case 'users':
        deletedDoc = await User.findByIdAndDelete(id);
        break;
      case 'categories':
        deletedDoc = await Category.findByIdAndDelete(id);
        break;
      case 'pages':
        deletedDoc = await Page.findByIdAndDelete(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid collection name' });
    }

    if (!deletedDoc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json({ message: 'Deleted successfully' });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default connectDb(handler);


