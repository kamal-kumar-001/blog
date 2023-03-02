import connectDb from '../../middleware/mongoose';
import Blog from '../../models/Blog';
// import Category from '../../models/Category';

export default async function handler(req, res) {
  await connectDb();

  const { q } = req.query;
  //   console.log(q);
  const results = await Blog.find({ $text: { $search: q } });
//   const categoriesResults = await Category.find({ $text: { $search: q } });
//   console.log(results);

  if (!results) {
    return res.status(404).json({ message: 'No match found' });
  }
  return res.status(200).json({ results });
//   return res.status(200).json({ results ,categoriesResults});
}
