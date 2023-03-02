import connectDb from '../../../middleware/mongoose';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  await connectDb();
  const { slug  } = req.query;
  const blog = await Blog.findOne({ _id: slug });

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  return res.status(200).json(blog);
}
