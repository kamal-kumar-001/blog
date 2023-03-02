import connectDb from '../../../middleware/mongoose';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  await connectDb();

  const { slug  } = req.query;
  // const { slug, category } = req.query;
  const blog = await Blog.findOne({ slug }).populate('user').populate('category');
  const category = blog.category;
  // console.log(category);
  const relatedBlogs = await Blog.find({ category,slug: { $ne: slug } });
  // console.log(relatedBlogs);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  // return res.status(200).json(blog);
  return res.status(200).json({ blog, relatedBlogs });
}
