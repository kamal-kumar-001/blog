import connectDb from '../../../middleware/mongoose';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectDb();
  const { slug } = req.query;
  const user = await User.findOne({ _id: slug });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json(user);
}
