import connectDb from '../../../middleware/mongoose';
import NavItem from '../../../models/NavItem';

export default async function handler(req, res) {
  await connectDb();
  const { slug } = req.query;
  const nav = await NavItem.findOne({ _id: slug });

  if (!nav) {
    return res.status(404).json({ message: 'NavItem not found' });
  }
  return res.status(200).json(nav);
}
