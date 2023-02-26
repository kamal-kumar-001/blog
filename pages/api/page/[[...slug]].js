import connectDb from '../../../middleware/mongoose';
import Page from '../../../models/Page';

export default async function handler(req, res) {
  await connectDb();

  const { slug } = req.query;
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  const page = await Page.findOne({ slug: path });

  if (!page) {
    return res.status(404).json({ message: 'Page not found' });
  }
  return res.status(200).json(page);
}
